import type { AvailabilitySlot } from "./lead";

export type MessageSender = "parent" | "provider" | "system";
export type MessageType = "text" | "system_event" | "availability" | "scheduled" | "intake_snippet";

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  type: MessageType;
  availabilitySlots?: AvailabilitySlot[];
  scheduledDate?: string;
  scheduledTime?: string;
  preferenceTags?: string[];
}

export interface MessageThread {
  consultId: string;
  providerId: string;
  providerName: string;
  providerCredentials: string;
  providerInitials: string;
  matchScore: number;
  location: string;
  responseTime: string;
  messages: Message[];
  unread: boolean;
}
