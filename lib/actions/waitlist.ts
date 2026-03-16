"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { waitlistSchema } from "@/lib/validations";

export async function joinWaitlist(
  email: string,
  zip: string,
  city?: string,
  state?: string
): Promise<{ error?: string }> {
  const parsed = waitlistSchema.safeParse({ email, zip, city, state });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const admin = createAdminClient();

  // Check for duplicate
  const { data: existing } = await admin
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .eq("zip", zip)
    .limit(1)
    .single();

  if (existing) return {}; // Already on waitlist, silently succeed

  const { error } = await admin.from("waitlist").insert({
    email,
    zip,
    city: city || null,
    state: state || null,
  });

  if (error) {
    console.error("Waitlist insert failed:", error);
    return { error: "Something went wrong. Please try again." };
  }

  return {};
}

export async function getWaitlistCounts(): Promise<
  { city: string; state: string; count: number }[]
> {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("waitlist")
    .select("city, state");

  if (error || !data) return [];

  // Aggregate counts by city
  const counts = new Map<string, { city: string; state: string; count: number }>();
  for (const row of data) {
    const key = `${row.city || "Unknown"}, ${row.state || ""}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count++;
    } else {
      counts.set(key, { city: row.city || "Unknown", state: row.state || "", count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}
