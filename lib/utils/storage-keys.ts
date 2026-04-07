/** Centralized sessionStorage key constants. Import everywhere, no magic strings. */

export const STORAGE_KEYS = {
  // Sprint 1
  INTAKE: "homebirth_intake",

  // Sprint 2
  CONSULT: "homebirth_consult",
  AUTH_SESSION: "homebirth_auth_session",
  AUTH_EMAIL: "homebirth_auth_email",
  PROVIDER_APPLY: "homebirth_provider_apply",

  // Sprint 3
  LEADS: "homebirth_leads",
  ONBOARDING: "homebirth_onboarding",
  ONBOARDING_STEP: "homebirth_onboarding_step",

  // Sprint 4
  PARENT_SESSION: "hb_parent_session",
  PARENT_CONSULTS: "hb_parent_consults",
  PARENT_THREADS: "hb_parent_threads",

  // Checklist
  CHECKLIST: "homebirth_checklist",
} as const;

/** Clear all homebirth sessionStorage keys. Useful for testing. */
export function clearAllStorage(): void {
  if (typeof window === "undefined") return;
  for (const key of Object.values(STORAGE_KEYS)) {
    sessionStorage.removeItem(key);
  }
}
