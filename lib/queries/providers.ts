"use server";

import { createClient } from "@/lib/supabase/server";
import type { Provider, ProviderProfile } from "@/lib/types/provider";

/**
 * Fetch providers for matching (onboarding complete only).
 * Returns the Provider shape expected by the scoring engine.
 */
export async function getAllProviders(): Promise<Provider[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("onboarding_complete", true);

  if (error) {
    console.error("Failed to fetch providers:", error);
    return [];
  }

  return (data || []).map(mapDbToProvider);
}

/**
 * Fetch directory providers (all, including unclaimed).
 * Used for the browsable directory when no intake has been completed.
 * Supports filtering by location text.
 */
export async function getDirectoryProviders(
  location?: string,
  limit = 50,
  offset = 0
): Promise<{ providers: Provider[]; total: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("providers")
    .select("*", { count: "exact" });

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  const { data, error, count } = await query
    .order("name")
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Failed to fetch directory providers:", error);
    return { providers: [], total: 0 };
  }

  return {
    providers: (data || []).map(mapDbToProvider),
    total: count || 0,
  };
}

/**
 * Search providers by name (for claim flow).
 */
export async function searchProvidersByName(
  name: string,
  limit = 20
): Promise<Provider[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .ilike("name", `%${name}%`)
    .is("user_id", null) // Only unclaimed
    .limit(limit);

  if (error) {
    console.error("Failed to search providers:", error);
    return [];
  }

  return (data || []).map(mapDbToProvider);
}

/**
 * Fetch a single provider with full profile (education, reviews, ratings).
 */
export async function getProviderById(id: string): Promise<ProviderProfile | null> {
  const supabase = await createClient();

  const { data: provider, error } = await supabase
    .from("providers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !provider) return null;

  // Fetch related data in parallel
  const [educationResult, reviewsResult, ratingsResult] = await Promise.all([
    supabase
      .from("provider_education")
      .select("*")
      .eq("provider_id", id)
      .order("year", { ascending: false }),
    supabase
      .from("provider_reviews")
      .select("*")
      .eq("provider_id", id)
      .order("date", { ascending: false }),
    supabase
      .from("provider_ratings")
      .select("*")
      .eq("provider_id", id),
  ]);

  return mapDbToProfile(
    provider,
    educationResult.data || [],
    reviewsResult.data || [],
    ratingsResult.data || []
  );
}

// ── Mappers ──────────────────────────────────────────────────────────────

function mapDbToProvider(row: Record<string, unknown>): Provider {
  return {
    id: row.id as string,
    name: row.name as string,
    credentials: row.credentials as string,
    location: row.location as string || "",
    distance: 0, // Computed at match time based on parent location
    yearsExperience: (row.years_experience as number) || 0,
    birthsAttended: (row.births_attended as string) || "",
    philosophy: (row.philosophy as string) || "",
    priceRange: (row.price_range as string) || "",
    responseTime: (row.response_time as string) || "",
    matchScore: 50, // Base score, overwritten by scoring engine
    matchReasons: [],
    tags: buildTags(row),
    acceptingClients: (row.accepting_clients as boolean) ?? true,
    photo: (row.photo_url as string) || undefined,
    birthSettings: (row.birth_settings as string[]) || [],
    languages: (row.languages as string[]) || [],
    insuranceAccepted: (row.insurance_accepted as string[]) || [],
    slidingScale: (row.sliding_scale as boolean) || false,
    onboardingComplete: (row.onboarding_complete as boolean) || false,
    // Pass through for scoring engine
    communicationTags: (row.communication_tags as string[]) || [],
  } as Provider & { communicationTags: string[] };
}

function mapDbToProfile(
  row: Record<string, unknown>,
  education: Record<string, unknown>[],
  reviews: Record<string, unknown>[],
  ratings: Record<string, unknown>[]
): ProviderProfile {
  const base = mapDbToProvider(row);

  return {
    ...base,
    specialties: (row.specialties as string[]) || [],
    scope: (row.scope as string[]) || [],
    transferPlan: (row.transfer_plan as string) || "",
    communicationTags: (row.communication_tags as string[]) || [],
    education: education.map((e) => ({
      institution: e.institution as string,
      degree: e.degree as string,
      year: e.year as number,
    })),
    verifications: [
      {
        type: "identity" as const,
        verified: (row.identity_verified as boolean) || false,
        verifiedDate: row.identity_verified ? "Verified" : undefined,
        detail: row.identity_verified ? "Confirmed via government-issued ID" : undefined,
      },
      {
        type: "license" as const,
        verified: (row.license_verified as boolean) || false,
        verifiedDate: row.license_verified ? "Verified" : undefined,
        detail: row.license_verified ? "Checked against state records" : undefined,
      },
      {
        type: "practice" as const,
        verified: (row.practice_verified as boolean) || false,
        verifiedDate: row.practice_verified ? "Verified" : undefined,
        detail: row.practice_verified ? "Confirmed active practice and location" : undefined,
      },
    ],
    reviews: reviews.map((r) => ({
      id: r.id as string,
      source: r.source as "google" | "yelp" | "facebook",
      author: (r.author as string) || "",
      rating: (r.rating as number) || 0,
      date: (r.date as string) || "",
      text: (r.text as string) || "",
    })),
    aggregateRating: (row.aggregate_rating as number) || 0,
    reviewCount: (row.review_count as number) || 0,
    ratingBreakdown: ratings.map((r) => ({
      source: r.source as "google" | "yelp" | "facebook",
      rating: (r.rating as number) || 0,
      count: (r.count as number) || 0,
    })),
    sentimentTags: (row.sentiment_tags as string[]) || [],
    whatsIncluded: (row.whats_included as string[]) || [],
    paymentNotes: (row.payment_notes as string) || "",
  };
}

/**
 * Build the tags array from specialties + values for matching.
 */
function buildTags(row: Record<string, unknown>): string[] {
  const specialties = (row.specialties as string[]) || [];
  const values = (row.values_tags as string[]) || [];
  const communication = (row.communication_tags as string[]) || [];

  // Derive tags the same way mock data had them
  const tags: string[] = [];

  // Check for VBAC in specialties or scope
  const scope = (row.scope as string[]) || [];
  if (
    specialties.some((s) => s.toLowerCase().includes("vbac")) ||
    scope.some((s) => s.toLowerCase().includes("vbac"))
  ) {
    tags.push("VBAC-friendly");
  }

  // Add language-based tags
  const languages = (row.languages as string[]) || [];
  if (languages.length >= 2) tags.push("Bilingual");

  // Add values as tags
  tags.push(...values);

  // Add relevant communication style tags
  if (communication.some((t) => t.toLowerCase().includes("evidence"))) {
    tags.push("Evidence-based");
  }
  if (communication.some((t) => t.toLowerCase().includes("guided"))) {
    tags.push("Guided");
  }

  return tags;
}
