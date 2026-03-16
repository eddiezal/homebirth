"use server";

import { signUpParent } from "@/lib/supabase/auth";
import { createConsult } from "@/lib/queries/consults";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyConsultCreated } from "@/lib/email/notify";
import { consultRequestSchema } from "@/lib/validations";
import type { IntakeAnswers } from "@/lib/types/intake";

export interface SubmitConsultResult {
  consultId?: string;
  error?: string;
  field?: string;
}

/**
 * Full consult submission flow:
 * 1. Validate input
 * 2. Create parent auth account (or find existing)
 * 3. Create parent DB record
 * 4. Persist intake answers (if provided)
 * 5. Create consult record + system message
 */
export async function submitConsultRequest(
  providerId: string,
  name: string,
  email: string,
  phone: string,
  matchScore: number,
  matchReasons: string[],
  intake?: { answers: IntakeAnswers; zip: string },
  password?: string
): Promise<SubmitConsultResult> {
  // 1. Validate input
  const parsed = consultRequestSchema.safeParse({
    providerId, name, email, phone, matchScore, matchReasons, password: password || undefined,
  });
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError.message, field: firstError.path[0] as string };
  }

  // 2. Create auth account (or get existing)
  const authResult = await signUpParent(name, email, phone, password || undefined);

  if (authResult.error) {
    // If account already exists, try to find existing parent
    if (authResult.error.includes("already exists")) {
      return { error: authResult.error, field: "email" };
    }
    return { error: authResult.error, field: authResult.field };
  }

  // 2. Get or create parent record
  // signUpParent already creates the parent record and returns parentId
  let parentId = authResult.parentId;

  if (!parentId) {
    // Fallback: shouldn't happen, but try to find by looking up the auth user
    // This handles edge cases where auth succeeded but parent insert was skipped
    return { error: "Failed to create your profile. Please try again." };
  }

  // 3. Persist intake answers if provided
  if (intake && intake.answers && Object.keys(intake.answers).length > 0) {
    const admin = createAdminClient();
    // Check if intake already exists for this parent
    const { data: existing } = await admin
      .from("intakes")
      .select("id")
      .eq("parent_id", parentId)
      .limit(1)
      .single();

    if (existing) {
      await admin
        .from("intakes")
        .update({ answers: intake.answers, zip: intake.zip || null })
        .eq("id", existing.id);
    } else {
      await admin.from("intakes").insert({
        parent_id: parentId,
        answers: intake.answers,
        zip: intake.zip || null,
      });
    }
  }

  // 4. Create consult
  const consultResult = await createConsult(
    parentId,
    providerId,
    matchScore,
    matchReasons
  );

  if ("error" in consultResult) {
    return { error: consultResult.error };
  }

  // Send notification emails (fire-and-forget — don't block the response)
  notifyConsultCreated(consultResult.consultId).catch((err) =>
    console.error("[notify] Failed to send consult created emails:", err)
  );

  return { consultId: consultResult.consultId };
}
