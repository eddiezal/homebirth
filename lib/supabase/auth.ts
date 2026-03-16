"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export type AuthResult = {
  error?: string;
  field?: string;
};

/**
 * Sign in with email + password.
 * Returns error info if auth fails, otherwise redirects.
 */
export async function signInWithPassword(
  email: string,
  password: string,
  redirectTo: string
): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "That password isn't right.", field: "password" };
    }
    return { error: error.message, field: "email" };
  }

  redirect(redirectTo);
}

/**
 * Send a magic link (OTP) to the given email.
 */
export async function sendMagicLink(email: string): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    if (error.message.includes("Signups not allowed")) {
      return {
        error: "We don't have an account with that email. Did you mean to find a midwife?",
        field: "email",
      };
    }
    return { error: error.message, field: "email" };
  }

  return {};
}

/**
 * Sign up a new provider account.
 * Creates auth user + provider record in one flow.
 */
export async function signUpProvider(
  name: string,
  email: string,
  password: string,
  credentials: string[]
): Promise<AuthResult> {
  const admin = createAdminClient();

  // Create auth user via admin API — bypasses email confirmation
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "provider", name },
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      return { error: "An account with this email already exists.", field: "email" };
    }
    return { error: error.message, field: "email" };
  }

  // Create provider record
  if (data.user) {
    const { error: insertError } = await admin.from("providers").insert({
      user_id: data.user.id,
      name,
      credentials: credentials.join(", "),
      onboarding_complete: false,
    });

    if (insertError) {
      console.error("Failed to create provider record:", insertError);
      return { error: "Account created but profile setup failed. Please contact support.", field: "email" };
    }
  }

  return {};
}

/**
 * Sign up a parent account (from consult request modal).
 * Creates auth user + parent record.
 */
export async function signUpParent(
  name: string,
  email: string,
  phone: string,
  password?: string
): Promise<AuthResult & { parentId?: string }> {
  const admin = createAdminClient();

  // Create auth user via admin API — bypasses email confirmation
  // If no password provided, user will sign in via magic links
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: password || undefined,
    email_confirm: true,
    user_metadata: { role: "parent", name },
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      return { error: "An account with this email already exists. Please sign in.", field: "email" };
    }
    return { error: error.message, field: "email" };
  }

  // Create parent record
  if (data.user) {
    const { data: parentData, error: insertError } = await admin.from("parents").insert({
      user_id: data.user.id,
      name,
      email,
      phone,
    }).select("id").single();

    if (insertError) {
      console.error("Failed to create parent record:", insertError);
      return { error: "Account created but profile setup failed. Please try again.", field: "email" };
    }

    return { parentId: parentData?.id };
  }

  return {};
}

/**
 * Sign up a provider and claim an existing unclaimed profile.
 * Links the auth user to the existing provider row instead of creating a new one.
 */
export async function claimProviderProfile(
  providerId: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const admin = createAdminClient();

  // Verify the provider exists and is unclaimed
  const { data: provider, error: fetchError } = await admin
    .from("providers")
    .select("id, name, credentials, user_id")
    .eq("id", providerId)
    .single();

  if (fetchError || !provider) {
    return { error: "Provider profile not found.", field: "email" };
  }

  if (provider.user_id) {
    return { error: "This profile has already been claimed.", field: "email" };
  }

  // Create auth user via admin API — bypasses email confirmation
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "provider", name: provider.name },
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      return { error: "An account with this email already exists.", field: "email" };
    }
    return { error: error.message, field: "email" };
  }

  // Link the existing provider record to the new user
  if (data.user) {
    const { error: updateError } = await admin
      .from("providers")
      .update({ user_id: data.user.id })
      .eq("id", providerId);

    if (updateError) {
      console.error("Failed to claim provider profile:", updateError);
      return { error: "Account created but claim failed. Please contact support.", field: "email" };
    }
  }

  return {};
}

/**
 * Update the current user's password.
 */
export async function setPassword(password: string): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message, field: "password" };
  }

  return {};
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Get the current authenticated user, or null if not signed in.
 */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Get the current user's role and profile data.
 */
export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const role = user.user_metadata?.role as string | undefined;

  if (role === "provider") {
    const { data: provider } = await supabase
      .from("providers")
      .select("id, name")
      .eq("user_id", user.id)
      .single();

    return { user, role: "provider" as const, profile: provider };
  }

  if (role === "parent") {
    const { data: parent } = await supabase
      .from("parents")
      .select("id, name, email, phone")
      .eq("user_id", user.id)
      .single();

    return { user, role: "parent" as const, profile: parent };
  }

  return { user, role: role || "unknown", profile: null };
}
