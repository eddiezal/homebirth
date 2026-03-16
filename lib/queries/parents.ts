"use server";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Create a parent record linked to an auth user.
 * Uses admin client because this runs during signup before session is established.
 */
export async function createParent(
  userId: string,
  name: string,
  email: string,
  phone: string,
  zip?: string
): Promise<{ parentId: string } | { error: string }> {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("parents")
    .insert({
      user_id: userId,
      name,
      email,
      phone,
      zip: zip || null,
    })
    .select("id")
    .single();

  if (error) {
    // If parent already exists for this user, return their ID
    if (error.code === "23505") {
      const { data: existing } = await admin
        .from("parents")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (existing) return { parentId: existing.id };
    }
    console.error("Failed to create parent:", error);
    return { error: error.message };
  }

  return { parentId: data.id };
}

/**
 * Get parent by user_id.
 */
export async function getParentByUserId(
  userId: string
): Promise<{ id: string; name: string; email: string; phone: string; zip: string | null } | null> {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("parents")
    .select("id, name, email, phone, zip")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data;
}
