import type { Lead, LeadStatus } from "@/lib/types/lead";

const LEADS_KEY = "homebirth_leads";

export function saveLeads(leads: Lead[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function loadLeads(): Lead[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(LEADS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return null;
  }
}

export function updateLeadStatus(leadId: string, status: LeadStatus): void {
  const leads = loadLeads();
  if (!leads) return;
  const updated = leads.map((l) =>
    l.id === leadId ? { ...l, status } : l
  );
  saveLeads(updated);
}

export function clearLeads(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(LEADS_KEY);
}
