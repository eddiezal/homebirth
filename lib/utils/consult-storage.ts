import type { ConsultRequest } from "@/lib/types/consult";

const CONSULT_KEY = "homebirth_consult";

export function saveConsultRequest(request: ConsultRequest): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CONSULT_KEY, JSON.stringify(request));
}

export function loadConsultRequest(): ConsultRequest | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CONSULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsultRequest;
  } catch {
    return null;
  }
}

export function clearConsultRequest(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CONSULT_KEY);
}
