"use server";

import { createClient } from "@/lib/supabase/server";
import type { OnboardingData } from "@/lib/types/onboarding";

/**
 * Editable provider profile shape returned to the profile editor.
 */
export interface ProviderEditData {
  id: string;
  name: string;
  credentials: string;
  location: string;
  tagline: string;
  philosophy: string;
  specialties: string[];
  valuesTags: string[];
  birthSettings: string[];
  feeMin: number | null;
  feeMax: number | null;
  priceRange: string;
  whatsIncluded: string[];
  paymentOptions: string[];
  insuranceAccepted: string[];
  slidingScale: boolean;
  identityVerified: boolean;
  licenseVerified: boolean;
  practiceVerified: boolean;
}

/**
 * Fetch the current provider's profile for editing.
 */
export async function getProviderEditProfile(
  providerId: string
): Promise<ProviderEditData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("providers")
    .select(
      `id, name, credentials, location, tagline, philosophy,
       specialties, values_tags, birth_settings,
       fee_min, fee_max, price_range,
       whats_included, payment_options, insurance_accepted, sliding_scale,
       identity_verified, license_verified, practice_verified`
    )
    .eq("id", providerId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name || "",
    credentials: data.credentials || "",
    location: data.location || "",
    tagline: data.tagline || "",
    philosophy: data.philosophy || "",
    specialties: (data.specialties as string[]) || [],
    valuesTags: (data.values_tags as string[]) || [],
    birthSettings: (data.birth_settings as string[]) || [],
    feeMin: data.fee_min as number | null,
    feeMax: data.fee_max as number | null,
    priceRange: (data.price_range as string) || "",
    whatsIncluded: (data.whats_included as string[]) || [],
    paymentOptions: (data.payment_options as string[]) || [],
    insuranceAccepted: (data.insurance_accepted as string[]) || [],
    slidingScale: (data.sliding_scale as boolean) || false,
    identityVerified: (data.identity_verified as boolean) || false,
    licenseVerified: (data.license_verified as boolean) || false,
    practiceVerified: (data.practice_verified as boolean) || false,
  };
}

/**
 * Update provider profile fields from the profile editor.
 */
export async function updateProviderProfile(
  providerId: string,
  fields: {
    name?: string;
    tagline?: string;
    philosophy?: string;
    specialties?: string[];
    valuesTags?: string[];
    birthSettings?: string[];
    whatsIncluded?: string[];
    paymentOptions?: string[];
  }
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const update: Record<string, unknown> = {};
  if (fields.name !== undefined) update.name = fields.name;
  if (fields.tagline !== undefined) update.tagline = fields.tagline;
  if (fields.philosophy !== undefined) update.philosophy = fields.philosophy;
  if (fields.specialties !== undefined) update.specialties = fields.specialties;
  if (fields.valuesTags !== undefined) update.values_tags = fields.valuesTags;
  if (fields.birthSettings !== undefined) update.birth_settings = fields.birthSettings;
  if (fields.whatsIncluded !== undefined) update.whats_included = fields.whatsIncluded;
  if (fields.paymentOptions !== undefined) {
    update.payment_options = fields.paymentOptions;
    update.sliding_scale = fields.paymentOptions.includes("Sliding scale");
  }

  const { error } = await supabase
    .from("providers")
    .update(update)
    .eq("id", providerId);

  if (error) {
    console.error("Failed to update provider profile:", error);
    return { error: error.message };
  }

  return {};
}

/**
 * Save provider onboarding data to the providers table.
 * Maps OnboardingData fields to database columns.
 */
export async function saveProviderOnboarding(
  data: OnboardingData
): Promise<{ error?: string }> {
  const supabase = await createClient();

  // Get the current user to find their provider record
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: provider } = await supabase
    .from("providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!provider) return { error: "Provider record not found" };

  // Map OnboardingData → DB columns
  const update: Record<string, unknown> = {
    name: data.fullName || undefined,
    credentials: data.credentialType.join(", ") || undefined,
    location: data.practiceLocation || undefined,
    service_radius: data.serviceRadius ? parseInt(data.serviceRadius, 10) : null,
    birth_settings: data.birthSettings,
    tagline: data.tagline || null,
    philosophy: data.philosophy || null,
    specialties: data.specialties,
    values_tags: data.values,
    fee_min: data.feeMin ? parseInt(data.feeMin, 10) : null,
    fee_max: data.feeMax ? parseInt(data.feeMax, 10) : null,
    price_range: data.feeMin && data.feeMax
      ? `$${parseInt(data.feeMin, 10).toLocaleString()} – $${parseInt(data.feeMax, 10).toLocaleString()}`
      : null,
    whats_included: data.whatsIncluded,
    payment_options: data.paymentOptions,
    insurance_accepted: data.insurancePlans
      ? data.insurancePlans.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    sliding_scale: data.paymentOptions.includes("Sliding scale"),
    accepting_due_months: data.acceptingDueMonths,
    // Mirror intake (Step 7)
    care_style: data.careStyle || null,
    communication_vibe: data.communicationVibe || null,
    focus_description: data.focusDescription || null,
    transfer_approach: data.transferApproach || null,
    preferred_contact: data.preferredContact || null,
    education_style: data.educationStyle || null,
    scope_comfort: data.scopeComfort,
    partner_involvement: data.partnerInvolvement || null,
    // Verification (Step 8)
    identity_verified: data.identityVerified,
    license_verified: data.licenseVerified,
    practice_verified: data.practiceVerified,
    // Mark onboarding complete
    onboarding_complete: true,
    accepting_clients: true,
  };

  const { error } = await supabase
    .from("providers")
    .update(update)
    .eq("id", provider.id);

  if (error) {
    console.error("Failed to save provider onboarding:", error);
    return { error: error.message };
  }

  return {};
}

/**
 * Save a partial draft during onboarding (per-step save).
 * Does NOT set onboarding_complete.
 */
export async function saveProviderDraft(
  fields: Record<string, unknown>
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: provider } = await supabase
    .from("providers")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!provider) return { error: "Provider record not found" };

  const { error } = await supabase
    .from("providers")
    .update(fields)
    .eq("id", provider.id);

  if (error) {
    console.error("Failed to save provider draft:", error);
    return { error: error.message };
  }

  return {};
}
