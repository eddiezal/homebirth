"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyProviderResponded, notifyConsultScheduled } from "@/lib/email/notify";
import { messageSchema, providerResponseSchema } from "@/lib/validations";
import type { LeadMessage, AvailabilitySlot } from "@/lib/types/lead";

/**
 * Get all messages for a consult thread.
 */
export async function getMessagesByConsult(
  consultId: string
): Promise<LeadMessage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("consult_id", consultId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    type: row.sender as "system" | "provider" | "parent",
    content: row.content || "",
    timestamp: row.created_at,
    availabilitySlots: row.availability_slots as AvailabilitySlot[] | undefined,
  }));
}

/**
 * Send a text message in a consult thread.
 */
export async function sendMessage(
  consultId: string,
  sender: "parent" | "provider",
  content: string
): Promise<{ messageId: string } | { error: string }> {
  const parsed = messageSchema.safeParse({ consultId, sender, content });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .insert({
      consult_id: consultId,
      sender,
      type: "text",
      content,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to send message:", error);
    return { error: error.message };
  }

  return { messageId: data.id };
}

/**
 * Send a provider response with availability slots.
 * Also updates consult status to contacted/responded.
 */
export async function sendProviderResponse(
  consultId: string,
  message: string,
  slots?: AvailabilitySlot[]
): Promise<{ error?: string }> {
  const parsed = providerResponseSchema.safeParse({ consultId, message, slots });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  // Send the text message
  if (message.trim()) {
    await supabase.from("messages").insert({
      consult_id: consultId,
      sender: "provider",
      type: "text",
      content: message,
    });
  }

  // Send availability slots as a separate message
  if (slots && slots.length > 0) {
    await supabase.from("messages").insert({
      consult_id: consultId,
      sender: "provider",
      type: "availability",
      content: "Available times for a free consult call",
      availability_slots: slots,
    });
  }

  // Update consult status
  const { error } = await supabase
    .from("consults")
    .update({
      provider_status: "contacted",
      parent_status: "responded",
    })
    .eq("id", consultId);

  if (error) {
    console.error("Failed to update consult status:", error);
    return { error: error.message };
  }

  // Notify parent that provider responded (fire-and-forget)
  notifyProviderResponded(consultId, message.trim() || "Available times sent").catch(
    (err) => console.error("[notify] Failed to send provider responded email:", err)
  );

  return {};
}

/**
 * Decline a consult request.
 */
export async function declineConsult(
  consultId: string,
  reason: string,
  note?: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("consults")
    .update({
      provider_status: "not-a-fit",
      decline_reason: reason,
      decline_note: note || null,
    })
    .eq("id", consultId);

  if (error) {
    console.error("Failed to decline consult:", error);
    return { error: error.message };
  }

  return {};
}

/**
 * Confirm a scheduled time slot.
 */
export async function confirmTimeSlot(
  consultId: string,
  date: string,
  time: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  // Update consult with scheduled date/time
  const { error: updateError } = await supabase
    .from("consults")
    .update({
      parent_status: "scheduled",
      provider_status: "scheduled",
      scheduled_date: date,
      scheduled_time: time,
    })
    .eq("id", consultId);

  if (updateError) {
    console.error("Failed to confirm time:", updateError);
    return { error: updateError.message };
  }

  // Create system message
  await supabase.from("messages").insert({
    consult_id: consultId,
    sender: "system",
    type: "scheduled",
    content: `Consult scheduled — ${date} at ${time}`,
    scheduled_date: date,
    scheduled_time: time,
  });

  // Notify both sides (fire-and-forget)
  notifyConsultScheduled(consultId, date, time).catch((err) =>
    console.error("[notify] Failed to send consult scheduled emails:", err)
  );

  return {};
}
