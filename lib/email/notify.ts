"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "./send";
import {
  parentConsultConfirmation,
  parentProviderResponded,
  parentConsultScheduled,
  providerNewLead,
  providerTimeConfirmed,
} from "./templates";

/**
 * Look up a provider's email from auth.users via their user_id.
 */
async function getProviderEmail(
  admin: ReturnType<typeof createAdminClient>,
  userId: string | null
): Promise<string | null> {
  if (!userId) return null;
  const { data } = await admin.auth.admin.getUserById(userId);
  return data?.user?.email || null;
}

/**
 * Notify both sides when a consult request is created.
 * - Parent gets a confirmation email
 * - Provider gets a new lead email
 */
export async function notifyConsultCreated(consultId: string) {
  const admin = createAdminClient();

  const { data: consult } = await admin
    .from("consults")
    .select(
      "id, parent_id, match_score, match_reasons, parents(name, email), providers(name, user_id)"
    )
    .eq("id", consultId)
    .single();

  if (!consult) return;

  const parent = consult.parents as unknown as { name: string; email: string } | null;
  const provider = consult.providers as unknown as {
    name: string;
    user_id: string | null;
  } | null;
  if (!parent || !provider) return;

  // Email parent: confirmation
  const parentEmail = parentConsultConfirmation({
    parentName: parent.name.split(" ")[0],
    providerName: provider.name,
  });
  await sendEmail({ to: parent.email, ...parentEmail });

  // Email provider: new lead
  const providerEmailAddr = await getProviderEmail(admin, provider.user_id);

  // Get intake tags for context
  const { data: intake } = await admin
    .from("intakes")
    .select("answers")
    .eq("parent_id", consult.parent_id)
    .limit(1)
    .single();

  const answers = (intake?.answers || {}) as Record<string, string>;
  const tags: string[] = [];
  if (answers["birth-setting"]) tags.push(capitalize(answers["birth-setting"]));
  if (answers["vbac"] === "yes") tags.push("VBAC");
  if (answers["payment"]) tags.push(capitalize(answers["payment"]));
  if (answers["care-style"])
    tags.push(capitalize(answers["care-style"]) + " care");

  if (providerEmailAddr) {
    const provEmail = providerNewLead({
      providerName: provider.name.split(" ")[0],
      parentName: parent.name,
      matchScore: consult.match_score || 0,
      dueDate: answers["due-date"] || "TBD",
      tags,
    });
    await sendEmail({ to: providerEmailAddr, ...provEmail });
  }
}

/**
 * Notify parent when provider responds to their consult request.
 */
export async function notifyProviderResponded(
  consultId: string,
  messagePreview: string
) {
  const admin = createAdminClient();

  const { data: consult } = await admin
    .from("consults")
    .select("id, parents(name, email), providers(name)")
    .eq("id", consultId)
    .single();

  if (!consult) return;

  const parent = consult.parents as unknown as {
    name: string;
    email: string;
  } | null;
  const provider = consult.providers as unknown as { name: string } | null;
  if (!parent || !provider) return;

  const email = parentProviderResponded({
    parentName: parent.name.split(" ")[0],
    providerName: provider.name,
    messagePreview:
      messagePreview.length > 200
        ? messagePreview.substring(0, 200) + "..."
        : messagePreview,
  });

  await sendEmail({ to: parent.email, ...email });
}

/**
 * Notify both sides when a consult time is confirmed.
 */
export async function notifyConsultScheduled(
  consultId: string,
  day: string,
  time: string
) {
  const admin = createAdminClient();

  const { data: consult } = await admin
    .from("consults")
    .select("id, parents(name, email), providers(name, user_id)")
    .eq("id", consultId)
    .single();

  if (!consult) return;

  const parent = consult.parents as unknown as {
    name: string;
    email: string;
  } | null;
  const provider = consult.providers as unknown as {
    name: string;
    user_id: string | null;
  } | null;
  if (!parent || !provider) return;

  // Email parent: scheduled
  const parentEmail = parentConsultScheduled({
    parentName: parent.name.split(" ")[0],
    providerName: provider.name,
    day,
    time,
  });
  await sendEmail({ to: parent.email, ...parentEmail });

  // Email provider: time confirmed
  const providerEmailAddr = await getProviderEmail(admin, provider.user_id);
  if (providerEmailAddr) {
    const provEmail = providerTimeConfirmed({
      providerName: provider.name.split(" ")[0],
      parentName: parent.name,
      day,
      time,
    });
    await sendEmail({ to: providerEmailAddr, ...provEmail });
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}
