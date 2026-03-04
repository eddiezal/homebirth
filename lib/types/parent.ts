import type { IntakeAnswers } from "./intake";
import type { AvailabilitySlot } from "./lead";

export type ConsultStatus = "sent" | "viewed" | "responded" | "scheduled" | "completed";

export interface ParentSession {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface ConsultCard {
  id: string;
  providerId: string;
  providerName: string;
  providerCredentials: string;
  providerInitials: string;
  matchScore: number;
  status: ConsultStatus;
  lastUpdate: string;
  lastMessage?: string;
  availabilitySlots?: AvailabilitySlot[];
  scheduledDate?: string;
  scheduledTime?: string;
}
