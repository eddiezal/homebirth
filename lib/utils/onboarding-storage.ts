import type { OnboardingData } from "@/lib/types/onboarding";
import { INITIAL_ONBOARDING_DATA } from "@/lib/types/onboarding";

const ONBOARDING_KEY = "homebirth_onboarding";
const ONBOARDING_STEP_KEY = "homebirth_onboarding_step";

export function saveOnboardingData(data: OnboardingData): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
}

export function loadOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return INITIAL_ONBOARDING_DATA;
  const raw = sessionStorage.getItem(ONBOARDING_KEY);
  if (!raw) return INITIAL_ONBOARDING_DATA;
  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return INITIAL_ONBOARDING_DATA;
  }
}

export function saveOnboardingStep(step: number): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_STEP_KEY, String(step));
}

export function loadOnboardingStep(): number {
  if (typeof window === "undefined") return 1;
  const raw = sessionStorage.getItem(ONBOARDING_STEP_KEY);
  return raw ? parseInt(raw, 10) : 1;
}

export function clearOnboardingData(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ONBOARDING_KEY);
  sessionStorage.removeItem(ONBOARDING_STEP_KEY);
}
