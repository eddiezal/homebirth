// dedupe-calm-vs-supabase.mjs
//
// Joins the CALM-enriched roster against the Supabase `providers` table to
// build a combined SoCal outreach pool. Outputs a single combined-targets.json
// file that the tracker builder consumes, plus diagnostic files for
// Eddie to spot-check.
//
// Run locally:
//   node scripts/dedupe-calm-vs-supabase.mjs
//
// Prereqs:
//   .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
//   outreach/calm-enriched.json (from scrape-calm.mjs)
//
// Outputs (all gitignored under /outreach/):
//   supabase-socal.json       All Supabase rows that look SoCal
//   calm-matched.json         CALM rows with in_supabase flag + supabase_id
//   supabase-only.json        Supabase SoCal rows NOT in the CALM roster
//   combined-targets.json     Unified target list for the tracker builder
//                             Each row: { source, tier, ...fields }
//
// Tiers:
//   1 = has email (ready to send)
//   2 = has practice website but no email (one enrichment hop)
//   3 = name + location only (manual research required)

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

// --- env loader (same pattern as query-providers.mjs) ----------------
const envPath = resolve(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing .env.local at", envPath);
  process.exit(1);
}
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  process.env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// --- SoCal matchers ---------------------------------------------------
const SOCAL_COUNTIES = [
  "Los Angeles",
  "Orange",
  "San Diego",
  "Riverside",
  "San Bernardino",
  "Ventura",
  "Santa Barbara",
  "Imperial",
];

// Major SoCal cities used when the location text only mentions a city
// and not a county. Kept to the top populated cities so we do not
// accidentally pull in Central Coast or Inland Empire edges.
const SOCAL_CITIES = [
  // LA County
  "Los Angeles", "Long Beach", "Glendale", "Santa Monica", "Pasadena", "Burbank",
  "Torrance", "Pomona", "Inglewood", "El Monte", "Downey", "West Covina",
  "Norwalk", "Carson", "Compton", "Culver City", "Whittier", "Redondo Beach",
  "Manhattan Beach", "Hermosa Beach", "Hollywood", "Encino", "Sherman Oaks",
  "Studio City", "Tarzana", "Woodland Hills", "Calabasas", "Malibu", "Venice",
  "Beverly Hills", "Marina del Rey", "Playa del Rey", "Santa Clarita",
  "Palmdale", "Lancaster",
  // OC
  "Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Garden Grove",
  "Orange", "Fullerton", "Costa Mesa", "Mission Viejo", "Westminster",
  "Newport Beach", "Laguna Beach", "Laguna Niguel", "Lake Forest", "Tustin",
  "Yorba Linda", "San Clemente", "Dana Point", "Brea", "Fountain Valley",
  // SD
  "San Diego", "Chula Vista", "Oceanside", "Escondido", "Carlsbad",
  "El Cajon", "Vista", "San Marcos", "Encinitas", "La Mesa", "Santee",
  "Poway", "Coronado", "Del Mar", "Solana Beach", "Imperial Beach",
  "National City", "La Jolla",
  // Riverside
  "Riverside", "Moreno Valley", "Corona", "Murrieta", "Temecula",
  "Jurupa Valley", "Indio", "Hemet", "Menifee", "Perris", "Palm Springs",
  "Palm Desert", "La Quinta", "Rancho Mirage", "Cathedral City",
  // San Bernardino
  "San Bernardino", "Fontana", "Rancho Cucamonga", "Ontario", "Victorville",
  "Rialto", "Hesperia", "Chino", "Chino Hills", "Upland", "Apple Valley",
  "Redlands", "Yucaipa", "Highland", "Colton", "Loma Linda",
  // Ventura
  "Oxnard", "Thousand Oaks", "Simi Valley", "Ventura", "Camarillo",
  "Moorpark", "Santa Paula", "Fillmore", "Ojai", "Port Hueneme",
  // Santa Barbara
  "Santa Barbara", "Santa Maria", "Lompoc", "Goleta", "Carpinteria",
  // Imperial
  "El Centro", "Calexico", "Brawley", "Imperial",
];

const SOCAL_REGEX = new RegExp(
  "\\b(" +
    [...SOCAL_COUNTIES, ...SOCAL_CITIES]
      .map((s) => s.replace(/\s+/g, "\\s+"))
      .join("|") +
    ")\\b",
  "i"
);

function isSoCalLocation(loc) {
  if (!loc) return false;
  return SOCAL_REGEX.test(loc);
}

// --- normalization helpers --------------------------------------------
function normalizeName(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lastFirstKey(first, last) {
  const f = normalizeName(first);
  const l = normalizeName(last);
  if (!l) return null;
  return l + "|" + f;
}

function splitFullName(full) {
  const parts = normalizeName(full).split(" ").filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: "", last: parts[0] };
  // Many midwives publish as "First Middle Last" or "First Last, CNM".
  // Credentials are stripped by normalizeName. Take last token as last name,
  // first token as first, ignore middles.
  return { first: parts[0], last: parts[parts.length - 1] };
}

function extractLicenseNumber(s) {
  if (!s) return null;
  // Accept "LM 539", "License #539", "LM539", bare digits
  const m = String(s).match(/\b(\d{2,5})\b/);
  return m ? m[1] : null;
}

// --- load CALM roster --------------------------------------------------
const calmPath = resolve(process.cwd(), "outreach/calm-enriched.json");
if (!existsSync(calmPath)) {
  console.error("Missing", calmPath, "- run scripts/scrape-calm.mjs first");
  process.exit(1);
}
const calmAll = JSON.parse(readFileSync(calmPath, "utf-8"));
console.log(`Loaded ${calmAll.length} CALM members (${calmAll.filter((m) => m.is_socal).length} SoCal)`);

// Build CALM match indexes
const calmByLicense = new Map();
const calmByName = new Map();
for (const m of calmAll) {
  const f = m.fields || {};
  const first = f["First name"] || (m.name || "").split(" ")[0] || "";
  const last = f["Last name"] || "";
  const lic = extractLicenseNumber(f["License Number"]);
  const nameKey = lastFirstKey(first, last) || lastFirstKey(...splitNamePair(m.name));
  if (lic) calmByLicense.set(lic, m);
  if (nameKey) calmByName.set(nameKey, m);
}

function splitNamePair(full) {
  const { first, last } = splitFullName(full);
  return [first, last];
}

// --- query Supabase providers -----------------------------------------
console.log("Querying Supabase providers...");
const countRes = await admin.from("providers").select("*", { count: "exact", head: true });
const total = countRes.count || 0;
console.log(`Total providers in table: ${total}`);

const PAGE = 1000;
let supabaseAll = [];
for (let from = 0; from < total; from += PAGE) {
  const { data, error } = await admin
    .from("providers")
    .select("*")
    .range(from, from + PAGE - 1);
  if (error) {
    console.error("Page error:", error.message);
    process.exit(1);
  }
  supabaseAll = supabaseAll.concat(data || []);
  if (!data || data.length < PAGE) break;
}
console.log(`Pulled ${supabaseAll.length} provider rows`);

if (supabaseAll.length === 0) {
  console.error("Empty providers table, nothing to dedupe");
  process.exit(0);
}

// Show columns for sanity
const cols = Object.keys(supabaseAll[0]);
console.log(`Columns: ${cols.join(", ")}`);

// --- filter to SoCal --------------------------------------------------
const supabaseSocal = supabaseAll.filter((p) => {
  const loc = p.location || p.address || p.city || "";
  return isSoCalLocation(loc);
});
console.log(`SoCal Supabase rows: ${supabaseSocal.length}`);

// --- dedupe vs CALM ---------------------------------------------------
let matchedByLicense = 0;
let matchedByName = 0;
let unmatchedSupabase = 0;
const supabaseOnly = [];
const calmMatchedIds = new Set();

for (const sb of supabaseSocal) {
  // Try license number match first
  const sbLic =
    extractLicenseNumber(sb.license_number) ||
    extractLicenseNumber(sb.license) ||
    extractLicenseNumber(sb.license_no);
  let hit = null;
  if (sbLic && calmByLicense.has(sbLic)) {
    hit = calmByLicense.get(sbLic);
    matchedByLicense++;
  }
  // Fall back to name
  if (!hit) {
    const { first, last } = splitFullName(sb.name || sb.full_name || "");
    const key = lastFirstKey(first, last);
    if (key && calmByName.has(key)) {
      hit = calmByName.get(key);
      matchedByName++;
    }
  }
  if (hit) {
    calmMatchedIds.add(hit.profile_id || hit.name);
    sb._calm_profile_id = hit.profile_id || null;
  } else {
    unmatchedSupabase++;
    supabaseOnly.push(sb);
  }
}

console.log(
  `Dedupe: matched by license ${matchedByLicense}, matched by name ${matchedByName}, unmatched ${unmatchedSupabase}`
);

// Tag CALM rows with in_supabase flag
const calmMatched = calmAll.map((m) => ({
  ...m,
  in_supabase: calmMatchedIds.has(m.profile_id || m.name),
}));

// --- build combined target pool ---------------------------------------
function tierForRow({ email, website }) {
  if (email && email.trim()) return 1;
  if (website && website.trim()) return 2;
  return 3;
}

// CALM rows -> target shape
const calmTargets = calmMatched
  .filter((m) => m.is_socal)
  .map((m) => {
    const f = m.fields || {};
    const first = f["First name"] || (m.name || "").split(" ")[0] || "";
    const last = f["Last name"] || "";
    const organization = f["Organization"] || m.practice || "";
    const email = f["e-Mail"] || m.email || "";
    const phone = f["Phone"] || m.phone || "";
    const license_type = f["California Midwifery License Type"] || "";
    const license_no = f["License Number"] || "";
    const city = f["City"] || "";
    const counties_raw = f["Counties Served"] || m.counties_served || "";
    const medi_cal = f["Medi-Cal"] || m.medi_cal || "";
    const web = f["Web Address"] || m.website || "";
    const practice_details = f["Practice Details"] || "";
    const counties_list = m.county_list || [];
    const primary_county = counties_list[0] || "";

    return {
      source: m.in_supabase ? "CALM + Supabase" : "CALM",
      tier: tierForRow({ email, website: web }),
      first,
      last,
      full_name: m.name || `${first} ${last}`.trim(),
      organization,
      license_type,
      license_no,
      city,
      primary_county,
      counties_all: counties_raw,
      email,
      phone,
      website: web,
      medi_cal,
      practice_details,
      profile_url: m.profile_url || "",
      notes: "",
    };
  });

// Supabase-only rows -> target shape (guessing at column names, degrades gracefully)
const supabaseTargets = supabaseOnly.map((p) => {
  const { first, last } = splitFullName(p.name || p.full_name || "");
  const location = p.location || p.address || p.city || "";
  const email = p.email || p.contact_email || "";
  const phone = p.phone || p.contact_phone || "";
  const website = p.website || p.url || "";
  const organization = p.practice || p.organization || p.business_name || "";
  const license_type = p.credentials || p.license_type || "";
  const license_no =
    extractLicenseNumber(p.license_number) ||
    extractLicenseNumber(p.license) ||
    extractLicenseNumber(p.license_no) ||
    "";

  // Extract city guess from location text
  let city = p.city || "";
  if (!city && location) {
    for (const c of SOCAL_CITIES) {
      if (new RegExp("\\b" + c.replace(/\s+/g, "\\s+") + "\\b", "i").test(location)) {
        city = c;
        break;
      }
    }
  }
  let primary_county = "";
  for (const co of SOCAL_COUNTIES) {
    if (new RegExp("\\b" + co.replace(/\s+/g, "\\s+") + "\\b", "i").test(location)) {
      primary_county = co;
      break;
    }
  }

  return {
    source: "Supabase",
    tier: tierForRow({ email, website }),
    first: p.first_name || first,
    last: p.last_name || last,
    full_name: p.name || p.full_name || `${first} ${last}`.trim(),
    organization,
    license_type,
    license_no,
    city,
    primary_county,
    counties_all: primary_county,
    email,
    phone,
    website,
    medi_cal: "",
    practice_details: p.description || p.bio || "",
    profile_url: "",
    notes: `Supabase row id: ${p.id || "?"} | raw location: ${location}`,
  };
});

const combined = [...calmTargets, ...supabaseTargets];

// Priority score (same as build-tracker) so the combined list is usefully
// ordered for Eddie to spot-check before the tracker is rebuilt.
function scoreTarget(r) {
  let s = 0;
  if (r.tier === 1) s += 5;
  else if (r.tier === 2) s += 2;
  if (String(r.license_type || "").toUpperCase().startsWith("LM")) s += 2;
  if (r.organization) s += 1;
  if (r.website) s += 1;
  if ((r.medi_cal || "").toLowerCase() === "no") s += 1;
  if (["Los Angeles", "Orange", "San Diego"].includes(r.primary_county)) s += 1;
  if (r.source === "CALM + Supabase") s += 1; // confirmed by two sources
  return s;
}
combined.sort((a, b) => {
  const ds = scoreTarget(b) - scoreTarget(a);
  if (ds !== 0) return ds;
  const dl = (a.last || "").localeCompare(b.last || "");
  if (dl !== 0) return dl;
  return (a.first || "").localeCompare(b.first || "");
});

// --- write outputs ----------------------------------------------------
function writeJson(relPath, data) {
  const p = resolve(process.cwd(), relPath);
  writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`Wrote ${relPath} (${data.length} rows)`);
}

writeJson("outreach/supabase-socal.json", supabaseSocal);
writeJson("outreach/calm-matched.json", calmMatched);
writeJson("outreach/supabase-only.json", supabaseOnly);
writeJson("outreach/combined-targets.json", combined);

// --- summary ----------------------------------------------------------
const t1 = combined.filter((r) => r.tier === 1).length;
const t2 = combined.filter((r) => r.tier === 2).length;
const t3 = combined.filter((r) => r.tier === 3).length;
const fromCalm = combined.filter((r) => r.source.startsWith("CALM")).length;
const fromSupabase = combined.filter((r) => r.source === "Supabase").length;
const fromBoth = combined.filter((r) => r.source === "CALM + Supabase").length;

console.log("\n=== SUMMARY ===");
console.log(`Total combined targets: ${combined.length}`);
console.log(`  From CALM only:        ${fromCalm - fromBoth}`);
console.log(`  From CALM + Supabase:  ${fromBoth}`);
console.log(`  From Supabase only:    ${fromSupabase}`);
console.log(`Tier 1 (has email):        ${t1}`);
console.log(`Tier 2 (has website):      ${t2}`);
console.log(`Tier 3 (needs research):   ${t3}`);
console.log("");
if (combined.length < 100) {
  console.log(
    `Short of 100 target goal by ${100 - combined.length}. ` +
      "Consider adding MBC + MANA scrapes to hit the full 100."
  );
} else {
  console.log("Hit the 100 target goal.");
}
