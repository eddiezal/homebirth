import type { ConsultCard } from "@/lib/types/parent";

export const mockConsults: ConsultCard[] = [
  {
    id: "consult-1",
    providerId: "provider-1",
    providerName: "Sarah Chen",
    providerCredentials: "CNM, MSN",
    providerInitials: "SC",
    matchScore: 97,
    status: "responded",
    lastUpdate: "2026-03-03T09:15:00Z",
    lastMessage:
      "Hi! Thanks so much for reaching out. I'd love to chat about your birth plan. I have a few openings this week — would any of these work?",
    availabilitySlots: [
      { id: "slot-1", day: "Thursday, Mar 5", time: "10:00 AM", duration: "30 min" },
      { id: "slot-2", day: "Friday, Mar 6", time: "2:00 PM", duration: "30 min" },
      { id: "slot-3", day: "Monday, Mar 9", time: "11:00 AM", duration: "30 min" },
    ],
  },
  {
    id: "consult-2",
    providerId: "provider-2",
    providerName: "Maria Rodriguez",
    providerCredentials: "CPM, LM",
    providerInitials: "MR",
    matchScore: 94,
    status: "viewed",
    lastUpdate: "2026-03-02T14:30:00Z",
  },
  {
    id: "consult-3",
    providerId: "provider-3",
    providerName: "Jennifer Walsh",
    providerCredentials: "CNM",
    providerInitials: "JW",
    matchScore: 91,
    status: "sent",
    lastUpdate: "2026-03-01T16:00:00Z",
  },
  {
    id: "consult-4",
    providerId: "provider-4",
    providerName: "Aisha Johnson",
    providerCredentials: "CPM",
    providerInitials: "AJ",
    matchScore: 88,
    status: "scheduled",
    lastUpdate: "2026-02-28T11:00:00Z",
    scheduledDate: "Thursday, Mar 6",
    scheduledTime: "2:00 PM",
  },
];
