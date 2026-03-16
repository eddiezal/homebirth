"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface ConsultRecord {
  id: string;
  parentId: string;
  providerId: string;
  parentStatus: string;
  providerStatus: string;
  matchScore: number;
  matchReasons: string[];
  scheduledDate: string | null;
  scheduledTime: string | null;
  createdAt: string;
  // Joined provider info (when querying for parent)
  provider?: {
    id: string;
    name: string;
    credentials: string;
    location: string;
    photo: string | null;
    responseTime: string;
  };
  // Joined parent info (when querying for provider)
  parent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

/**
 * Create a consult request + initial system message.
 * Uses admin client because the parent's session may not be established yet.
 */
export async function createConsult(
  parentId: string,
  providerId: string,
  matchScore: number,
  matchReasons: string[]
): Promise<{ consultId: string } | { error: string }> {
  const admin = createAdminClient();

  // Insert consult
  const { data: consult, error } = await admin
    .from("consults")
    .insert({
      parent_id: parentId,
      provider_id: providerId,
      parent_status: "sent",
      provider_status: "new",
      match_score: matchScore,
      match_reasons: matchReasons,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to create consult:", error);
    return { error: error.message };
  }

  // Create initial system message
  await admin.from("messages").insert({
    consult_id: consult.id,
    sender: "system",
    type: "system_event",
    content: "Consult request sent",
  });

  return { consultId: consult.id };
}

/**
 * Get a single consult by ID with provider info (for confirmation page).
 */
export async function getConsultById(
  consultId: string
): Promise<ConsultRecord | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select(`
      id,
      parent_id,
      provider_id,
      parent_status,
      provider_status,
      match_score,
      match_reasons,
      scheduled_date,
      scheduled_time,
      created_at,
      providers (
        id,
        name,
        credentials,
        location,
        photo_url,
        response_time
      )
    `)
    .eq("id", consultId)
    .single();

  if (error || !data) return null;

  const provider = data.providers as unknown as Record<string, unknown> | null;

  return {
    id: data.id,
    parentId: data.parent_id,
    providerId: data.provider_id,
    parentStatus: data.parent_status,
    providerStatus: data.provider_status,
    matchScore: data.match_score || 0,
    matchReasons: data.match_reasons || [],
    scheduledDate: data.scheduled_date,
    scheduledTime: data.scheduled_time,
    createdAt: data.created_at,
    provider: provider
      ? {
          id: provider.id as string,
          name: provider.name as string,
          credentials: (provider.credentials as string) || "",
          location: (provider.location as string) || "",
          photo: (provider.photo_url as string) || null,
          responseTime: (provider.response_time as string) || "",
        }
      : undefined,
  };
}

/**
 * Get all consults for a parent (for parent dashboard).
 */
export async function getConsultsByParent(
  parentId: string
): Promise<ConsultRecord[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select(`
      id,
      parent_id,
      provider_id,
      parent_status,
      provider_status,
      match_score,
      match_reasons,
      scheduled_date,
      scheduled_time,
      created_at,
      providers (
        id,
        name,
        credentials,
        location,
        photo_url,
        response_time
      )
    `)
    .eq("parent_id", parentId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const provider = row.providers as unknown as Record<string, unknown> | null;
    return {
      id: row.id,
      parentId: row.parent_id,
      providerId: row.provider_id,
      parentStatus: row.parent_status,
      providerStatus: row.provider_status,
      matchScore: row.match_score || 0,
      matchReasons: row.match_reasons || [],
      scheduledDate: row.scheduled_date,
      scheduledTime: row.scheduled_time,
      createdAt: row.created_at,
      provider: provider
        ? {
            id: provider.id as string,
            name: provider.name as string,
            credentials: (provider.credentials as string) || "",
            location: (provider.location as string) || "",
            photo: (provider.photo_url as string) || null,
            responseTime: (provider.response_time as string) || "",
          }
        : undefined,
    };
  });
}

/**
 * Get all consults for a provider (for provider inbox).
 */
export async function getConsultsByProvider(
  providerId: string
): Promise<ConsultRecord[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select(`
      id,
      parent_id,
      provider_id,
      parent_status,
      provider_status,
      match_score,
      match_reasons,
      scheduled_date,
      scheduled_time,
      created_at,
      parents (
        id,
        name,
        email,
        phone
      )
    `)
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const parent = row.parents as unknown as Record<string, unknown> | null;
    return {
      id: row.id,
      parentId: row.parent_id,
      providerId: row.provider_id,
      parentStatus: row.parent_status,
      providerStatus: row.provider_status,
      matchScore: row.match_score || 0,
      matchReasons: row.match_reasons || [],
      scheduledDate: row.scheduled_date,
      scheduledTime: row.scheduled_time,
      createdAt: row.created_at,
      parent: parent
        ? {
            id: parent.id as string,
            name: parent.name as string,
            email: (parent.email as string) || "",
            phone: (parent.phone as string) || "",
          }
        : undefined,
    };
  });
}
