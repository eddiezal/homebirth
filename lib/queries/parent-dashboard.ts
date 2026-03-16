"use server";

import { createClient } from "@/lib/supabase/server";
import type { ConsultCard, ConsultStatus } from "@/lib/types/parent";
import type { MessageThread, Message } from "@/lib/types/message";
import type { AvailabilitySlot } from "@/lib/types/lead";

/**
 * Get all consults for a parent, mapped to ConsultCard[] for the dashboard.
 */
export async function getParentConsultCards(
  parentId: string
): Promise<ConsultCard[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select(`
      id,
      provider_id,
      parent_status,
      match_score,
      scheduled_date,
      scheduled_time,
      created_at,
      updated_at,
      providers (
        id, name, credentials
      ),
      messages (
        id, sender, type, content, availability_slots, created_at
      )
    `)
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const provider = row.providers as unknown as { id: string; name: string; credentials: string } | null;
    const messages = (row.messages || []) as unknown as Array<Record<string, unknown>>;
    const providerName = provider?.name || "Provider";

    // Find last meaningful message
    const sorted = [...messages].sort((a, b) =>
      (b.created_at as string).localeCompare(a.created_at as string)
    );
    const lastMsg = sorted.find((m) => m.sender !== "system");
    const lastContent = lastMsg
      ? (lastMsg.content as string) || ""
      : "";

    // Find availability slots from provider messages
    const availMsg = sorted.find(
      (m) => m.type === "availability" && m.availability_slots
    );
    const slots = availMsg
      ? (availMsg.availability_slots as AvailabilitySlot[])
      : undefined;

    return {
      id: row.id,
      providerId: row.provider_id,
      providerName,
      providerCredentials: provider?.credentials || "",
      providerInitials: providerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2),
      matchScore: row.match_score || 0,
      status: row.parent_status as ConsultStatus,
      lastUpdate: row.updated_at || row.created_at,
      lastMessage: lastContent || undefined,
      availabilitySlots: slots,
      scheduledDate: row.scheduled_date || undefined,
      scheduledTime: row.scheduled_time || undefined,
    };
  });
}

/**
 * Get all message threads for a parent, mapped to MessageThread[].
 */
export async function getParentThreads(
  parentId: string
): Promise<MessageThread[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select(`
      id,
      provider_id,
      match_score,
      providers (
        id, name, credentials, location, response_time
      ),
      messages (
        id, sender, type, content, availability_slots,
        scheduled_date, scheduled_time, preference_tags, created_at
      )
    `)
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const provider = row.providers as unknown as {
      id: string;
      name: string;
      credentials: string;
      location: string;
      response_time: string;
    } | null;
    const rawMessages = (row.messages || []) as unknown as Array<Record<string, unknown>>;
    const providerName = provider?.name || "Provider";

    const messages: Message[] = rawMessages
      .sort((a, b) =>
        (a.created_at as string).localeCompare(b.created_at as string)
      )
      .map((msg) => ({
        id: msg.id as string,
        sender: msg.sender as Message["sender"],
        content: (msg.content as string) || "",
        timestamp: msg.created_at as string,
        type: (msg.type as Message["type"]) || "text",
        availabilitySlots: msg.availability_slots as AvailabilitySlot[] | undefined,
        scheduledDate: msg.scheduled_date as string | undefined,
        scheduledTime: msg.scheduled_time as string | undefined,
        preferenceTags: msg.preference_tags as string[] | undefined,
      }));

    // Thread is "unread" if last message is from provider or system (not parent)
    const lastMsg = messages[messages.length - 1];
    const unread = lastMsg ? lastMsg.sender !== "parent" : false;

    return {
      consultId: row.id,
      providerId: row.provider_id,
      providerName,
      providerCredentials: provider?.credentials || "",
      providerInitials: providerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2),
      matchScore: row.match_score || 0,
      location: provider?.location || "",
      responseTime: provider?.response_time || "",
      messages,
      unread,
    };
  });
}
