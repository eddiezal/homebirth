/**
 * Seed a test provider account with sample consults, messages, and intake data.
 *
 * Usage:
 *   node scripts/seed-test-provider.mjs
 *
 * What it does:
 *   1. Picks the first unclaimed provider from the DB
 *   2. Creates a test auth user and links it to that provider
 *   3. Marks the provider as onboarding_complete so dashboard works
 *   4. Creates two test parents with intakes
 *   5. Creates consults (leads) at different pipeline stages with messages
 *
 * After running, sign in at /provider-sign-in with:
 *   Email:    test-provider@homebirth.test
 *   Password: testpass123
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually (no dotenv dependency)
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  process.env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Config ──────────────────────────────────────────────────────
const PROVIDER_EMAIL = "test-provider@homebirth.test";
const PROVIDER_PASSWORD = "testpass123";

const PARENTS = [
  {
    email: "jessica@homebirth.test",
    password: "testpass123",
    name: "Jessica Martinez",
    phone: "(619) 555-0101",
    zip: "92101",
    intake: {
      "travel-radius": "10",
      "due-date": "june-2026",
      urgency: "no-rush",
      "birth-setting": "home",
      payment: "insurance",
      "first-birth": "no",
      vbac: "yes",
      "care-style": "balanced",
      "communication-vibe": "gentle",
      "top-priority": "calm-reassurance",
      language: "english",
      "support-preferences": ["trauma-informed"],
    },
    consult: {
      matchScore: 97,
      matchReasons: [
        "Within 10 miles of your practice",
        "Open for June 2026 due date",
        "VBAC experienced — matches your specialty",
        "Insurance-compatible",
      ],
      status: "new",
    },
  },
  {
    email: "priya@homebirth.test",
    password: "testpass123",
    name: "Priya Sharma",
    phone: "(619) 555-0202",
    zip: "92103",
    intake: {
      "travel-radius": "15",
      "due-date": "august-2026",
      urgency: "within-a-month",
      "birth-setting": "either",
      payment: "self-pay",
      "first-birth": "yes",
      vbac: "no",
      "care-style": "guided",
      "communication-vibe": "educational",
      "top-priority": "evidence-based",
      language: "english",
      "support-preferences": [],
    },
    consult: {
      matchScore: 89,
      matchReasons: [
        "Within 15 miles of your practice",
        "Open for August 2026 due date",
        "First-time parent — within your scope",
        "Evidence-based approach matches your style",
      ],
      status: "contacted",
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────────
async function getOrCreateUser(email, password, meta = {}) {
  const { data: existing } = await admin.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === email);
  if (found) {
    console.log(`  ✓ Auth user exists: ${email} (${found.id})`);
    return found.id;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: meta,
  });

  if (error) {
    console.error(`  ✗ Failed to create user ${email}:`, error.message);
    process.exit(1);
  }

  console.log(`  + Created auth user: ${email} (${data.user.id})`);
  return data.user.id;
}

async function upsertRow(table, matchCol, matchVal, row) {
  const { data: existing } = await admin
    .from(table)
    .select("id")
    .eq(matchCol, matchVal)
    .limit(1)
    .single();

  if (existing) {
    console.log(`  ✓ ${table} row exists (${matchCol}=${matchVal})`);
    return existing.id;
  }

  const { data, error } = await admin
    .from(table)
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error(`  ✗ Failed to insert into ${table}:`, error.message);
    process.exit(1);
  }

  console.log(`  + Inserted ${table} row: ${data.id}`);
  return data.id;
}

// ── Main ────────────────────────────────────────────────────────
async function main() {
  console.log("\n🌱 Seeding test provider account...\n");

  // 1. Find the first unclaimed provider (no user_id)
  console.log("Step 1: Find an unclaimed provider");
  const { data: unclaimed, error: findErr } = await admin
    .from("providers")
    .select("id, name")
    .is("user_id", null)
    .limit(1)
    .single();

  if (findErr || !unclaimed) {
    console.error("  ✗ No unclaimed providers found in DB. Cannot proceed.");
    process.exit(1);
  }

  const providerId = unclaimed.id;
  const providerName = unclaimed.name;
  console.log(`  ✓ Using provider: ${providerName} (${providerId})`);

  // 2. Create provider auth user and link
  console.log("\nStep 2: Provider auth user");
  const providerUserId = await getOrCreateUser(PROVIDER_EMAIL, PROVIDER_PASSWORD, {
    role: "provider",
    name: providerName,
  });

  const { error: linkError } = await admin
    .from("providers")
    .update({
      user_id: providerUserId,
      onboarding_complete: true,
      accepting_clients: true,
      // Fill in some profile fields so the dashboard/profile editor has data
      tagline: "Compassionate, evidence-based care for your growing family.",
      philosophy: "I believe birth is a natural process that deserves skilled, patient support. Every family deserves to feel safe, informed, and empowered.",
      specialties: ["Prenatal care", "Natural birth", "Water birth"],
      values_tags: ["Evidence-focused", "Trauma-informed"],
      birth_settings: ["Home birth", "Birth center"],
      fee_min: 4500,
      fee_max: 6500,
      price_range: "$4,500 – $6,500",
      whats_included: ["Prenatal visits (10-12)", "Labor & birth attendance", "Postpartum visits (2)", "24/7 on-call availability"],
      payment_options: ["Insurance billing", "Self-pay", "Payment plans"],
      insurance_accepted: ["Blue Shield", "Aetna"],
    })
    .eq("id", providerId);

  if (linkError) {
    console.error("  ✗ Failed to link/update provider:", linkError.message);
    process.exit(1);
  }
  console.log(`  ✓ Linked auth user → provider & set onboarding_complete`);

  // 3. Create parent accounts, intakes, consults, and messages
  for (const parent of PARENTS) {
    console.log(`\nStep 3: Parent — ${parent.name}`);

    const parentUserId = await getOrCreateUser(parent.email, parent.password, {
      role: "parent",
      name: parent.name,
    });

    const parentId = await upsertRow("parents", "user_id", parentUserId, {
      user_id: parentUserId,
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      zip: parent.zip,
    });

    await upsertRow("intakes", "parent_id", parentId, {
      parent_id: parentId,
      answers: parent.intake,
      zip: parent.zip,
    });

    // Consult
    const { data: existingConsult } = await admin
      .from("consults")
      .select("id")
      .eq("parent_id", parentId)
      .eq("provider_id", providerId)
      .limit(1)
      .single();

    let consultId;
    if (existingConsult) {
      consultId = existingConsult.id;
      console.log(`  ✓ Consult exists: ${consultId}`);
    } else {
      const { data: newConsult, error: consultErr } = await admin
        .from("consults")
        .insert({
          parent_id: parentId,
          provider_id: providerId,
          match_score: parent.consult.matchScore,
          match_reasons: parent.consult.matchReasons,
          provider_status: parent.consult.status,
          parent_status: parent.consult.status === "new" ? "sent" : "responded",
        })
        .select("id")
        .single();

      if (consultErr) {
        console.error("  ✗ Failed to create consult:", consultErr.message);
        continue;
      }
      consultId = newConsult.id;
      console.log(`  + Created consult: ${consultId} (status: ${parent.consult.status})`);
    }

    // Messages — only seed if none exist
    const { count } = await admin
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("consult_id", consultId);

    if (count && count > 0) {
      console.log(`  ✓ Messages already exist for consult`);
      continue;
    }

    await admin.from("messages").insert({
      consult_id: consultId,
      sender: "system",
      type: "text",
      content: `${parent.name} requested a consult`,
    });
    console.log(`  + System message`);

    if (parent.consult.status === "contacted") {
      await admin.from("messages").insert({
        consult_id: consultId,
        sender: "provider",
        type: "text",
        content: `Hi ${parent.name.split(" ")[0]}! Thanks so much for reaching out. I'd love to chat about your birth plan and answer any questions. I have a few openings this week.`,
      });

      await admin.from("messages").insert({
        consult_id: consultId,
        sender: "provider",
        type: "availability",
        content: "Available times for a free consult call",
        availability_slots: [
          { id: "slot-1", day: "Wednesday, Mar 18", time: "10:00 AM", duration: "30 min" },
          { id: "slot-2", day: "Thursday, Mar 19", time: "2:00 PM", duration: "30 min" },
          { id: "slot-3", day: "Friday, Mar 20", time: "11:00 AM", duration: "30 min" },
        ],
      });
      console.log(`  + Provider response + availability slots`);
    }
  }

  console.log("\n──────────────────────────────────────────────");
  console.log("✅ Seed complete! Sign in with:\n");
  console.log("  Provider:");
  console.log(`    Email:    ${PROVIDER_EMAIL}`);
  console.log(`    Password: ${PROVIDER_PASSWORD}`);
  console.log(`    URL:      http://localhost:3000/provider-sign-in\n`);
  console.log("  Parents (sign in at /sign-in):");
  for (const p of PARENTS) {
    console.log(`    ${p.name}: ${p.email} / ${p.password}`);
  }
  console.log("\n  After signing in, check:");
  console.log(`    Provider:`);
  console.log(`    • /provider-dashboard — greeting, 1 new lead, activity timeline`);
  console.log(`    • /provider-inbox — 2 leads (Jessica=new, Priya=contacted)`);
  console.log(`    • /provider-profile — edit tagline/philosophy/specialties, save`);
  console.log(`    Parent (Jessica or Priya):`);
  console.log(`    • /dashboard — greeting, consult cards with status`);
  console.log(`    • /messages — thread list, conversation with provider`);
  console.log("──────────────────────────────────────────────\n");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
