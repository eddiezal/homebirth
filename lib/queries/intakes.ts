"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { IntakeAnswers } from "@/lib/types/intake";

/**
 * Save or update intake answers for a parent.
 * Uses admin client when called during signup flow (session not yet established).
 */
export async function saveIntake(
  parentId: string,
  answers: IntakeAnswers,
  zip: string,
  useAdmin = false
): Promise<{ intakeId: string } | { error: string }> {
  const client = useAdmin ? createAdminClient() : await createClient();

  // Check if intake already exists for this parent
  const { data: existing } = await client
    .from("intakes")
    .select("id")
    .eq("parent_id", parentId)
    .limit(1)
    .single();

  if (existing) {
    const { error } = await client
      .from("intakes")
      .update({ answers, zip: zip || null })
      .eq("id", existing.id);

    if (error) {
      console.error("Failed to update intake:", error);
      return { error: error.message };
    }
    return { intakeId: existing.id };
  }

  const { data, error } = await client
    .from("intakes")
    .insert({
      parent_id: parentId,
      answers,
      zip: zip || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save intake:", error);
    return { error: error.message };
  }

  return { intakeId: data.id };
}

/**
 * Get the most recent intake for a parent.
 */
export async function getIntakeByParent(
  parentId: string
): Promise<{ id: string; answers: IntakeAnswers; zip: string } | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("intakes")
    .select("id, answers, zip")
    .eq("parent_id", parentId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    answers: data.answers as IntakeAnswers,
    zip: data.zip || "",
  };
}
