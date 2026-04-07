/**
 * Score smoke tests
 * Run with: node --experimental-vm-modules score.smoke.mjs
 * Or paste into browser console on any page of the app.
 *
 * Each test describes who the parent is and what we expect to happen.
 */

// ─── Inline the types and data needed (no imports in vanilla JS) ──────────────

const providers = [
  {
    id: "provider-1", name: "Sarah Chen", credentials: "CNM, MSN",
    location: "North Park, San Diego", distance: 4.2, yearsExperience: 12,
    birthsAttended: "400+",
    philosophy: "Birth is a natural process.",
    priceRange: "$4,500 – $6,500", responseTime: "24h", matchScore: 97,
    matchReasons: [], tags: ["VBAC-friendly", "Bilingual", "Evidence-based"],
    acceptingClients: true, birthSettings: ["Home birth", "Birth center"],
    languages: ["English", "Mandarin"], insuranceAccepted: ["Blue Shield", "Aetna"],
    slidingScale: false, communicationTags: ["Evidence-based", "Balanced approach"],
  },
  {
    id: "provider-2", name: "Maria Rodriguez", credentials: "CPM, LM",
    location: "Hillcrest, San Diego", distance: 6.1, yearsExperience: 8,
    birthsAttended: "250+",
    philosophy: "Sacred space for each birth.",
    priceRange: "$3,800 – $5,200", responseTime: "12h", matchScore: 94,
    matchReasons: [], tags: ["Bilingual", "Trauma-informed", "Holistic"],
    acceptingClients: true, birthSettings: ["Home birth"],
    languages: ["English", "Spanish"], insuranceAccepted: ["Medicaid", "Blue Shield"],
    slidingScale: true, communicationTags: ["Gentle", "Trauma-informed"],
  },
  {
    id: "provider-3", name: "Jennifer Walsh", credentials: "CNM",
    location: "La Jolla, San Diego", distance: 8.5, yearsExperience: 15,
    birthsAttended: "600+",
    philosophy: "Evidence-based care meets compassionate support.",
    priceRange: "$5,500 – $7,500", responseTime: "48h", matchScore: 91,
    matchReasons: [], tags: ["VBAC-friendly", "Evidence-based", "Hospital transfers"],
    acceptingClients: true, birthSettings: ["Home birth", "Birth center"],
    languages: ["English"], insuranceAccepted: ["Blue Shield", "Cigna"],
    slidingScale: false, communicationTags: ["Evidence-based counseling", "Direct"],
  },
  {
    id: "provider-4", name: "Aisha Johnson", credentials: "CPM",
    location: "Ocean Beach, San Diego", distance: 5.8, yearsExperience: 6,
    birthsAttended: "150+",
    philosophy: "Transformative rite of passage.",
    priceRange: "$3,500 – $5,000", responseTime: "24h", matchScore: 88,
    matchReasons: [], tags: ["LGBTQ+ affirming", "Culturally responsive", "Holistic"],
    acceptingClients: true, birthSettings: ["Home birth"],
    languages: ["English"], insuranceAccepted: ["Self-pay", "Medicaid"],
    slidingScale: true, communicationTags: ["Gentle", "Affirming", "Empowering"],
  },
  {
    id: "provider-5", name: "Dr. Emily Park", credentials: "CNM, DNP",
    location: "Carlsbad, CA", distance: 28.3, yearsExperience: 20,
    birthsAttended: "800+",
    philosophy: "Calm, steady guidance.",
    priceRange: "$6,000 – $8,500", responseTime: "48h", matchScore: 82,
    matchReasons: [], tags: ["VBAC specialist", "Faith-friendly", "Guided"],
    acceptingClients: false, birthSettings: ["Home birth", "Birth center"],
    languages: ["English", "Korean"], insuranceAccepted: ["Blue Shield", "Aetna", "Tricare"],
    slidingScale: false, communicationTags: ["Guided", "Reassuring", "Faith-friendly"],
  },
];

// ─── Inline scoring logic (mirrors score.ts) ─────────────────────────────────

function passesBirthSetting(p, answers) {
  const setting = answers["birth-setting"];
  if (!setting || setting === "either") return true;
  const map = { home: "Home birth", "birth-center": "Birth center" };
  return p.birthSettings.includes(map[setting] ?? setting);
}
function passesPayment(p, answers) {
  const payment = answers["payment"];
  if (!payment || payment === "not-sure" || payment === "flexible") return true;
  if (payment === "medicaid") return p.slidingScale || p.insuranceAccepted.some(i => i.toLowerCase().includes("medicaid"));
  if (payment === "insurance") return p.insuranceAccepted.some(i => !i.toLowerCase().includes("medicaid") && i.toLowerCase() !== "self-pay");
  return true;
}
function passesDistance(p, answers) {
  const radius = answers["travel-radius"];
  if (!radius || radius === "30+") return true;
  return p.distance <= parseInt(radius, 10);
}
function passesVbac(p, answers) {
  const vbac = answers["vbac"];
  if (!vbac || vbac === "no") return true;
  return p.tags.some(t => t.toLowerCase().includes("vbac"));
}
function scoreCareStyle(p, answers) {
  const style = answers["care-style"];
  if (!style) return 0.5;
  const tagMap = { "hands-off": ["hands-off","low-intervention"], balanced: ["balanced","shared decision"], guided: ["guided","active support"] };
  const targets = tagMap[style] ?? [];
  const allTags = [...p.tags.map(t => t.toLowerCase()), ...p.communicationTags.map(t => t.toLowerCase())];
  return targets.some(t => allTags.some(pt => pt.includes(t))) ? 1 : 0.3;
}
function scoreLanguage(p, answers) {
  const lang = answers["language"];
  if (!lang || lang === "english") return 0.5;
  if (lang === "spanish") return p.languages.some(l => l.toLowerCase().includes("spanish")) ? 1 : 0;
  if (lang === "bilingual") return p.languages.length >= 2 ? 1 : 0.3;
  return 0.5;
}
function scoreSupportPreferences(p, answers) {
  const prefs = answers["support-preferences"];
  if (!prefs || prefs.includes("none") || prefs.length === 0) return 0.5;
  const tagMap = { "trauma-informed": ["trauma-informed"], "lgbtq-affirming": ["lgbtq","affirming"], "culturally-specific": ["culturally responsive","culturally specific"] };
  const allTags = p.tags.map(t => t.toLowerCase());
  const matched = prefs.filter(pref => { const targets = tagMap[pref] ?? []; return targets.some(t => allTags.some(pt => pt.includes(t))); });
  return matched.length / prefs.filter(p => p !== "none").length;
}
function scoreTopPriority(p, answers) {
  const priority = answers["top-priority"];
  if (!priority) return 0.5;
  const tagMap = { "calm-reassurance": ["calm","reassuring","gentle"], "evidence-based": ["evidence-based","evidence based"], advocacy: ["advocacy","affirming","empowering"], holistic: ["holistic","whole-person"] };
  const targets = tagMap[priority] ?? [];
  const allTags = p.tags.map(t => t.toLowerCase());
  return targets.some(t => allTags.some(pt => pt.includes(t))) ? 1 : 0.3;
}
function scoreBirthSetting(p, answers) {
  const setting = answers["birth-setting"];
  if (!setting || setting === "either") return 0.5;
  const map = { home: "Home birth", "birth-center": "Birth center" };
  return p.birthSettings.includes(map[setting]) ? 1 : 0;
}
function scoreProviders(providers, answers) {
  const hasAnswers = Object.keys(answers).length > 0;
  return providers
    .filter(p => {
      if (!hasAnswers) return true;
      return passesBirthSetting(p, answers) && passesPayment(p, answers) && passesDistance(p, answers) && passesVbac(p, answers);
    })
    .map(p => {
      if (!hasAnswers) return { ...p };
      const softScore = scoreBirthSetting(p, answers) * 0.20 + scoreCareStyle(p, answers) * 0.25 + scoreLanguage(p, answers) * 0.15 + scoreSupportPreferences(p, answers) * 0.20 + scoreTopPriority(p, answers) * 0.20;
      const computed = Math.round(softScore * 100);
      const blended = Math.round(computed * 0.7 + p.matchScore * 0.3);
      return { ...p, matchScore: Math.min(blended, 99) };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ─── Test runner ──────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}`);
    console.error(`    → ${e.message}`);
    failed++;
  }
}

function expect(val) {
  return {
    toBe(expected) {
      if (val !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(val)}`);
    },
    toContain(item) {
      if (!val.includes(item)) throw new Error(`Expected array to contain "${item}", got [${val.join(", ")}]`);
    },
    notToContain(item) {
      if (val.includes(item)) throw new Error(`Expected array NOT to contain "${item}"`);
    },
    toBeGreaterThan(n) {
      if (val <= n) throw new Error(`Expected ${val} > ${n}`);
    },
    toBeLessThanOrEqual(n) {
      if (val > n) throw new Error(`Expected ${val} <= ${n}`);
    },
    toBeAtLeast(n) {
      if (val < n) throw new Error(`Expected ${val} >= ${n}`);
    },
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\n── Hard filter tests ────────────────────────────────");

test("Birth center preference removes home-only providers", () => {
  const results = scoreProviders(providers, { "birth-setting": "birth-center" });
  const ids = results.map(p => p.id);
  // provider-2 and provider-4 are home-only
  expect(ids).notToContain("provider-2");
  expect(ids).notToContain("provider-4");
  expect(ids).toContain("provider-1");
});

test("Home birth preference removes birth-center-only providers (none in mock, sanity check)", () => {
  const results = scoreProviders(providers, { "birth-setting": "home" });
  // All mock providers offer home birth — should return all
  expect(results.length).toBe(5);
});

test("Either setting returns all providers", () => {
  const results = scoreProviders(providers, { "birth-setting": "either" });
  expect(results.length).toBe(5);
});

test("Medicaid filter — only providers accepting Medicaid or sliding scale", () => {
  const results = scoreProviders(providers, { payment: "medicaid" });
  const ids = results.map(p => p.id);
  // provider-2 (Medicaid + sliding), provider-4 (Medicaid + sliding) should pass
  expect(ids).toContain("provider-2");
  expect(ids).toContain("provider-4");
  // provider-1 no Medicaid, no sliding scale
  expect(ids).notToContain("provider-1");
});

test("Distance 5mi filter — only provider-1 at 4.2mi", () => {
  const results = scoreProviders(providers, { "travel-radius": "5" });
  expect(results.length).toBe(1);
  expect(results[0].id).toBe("provider-1");
});

test("Distance 10mi returns providers within 10 miles", () => {
  const results = scoreProviders(providers, { "travel-radius": "10" });
  const ids = results.map(p => p.id);
  // 4.2, 6.1, 5.8, 8.5 pass — 28.3 (provider-5) does not
  expect(ids).toContain("provider-1");
  expect(ids).toContain("provider-2");
  expect(ids).toContain("provider-4");
  expect(ids).notToContain("provider-5");
});

test("VBAC filter — removes providers without VBAC tag", () => {
  const results = scoreProviders(providers, { "first-birth": "no", vbac: "yes" });
  const ids = results.map(p => p.id);
  // VBAC-friendly: provider-1, provider-3, provider-5
  expect(ids).toContain("provider-1");
  expect(ids).toContain("provider-3");
  expect(ids).toContain("provider-5");
  // No VBAC tag: provider-2, provider-4
  expect(ids).notToContain("provider-2");
  expect(ids).notToContain("provider-4");
});

console.log("\n── Soft scoring tests ───────────────────────────────");

test("Spanish-speaking parent — Maria (bilingual Spanish) ranks above Jennifer (English only)", () => {
  const results = scoreProviders(providers, {
    "birth-setting": "home",
    language: "spanish",
  });
  const mariaIdx = results.findIndex(p => p.id === "provider-2");
  const jenniferIdx = results.findIndex(p => p.id === "provider-3");
  expect(mariaIdx).toBeGreaterThan(-1);
  expect(jenniferIdx).toBeGreaterThan(-1);
  if (mariaIdx > jenniferIdx) throw new Error(`Maria (${mariaIdx}) should rank above Jennifer (${jenniferIdx})`);
});

test("LGBTQ+ affirming preference — Aisha ranks above non-affirming providers", () => {
  const results = scoreProviders(providers, {
    "support-preferences": ["lgbtq-affirming"],
    "birth-setting": "home",
  });
  const aishaIdx = results.findIndex(p => p.id === "provider-4");
  const sarahIdx = results.findIndex(p => p.id === "provider-1");
  if (aishaIdx > sarahIdx) throw new Error(`Aisha (${aishaIdx}) should rank above Sarah (${sarahIdx}) for LGBTQ+ preference`);
});

test("Evidence-based priority — Jennifer and Sarah rank above Aisha", () => {
  const results = scoreProviders(providers, {
    "top-priority": "evidence-based",
    "birth-setting": "home",
  });
  const jenniferIdx = results.findIndex(p => p.id === "provider-3");
  const aishaIdx = results.findIndex(p => p.id === "provider-4");
  if (jenniferIdx > aishaIdx) throw new Error(`Jennifer (${jenniferIdx}) should rank above Aisha (${aishaIdx}) for evidence-based priority`);
});

test("Holistic priority — Aisha and Maria rank above Jennifer", () => {
  const results = scoreProviders(providers, {
    "top-priority": "holistic",
    "birth-setting": "home",
  });
  const aishaIdx = results.findIndex(p => p.id === "provider-4");
  const mariaIdx = results.findIndex(p => p.id === "provider-2");
  const jenniferIdx = results.findIndex(p => p.id === "provider-3");
  if (aishaIdx > jenniferIdx) throw new Error(`Aisha (${aishaIdx}) should rank above Jennifer (${jenniferIdx}) for holistic priority`);
  if (mariaIdx > jenniferIdx) throw new Error(`Maria (${mariaIdx}) should rank above Jennifer (${jenniferIdx}) for holistic priority`);
});

test("Guided care style — Dr. Park ranks above Aisha", () => {
  const results = scoreProviders(providers, {
    "care-style": "guided",
  });
  const parkIdx = results.findIndex(p => p.id === "provider-5");
  const aishaIdx = results.findIndex(p => p.id === "provider-4");
  if (parkIdx > aishaIdx) throw new Error(`Dr. Park (${parkIdx}) should rank above Aisha (${aishaIdx}) for guided care style`);
});

console.log("\n── Edge case tests ──────────────────────────────────");

test("Empty answers — returns all providers sorted by base matchScore", () => {
  const results = scoreProviders(providers, {});
  expect(results.length).toBe(5);
  expect(results[0].id).toBe("provider-1"); // 97 base
  expect(results[4].id).toBe("provider-5"); // 82 base
});

test("All filters combined — Medicaid + home birth + 10mi + VBAC = no results", () => {
  // No provider is within 10mi, accepts Medicaid, does home birth, AND has VBAC
  const results = scoreProviders(providers, {
    payment: "medicaid",
    "birth-setting": "home",
    "travel-radius": "10",
    vbac: "yes",
  });
  // provider-2 passes medicaid+home+10mi but not VBAC
  // provider-4 passes medicaid+home+10mi but not VBAC
  expect(results.length).toBe(0);
});

test("Scores are always 0–99", () => {
  const results = scoreProviders(providers, {
    "care-style": "balanced",
    "top-priority": "evidence-based",
    language: "english",
  });
  results.forEach(p => {
    expect(p.matchScore).toBeAtLeast(0);
    expect(p.matchScore).toBeLessThanOrEqual(99);
  });
});

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n── Results: ${passed} passed, ${failed} failed ─────────────────\n`);
