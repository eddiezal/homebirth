/**
 * scrape-calm.mjs: California Association of Licensed Midwives directory scraper
 *
 * Target: https://californiamidwives.org/findamidwife/ (Wild Apricot membership directory)
 * Goal:  Pull name, credentials, location, email, phone, website for every listed CALM member,
 *        so we can cross-reference against Supabase and build a SoCal outreach list.
 *
 * Why Playwright: Wild Apricot member directories are JS-rendered: axios + cheerio return
 * an empty shell. We need a real headless browser that runs the widget.
 *
 * Setup (run once from repo root):
 *   npm install playwright --save-dev
 *   npx playwright install chromium
 *
 * Run:
 *   node scripts/scrape-calm.mjs
 *
 * Output:
 *   outreach/calm-raw.html      : full rendered HTML (for debugging selectors)
 *   outreach/calm-members.json  : structured member records
 *   outreach/calm-members.csv   : same data, CSV for import to Excel / Supabase
 *
 * The outreach/ folder is gitignored. Do not commit scraped PII.
 */

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const OUTPUT_DIR = resolve(process.cwd(), "outreach");
const TARGET_URLS = [
  "https://californiamidwives.org/findamidwife/",
  "https://calmidwives.org/find-a-midwife/",
];

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created ${OUTPUT_DIR}`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  viewport: { width: 1400, height: 900 },
});
const page = await context.newPage();

let workingUrl = null;
for (const url of TARGET_URLS) {
  try {
    console.log(`\nTrying ${url} ...`);
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    if (response && response.ok()) {
      workingUrl = url;
      console.log(`  OK (status ${response.status()})`);
      break;
    }
    console.log(`  got status ${response?.status() ?? "no response"}, trying next`);
  } catch (err) {
    console.log(`  failed: ${err.message}`);
  }
}

if (!workingUrl) {
  console.error("\nBoth CALM URLs failed. Bailing.");
  await browser.close();
  process.exit(1);
}

// Wild Apricot widgets load async. Give the member list a chance to populate.
console.log("\nWaiting for member list to render...");
await page.waitForTimeout(5000);

// Try to find common Wild Apricot member list containers and scroll through them
// to trigger lazy-loading or "show more" behavior.
try {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let i = 0; i < 8; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(800);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
} catch {}

// Dump raw HTML so we can inspect selectors if parsing comes back empty.
const rawHtml = await page.content();
writeFileSync(join(OUTPUT_DIR, "calm-raw.html"), rawHtml);
console.log(`  wrote outreach/calm-raw.html (${rawHtml.length} bytes)`);

// Extraction strategies: try several because Wild Apricot markup varies by theme.
const members = await page.evaluate(() => {
  const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/;
  const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

  const clean = (s) =>
    (s || "")
      .replace(/\s+/g, " ")
      .replace(/\u00a0/g, " ")
      .trim();

  const extractFromBlock = (el) => {
    if (!el) return null;
    const text = clean(el.innerText || el.textContent || "");
    if (!text || text.length < 4) return null;

    // email: check mailto first, then regex on text
    let email = null;
    const mailto = el.querySelector('a[href^="mailto:"]');
    if (mailto) email = mailto.getAttribute("href").replace(/^mailto:/, "").split("?")[0];
    if (!email) {
      const m = text.match(EMAIL_RE);
      if (m) email = m[0];
    }

    // phone
    let phone = null;
    const tel = el.querySelector('a[href^="tel:"]');
    if (tel) phone = tel.getAttribute("href").replace(/^tel:/, "");
    if (!phone) {
      const m = text.match(PHONE_RE);
      if (m) phone = m[0];
    }

    // website: first non-mailto, non-tel, external-looking link
    let website = null;
    const links = el.querySelectorAll("a[href]");
    for (const a of links) {
      const href = a.getAttribute("href") || "";
      if (!href) continue;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (href.startsWith("#") || href.startsWith("/")) continue;
      if (href.includes("californiamidwives.org") || href.includes("calmidwives.org")) continue;
      if (href.includes("wildapricot")) continue;
      website = href;
      break;
    }

    // name: prefer strong/h3/h4/h5, fall back to first line of text
    let name = null;
    const heading = el.querySelector("h2, h3, h4, h5, strong, b");
    if (heading) name = clean(heading.innerText || heading.textContent);
    if (!name) name = clean(text.split("\n")[0]);

    return {
      name,
      email,
      phone,
      website,
      raw: text.slice(0, 800),
    };
  };

  const results = [];

  // Strategy 1: Wild Apricot member cards (common class names)
  const waSelectors = [
    ".memberDirectoryContainer .memberItem",
    ".memberDirectoryContainer li",
    ".wa-memberItem",
    ".member-list-item",
    "[class*='memberItem']",
    "[class*='MemberItem']",
    "[class*='member-card']",
    "[class*='member_card']",
  ];
  for (const sel of waSelectors) {
    const nodes = document.querySelectorAll(sel);
    if (nodes.length > 0) {
      console.log(`[scraper] selector ${sel} matched ${nodes.length} nodes`);
      nodes.forEach((n) => {
        const rec = extractFromBlock(n);
        if (rec) results.push({ ...rec, source: sel });
      });
      if (results.length > 0) return results;
    }
  }

  // Strategy 2: any card/grid that contains a mailto link
  const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
  const seen = new Set();
  mailtoLinks.forEach((a) => {
    // walk up to find a reasonable container
    let el = a;
    for (let i = 0; i < 6 && el; i++) {
      el = el.parentElement;
      if (!el) break;
      const text = clean(el.innerText || "");
      if (text.length > 60 && text.length < 2000) {
        const key = text.slice(0, 120);
        if (!seen.has(key)) {
          seen.add(key);
          const rec = extractFromBlock(el);
          if (rec) results.push({ ...rec, source: "mailto-walkup" });
        }
        break;
      }
    }
  });
  if (results.length > 0) return results;

  // Strategy 3: fallback: split page text by emails
  const bodyText = document.body.innerText || "";
  const emails = [...bodyText.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)].map((m) => m[0]);
  emails.forEach((e) => {
    results.push({ name: null, email: e, phone: null, website: null, raw: "", source: "body-regex" });
  });

  return results;
});

console.log(`\nExtracted ${members.length} candidate records`);
if (members.length > 0) {
  console.log("First 3 sample records:");
  members.slice(0, 3).forEach((m, i) => {
    console.log(`  [${i}] name=${m.name} email=${m.email} phone=${m.phone} source=${m.source}`);
  });
}

writeFileSync(join(OUTPUT_DIR, "calm-members.json"), JSON.stringify(members, null, 2));
console.log(`  wrote outreach/calm-members.json`);

// Minimal CSV (quote everything to be safe)
const csvEscape = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v).replace(/"/g, '""');
  return `"${s}"`;
};
const csvHeader = ["name", "email", "phone", "website", "source"].join(",");
const csvRows = members.map((m) =>
  [m.name, m.email, m.phone, m.website, m.source].map(csvEscape).join(","),
);
writeFileSync(join(OUTPUT_DIR, "calm-members.csv"), [csvHeader, ...csvRows].join("\n"));
console.log(`  wrote outreach/calm-members.csv`);

await browser.close();

console.log("\nDone. Next steps:");
console.log("  1. Eyeball outreach/calm-members.json: if records look empty or malformed,");
console.log("     open outreach/calm-raw.html in a browser and share the member-list markup so");
console.log("     I can tighten selectors.");
console.log("  2. If names/emails are present, we can enrich with county/SoCal filter next.");
