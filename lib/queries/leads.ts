"use server";

import { createClient } from "@/lib/supabase/server";
import type { Lead, LeadStatus, LeadMessage, LeadPreferenceTags } from "@/lib/types/lead";
import type { IntakeAnswers } from "@/lib/types/intake";

/**
 * Get all leads for the current provider, mapped to the Lead type
 * expected by the inbox and dashboard components.
 */
export async function getProviderLeads(
  providerId: string,
  statusFilter?: LeadStatus
): Promise<Lead[]> {
  const supabase = await createClient();

  let query = supabase
    .from("consults")
    .select(`
      id,
      parent_id,
      provider_status,
      match_score,
      match_reasons,
      decline_reason,
      decline_note,
      created_at,
      parents (
        id, name, email, phone
      ),
      messages (
        id, sender, type, content, availability_slots, created_at
      )
    `)
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  if (statusFilter) {
    query = query.eq("provider_status", statusFilter);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Failed to fetch leads:", error);
    return [];
  }

  // Fetch intake answers for each parent in a single batch
  const parentIds = [...new Set(data.map((row) => row.parent_id).filter(Boolean))];
  const { data: intakes } = await supabase
    .from("intakes")
    .select("parent_id, answers, zip")
    .in("parent_id", parentIds.length > 0 ? parentIds : ["__none__"]);

  const intakeMap = new Map<string, { answers: IntakeAnswers; zip: string }>();
  if (intakes) {
    for (const intake of intakes) {
      intakeMap.set(intake.parent_id, {
        answers: intake.answers as IntakeAnswers,
        zip: intake.zip || "",
      });
    }
  }

  return data.map((row) => {
    const parent = row.parents as unknown as Record<string, unknown> | null;
    const messages = (row.messages || []) as unknown as Array<Record<string, unknown>>;
    const parentName = (parent?.name as string) || "Unknown";
    const intake = intakeMap.get(row.parent_id) || { answers: {}, zip: "" };

    return {
      id: row.id,
      parentName,
      parentEmail: (parent?.email as string) || "",
      parentPhone: (parent?.phone as string) || "",
      parentInitials: parentName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2),
      dueDate: extractDueDate(intake.answers),
      matchScore: row.match_score || 0,
      status: row.provider_status as LeadStatus,
      distance: 0, // Not tracked per-consult
      location: intake.zip || "",
      requestedAt: row.created_at,
      preferenceTags: extractPreferenceTags(intake.answers),
      matchReasons: row.match_reasons || [],
      intakeAnswers: intake.answers,
      messages: messages
        .sort((a, b) =>
          (a.created_at as string).localeCompare(b.created_at as string)
        )
        .map((msg) => ({
          id: msg.id as string,
          type: msg.sender as "system" | "provider" | "parent",
          content: (msg.content as string) || "",
          timestamp: msg.created_at as string,
          availabilitySlots: msg.availability_slots as LeadMessage["availabilitySlots"],
        })),
      declineReason: row.decline_reason || undefined,
      declineNote: row.decline_note || undefined,
    };
  });
}

/**
 * Get lead count by status for a provider (for dashboard pipeline).
 */
export async function getLeadCountsByStatus(
  providerId: string
): Promise<Record<LeadStatus, number>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("consults")
    .select("provider_status")
    .eq("provider_id", providerId);

  const counts: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    scheduled: 0,
    booked: 0,
    "not-a-fit": 0,
  };

  if (error || !data) return counts;

  for (const row of data) {
    const status = row.provider_status as LeadStatus;
    if (status in counts) counts[status]++;
  }

  return counts;
}

// ── Helpers ─────────────────────────────────────────────────────

function extractDueDate(answers: IntakeAnswers): string {
  const dd = answers["due-date"] as string | undefined;
  if (!dd) return "";
  // Convert "june-2026" → "June 2026"
  return dd
    .split("-")
    .map((part, i) =>
      i === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
    )
    .join(" ");
}

function extractPreferenceTags(answers: IntakeAnswers): LeadPreferenceTags {
  const tags: LeadPreferenceTags = {};

  const settingMap: Record<string, string> = {
    home: "Home birth",
    "birth-center": "Birth center",
    either: "Either",
  };
  const setting = answers["birth-setting"] as string | undefined;
  if (setting) tags.birthSetting = settingMap[setting] || setting;

  const dd = answers["due-date"] as string | undefined;
  if (dd) {
    tags.dueDate = dd
      .split("-")
      .map((part, i) =>
        i === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
      )
      .join(" ");
  }

  const vbac = answers["vbac"] as string | undefined;
  if (vbac === "yes" || vbac === "maybe") tags.vbac = true;

  const paymentMap: Record<string, string> = {
    "self-pay": "Self-pay",
    insurance: "Insurance",
    medicaid: "Medicaid",
    "not-sure": "Not sure",
    flexible: "Flexible",
  };
  const payment = answers["payment"] as string | undefined;
  if (payment) tags.payment = paymentMap[payment] || payment;

  const styleMap: Record<string, string> = {
    "hands-off": "Hands-off",
    balanced: "Balanced",
    guided: "Guided",
  };
  const style = answers["care-style"] as string | undefined;
  if (style) tags.careStyle = styleMap[style] || style;

  const lang = answers["language"] as string | undefined;
  if (lang) tags.language = lang.charAt(0).toUpperCase() + lang.slice(1);

  const prefs = answers["support-preferences"] as string[] | undefined;
  if (prefs && prefs.length > 0 && !prefs.includes("none")) {
    tags.supportPreferences = prefs.map(
      (p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ")
    );
  }

  return tags;
}
