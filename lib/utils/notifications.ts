import { loadParentThreads, loadParentConsults } from "./parent-storage";
import type { ConsultCard } from "@/lib/types/parent";

/** Count unread message threads for parent nav badge */
export function getUnreadMessageCount(): number {
  const threads = loadParentThreads();
  if (!threads) return 0;
  return threads.filter((t) => t.unread).length;
}

/** Check if a specific consult needs parent action (provider responded with times) */
export function hasActionNeeded(consult: ConsultCard): boolean {
  return consult.status === "responded";
}

/** Get dashboard greeting based on consult statuses */
export function getDashboardGreeting(name: string, consults: ConsultCard[]): string {
  const responded = consults.find((c) => c.status === "responded");
  if (responded) {
    return `${responded.providerName} responded — ready to schedule your consult.`;
  }

  const scheduled = consults.find((c) => c.status === "scheduled");
  if (scheduled) {
    return `Your consult with ${scheduled.providerName} is on ${scheduled.scheduledDate} at ${scheduled.scheduledTime}.`;
  }

  return "Your requests are out — providers typically respond within 24–48 hours.";
}

/** Get contextual stage for resource card */
export function getParentStage(consults: ConsultCard[]): "responded" | "sent" | "scheduled" {
  if (consults.some((c) => c.status === "scheduled")) return "scheduled";
  if (consults.some((c) => c.status === "responded")) return "responded";
  return "sent";
}
