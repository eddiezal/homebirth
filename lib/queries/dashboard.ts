"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  ProviderDashboardData,
  ActivityEvent,
  ProfileHealthItem,
} from "@/lib/types/dashboard";
import type { LeadStatus } from "@/lib/types/lead";

/**
 * Build a full ProviderDashboardData object from real DB queries.
 * Falls back to sensible defaults for fields we don't yet track (views, reviews).
 */
export async function getProviderDashboard(
  providerId: string
): Promise<ProviderDashboardData> {
  const supabase = await createClient();

  // ── Provider profile ──────────────────────────────────────────
  const { data: provider } = await supabase
    .from("providers")
    .select(
      "name, tagline, philosophy, fee_min, fee_max, identity_verified, license_verified, practice_verified"
    )
    .eq("id", providerId)
    .single();

  const providerName = (provider?.name as string) || "there";
  const firstName = providerName.split(" ")[0];

  // ── Lead / consult counts ─────────────────────────────────────
  const { data: consults } = await supabase
    .from("consults")
    .select("id, provider_status, created_at, parent_id, parents(name)")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  const rows = consults || [];

  const pipeline = { new: 0, contacted: 0, scheduled: 0, booked: 0 };
  for (const row of rows) {
    const s = row.provider_status as LeadStatus;
    if (s in pipeline) pipeline[s as keyof typeof pipeline]++;
  }

  const newLeadCount = pipeline.new;
  const totalBooked = pipeline.booked;
  const totalRequests = rows.length;

  // ── Activity timeline (last 10 events) ────────────────────────
  const { data: recentMessages } = await supabase
    .from("messages")
    .select("id, sender, type, content, created_at, consult_id")
    .in(
      "consult_id",
      rows.map((r) => r.id)
    )
    .order("created_at", { ascending: false })
    .limit(10);

  // Build a consult→parent name map
  const parentNameMap = new Map<string, string>();
  for (const row of rows) {
    const parent = row.parents as unknown as { name: string } | null;
    if (parent?.name) parentNameMap.set(row.id, parent.name);
  }

  const activity: ActivityEvent[] = (recentMessages || []).map((msg) => {
    const parentName = parentNameMap.get(msg.consult_id) || "A parent";
    const typeMap: Record<string, ActivityEvent["type"]> = {
      system: "request",
      provider: "response",
      parent: "request",
    };
    let eventType = typeMap[msg.sender] || ("system" as ActivityEvent["type"]);
    if (msg.type === "scheduled") eventType = "scheduled";

    let title = "";
    if (msg.sender === "system" && msg.type === "text") {
      title = `${parentName} requested a consult`;
      eventType = "request";
    } else if (msg.sender === "provider") {
      title = `You responded to ${parentName}`;
      eventType = "response";
    } else if (msg.sender === "parent") {
      title = `${parentName} sent a message`;
      eventType = "request";
    } else if (msg.type === "scheduled") {
      title = `Consult scheduled with ${parentName}`;
      eventType = "scheduled";
    } else {
      title = msg.content || "Activity";
    }

    return {
      id: msg.id,
      type: eventType,
      title,
      detail: msg.content || "",
      timestamp: msg.created_at,
    };
  });

  // ── Profile health ────────────────────────────────────────────
  const profileHealth: ProfileHealthItem[] = [
    { id: "photo", label: "Profile photo", completed: false, impactBadge: "2x more clicks" },
    { id: "tagline", label: "Tagline", completed: !!provider?.tagline },
    { id: "philosophy", label: "Philosophy", completed: !!provider?.philosophy },
    {
      id: "pricing",
      label: "Pricing",
      completed: !!(provider?.fee_min && provider?.fee_max),
    },
    {
      id: "verification",
      label: "Verification",
      completed: !!(
        provider?.identity_verified &&
        provider?.license_verified &&
        provider?.practice_verified
      ),
      impactBadge: "3x more consults",
    },
    { id: "reviews", label: "Review URLs", completed: false, impactBadge: "Builds trust" },
  ];

  // ── Greeting ──────────────────────────────────────────────────
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  let greeting = `Good ${timeOfDay}, ${firstName}.`;
  if (newLeadCount > 0) {
    greeting += ` You have **${newLeadCount} new lead${newLeadCount > 1 ? "s" : ""}** waiting for a response.`;
  }
  if (totalBooked > 0) {
    greeting += ` You've booked **${totalBooked} client${totalBooked > 1 ? "s" : ""}** through the platform so far.`;
  }
  if (newLeadCount === 0 && totalBooked === 0) {
    greeting += " Your profile is live — leads are on the way.";
  }

  // ── Month label ───────────────────────────────────────────────
  const monthLabel =
    new Date().toLocaleString("en-US", { month: "long" }) + " at a glance";

  return {
    providerName,
    greeting,
    newLeadCount,
    profileViews: 0, // Not tracked yet
    profileViewsChange: 0,
    totalBooked,
    monthLabel,
    metrics: {
      views: 0,
      requests: totalRequests,
      booked: totalBooked,
      responseTime: "—",
    },
    pipeline,
    activity: activity.slice(0, 6),
    profileHealth,
    aggregateRating: 0,
    reviewCount: 0,
    sentimentTags: [],
    viewsHistory: [0, 0, 0, 0, 0, 0],
    insight:
      newLeadCount > 0
        ? "Respond quickly — parents are 3x more likely to book when they hear back within 24 hours."
        : "Complete your profile to start receiving matched leads from parents in your area.",
  };
}
