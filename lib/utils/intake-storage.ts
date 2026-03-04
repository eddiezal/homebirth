import type { IntakeAnswers } from "@/lib/types/intake";

const INTAKE_KEY = "homebirth_intake";

interface StoredIntake {
  answers: IntakeAnswers;
  zip: string;
}

export function saveIntakeAnswers(answers: IntakeAnswers, zip: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(INTAKE_KEY, JSON.stringify({ answers, zip }));
}

export function loadIntakeAnswers(): StoredIntake | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(INTAKE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredIntake;
  } catch {
    return null;
  }
}

export function clearIntakeAnswers(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(INTAKE_KEY);
}
