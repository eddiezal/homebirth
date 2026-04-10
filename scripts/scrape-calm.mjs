/**
 * scrape-calm.mjs: California Association of Licensed Midwives directory scraper
 *
 * Two-pass crawler for https://californiamidwives.org/findamidwife/
 *
 * Pass 1: Parse the memberDirectory table on the list page.
 *         Extracts: name, practice, counties_served, medi_cal, profile_id, profile_url
 *         Output: outreach/calm-directory.json  (the list, ~50 members)
 *
 * Pass 2: Visit each profile page and extract contact info.
 *         Extracts: email, phone, website, address, any extra Wild Apricot profile fields
 *         Output: outreach/calm-enriched.json, outreach/calm-enriched.csv
 *
 * The scraper is idempotent: Pass 2 skips profiles already enriched unless you pass --refresh.
 *
 * SoCal filter: adds is_socal flag if any county overlaps with
 *   Los Angeles, Orange, San Diego, Riverside, San Bernardino, Ventura, Santa Barbara, Imperial.
 *
 * Setup (one time):
 *   npm install playwright --save-dev
 *   npx playwright install chromium
 *
 * Run:
 *   node scripts/scrape-calm.mjs             # both passes
 *   node scripts/scrape-calm.mjs --list-only # just re-fetch the directory list
 *   node scripts/scrape-calm.mjs --refresh   # re-fetch every profile (ignore cache)
 *
 * The outreach/ folder is gitignored. Do not commit scraped PII.
 */

import { chromium } from "playwright";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";

const OUTPUT_DIR = resolve(process.cwd(), "outreach");
const LIST_URL = "https://californiamidwives.org/findamidwife/";
const DIRECTORY_JSON = join(OUTPUT_DIR, "calm-directory.json");
const ENRICHED_JSON = join(OUTPUT_DIR, "calm-enriched.json");
const ENRICHED_CSV = join(OUTPUT_DIR, "calm-enriched.csv");
const RAW_LIST_HTML = join(OUTPUT_DIR, "calm-raw.html");
const PROFILE_DELAY_MS = 1500;

const SOCAL_COUNTIES = new Set([
  "Los Angeles",
  "Orange",
  "San Diego",
  "Riverside",
  "San Bernardino",
  "Ventura",
  "Santa Barbara",
  "Imperial",
]);

const args = new Set(process.argv.slice(2));
const LIST_ONLY = args.has("--list-only");
const REFRESH = args.has("--refresh");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  viewport: { width: 1400, height: 900 },
});
const page = await context.newPage();

console.log(`\nPASS 1: fetching directory list from ${LIST_URL}`);
await page.goto(LIST_URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const rawHtml = await page.content();
writeFileSync(RAW_LIST_HTML, rawHtml);
console.log(`  wrote outreach/calm-raw.html (${rawHtml.length} bytes)`);

const directory = await page.evaluate(() => {
  const clean = (s) =>
    (s || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

  const rows = document.querySelectorAll(
    "table.memberDirectory tbody tr.normal, table.memberDirectory tbody tr.alt, table.memberDirectory tbody tr.odd, tr[onclick*='redirectToMemberDetails']",
  );
  const out = [];
  const seen = new Set();

  rows.forEach((tr) => {
    const cells = tr.querySelectorAll("td");
    if (cells.length < 2) return;

    const nameLink = cells[0].querySelector("a[href*='PublicProfile']");
    const name = clean(nameLink?.textContent);
    const profileUrl = nameLink?.href || null;

    const memberValues = cells[0].querySelectorAll(".memberValue");
    let practice = null;
    for (const mv of memberValues) {
      const txt = clean(mv.textContent);
      if (txt && txt !== name) {
        practice = txt;
        break;
      }
    }

    const counties = clean(cells[1]?.textContent);
    const mediCal = clean(cells[2]?.textContent);

    let profileId = null;
    if (profileUrl) {
      const m = profileUrl.match(/PublicProfile\/(\d+)/);
      if (m) profileId = m[1];
    }

    if (!name || !profileId || seen.has(profileId)) return;
    seen.add(profileId);

    out.push({
      profile_id: profileId,
      name,
      practice,
      counties_served: counties,
      medi_cal: mediCal,
      profile_url: profileUrl,
    });
  });

  return out;
});

console.log(`  parsed ${directory.length} members from directory table`);

for (const m of directory) {
  const counties = (m.counties_served || "").split(/,\s*/).map((c) => c.trim()).filter(Boolean);
  m.county_list = counties;
  m.is_socal = counties.some((c) => SOCAL_COUNTIES.has(c));
}

const socalCount = directory.filter((m) => m.is_socal).length;
console.log(`  SoCal members: ${socalCount} of ${directory.length}`);

writeFileSync(DIRECTORY_JSON, JSON.stringify(directory, null, 2));
console.log(`  wrote outreach/calm-directory.json`);

if (LIST_ONLY) {
  console.log("\n--list-only flag set, skipping profile enrichment.");
  await browser.close();
  process.exit(0);
}

let enriched = [];
const enrichedById = new Map();
if (existsSync(ENRICHED_JSON) && !REFRESH) {
  try {
    enriched = JSON.parse(readFileSync(ENRICHED_JSON, "utf8"));
    enriched.forEach((m) => enrichedById.set(m.profile_id, m));
    console.log(`\nPASS 2: loaded ${enriched.length} previously enriched profiles from cache`);
  } catch (e) {
    console.log(`\nPASS 2: couldn't load cache (${e.message}), starting fresh`);
  }
}

console.log(
  `\nPASS 2: visiting ${directory.length} profile pages (${PROFILE_DELAY_MS}ms delay between each)`,
);

let visited = 0;
let skipped = 0;
let failed = 0;

for (const member of directory) {
  if (enrichedById.has(member.profile_id) && !REFRESH) {
    const cached = enrichedById.get(member.profile_id);
    if (!cached.error) {
      skipped++;
      continue;
    }
  }

  try {
    await page.goto(member.profile_url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(800);

    const profileData = await page.evaluate(() => {
      const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/;
      const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
      const clean = (s) =>
        (s || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

      let email = null;
      const mailto = document.querySelector('a[href^="mailto:"]');
      if (mailto) {
        email = mailto.getAttribute("href").replace(/^mailto:/, "").split("?")[0];
      }
      if (!email) {
        const text = document.body.innerText || "";
        const m = text.match(EMAIL_RE);
        if (m) email = m[0];
      }

      let phone = null;
      const tel = document.querySelector('a[href^="tel:"]');
      if (tel) phone = tel.getAttribute("href").replace(/^tel:/, "");
      if (!phone) {
        const text = document.body.innerText || "";
        const m = text.match(PHONE_RE);
        if (m) phone = m[0];
      }

      let website = null;
      const links = document.querySelectorAll("a[href]");
      for (const a of links) {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("http")) continue;
        if (/calmidwives\.org|californiamidwives\.org|wildapricot|facebook\.com|instagram\.com|linkedin\.com/i.test(href)) continue;
        website = href;
        break;
      }

      const fields = {};
      const fieldPairs = document.querySelectorAll(".fieldContainer, .fieldSubContainer, .profileFormField");
      fieldPairs.forEach((fc) => {
        const label = clean(fc.querySelector(".fieldLabel, label, .FieldLabel")?.textContent);
        const value = clean(fc.querySelector(".fieldBody, .fieldValue, .FieldValue")?.textContent);
        if (label && value) fields[label.replace(/:$/, "")] = value;
      });

      return {
        email,
        phone,
        website,
        fields,
        full_text: clean(document.body.innerText || "").slice(0, 4000),
      };
    });

    const enrichedRecord = { ...member, ...profileData };
    enrichedById.set(member.profile_id, enrichedRecord);
    visited++;

    if (visited === 1 || visited % 5 === 0) {
      console.log(
        `  [${visited}] ${member.name}: email=${profileData.email || "(none)"} phone=${profileData.phone || "(none)"}`,
      );
    }
  } catch (err) {
    console.log(`  FAILED ${member.name} (${member.profile_id}): ${err.message}`);
    failed++;
    enrichedById.set(member.profile_id, { ...member, error: err.message });
  }

  await page.waitForTimeout(PROFILE_DELAY_MS);
}

const finalEnriched = Array.from(enrichedById.values());
writeFileSync(ENRICHED_JSON, JSON.stringify(finalEnriched, null, 2));

const csvEscape = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v).replace(/"/g, '""');
  return `"${s}"`;
};
const csvCols = [
  "profile_id",
  "name",
  "practice",
  "counties_served",
  "is_socal",
  "medi_cal",
  "email",
  "phone",
  "website",
  "profile_url",
];
const csvHeader = csvCols.join(",");
const csvRows = finalEnriched.map((m) => csvCols.map((c) => csvEscape(m[c])).join(","));
writeFileSync(ENRICHED_CSV, [csvHeader, ...csvRows].join("\n"));

console.log(
  `\nPASS 2 complete: visited=${visited}, skipped (cached)=${skipped}, failed=${failed}`,
);
console.log(`  wrote outreach/calm-enriched.json (${finalEnriched.length} records)`);
console.log(`  wrote outreach/calm-enriched.csv`);

const withEmail = finalEnriched.filter((m) => m.email).length;
const socalWithEmail = finalEnriched.filter((m) => m.email && m.is_socal).length;
console.log(`\nSummary:`);
console.log(`  Total CALM members:  ${finalEnriched.length}`);
console.log(`  With email:          ${withEmail}`);
console.log(`  SoCal members:       ${socalCount}`);
console.log(`  SoCal WITH email:    ${socalWithEmail}  <- outreach target list`);

await browser.close();

console.log("\nDone. Next steps:");
console.log("  1. Open outreach/calm-enriched.csv in Excel to eyeball quality.");
console.log("  2. If emails look sparse, share 1-2 profile HTML snippets so I can tighten extraction.");
console.log("  3. Otherwise we move to Supabase dedupe + Midwife-Tracker.xlsx build.");
