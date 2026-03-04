import type { IntakeAnswers } from "./intake";

export type LeadStatus = "new" | "contacted" | "scheduled" | "booked" | "not-a-fit";

export interface LeadPreferenceTags {
  birthSetting?: string;
  dueDate?: string;
  vbac?: boolean;
  payment?: string;
  careStyle?: string;
  language?: string;
  supportPreferences?: string[];
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  time: string;
  duration: string;
}

export interface LeadMessage {
  id: string;
  type: "system" | "provider" | "parent";
  content: string;
  timestamp: string;
  availabilitySlots?: AvailabilitySlot[];
}

export interface Lead {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentInitials: string;
  dueDate: string;
  matchScore: number;
  status: LeadStatus;
  distance: number;
  location: string;
  requestedAt: string;
  preferenceTags: LeadPreferenceTags;
  matchReasons: string[];
  intakeAnswers: IntakeAnswers;
  messages: LeadMessage[];
  declineReason?: string;
  declineNote?: string;
}

export interface DeclineReason {
  id: string;
  label: string;
}

export const DECLINE_REASONS: DeclineReason[] = [
  { id: "capacity", label: "At capacity for this due date" },
  { id: "scope", label: "Outside my scope of care" },
  { id: "fit", label: "Not a good fit" },
  { id: "other", label: "Other" },
];
