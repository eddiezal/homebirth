import type { ConsultCard } from "@/lib/types/parent";
import type { MessageThread } from "@/lib/types/message";
import { STORAGE_KEYS } from "./storage-keys";

// --- Consults ---

export function saveParentConsults(consults: ConsultCard[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.PARENT_CONSULTS, JSON.stringify(consults));
}

export function loadParentConsults(): ConsultCard[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.PARENT_CONSULTS);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsultCard[];
  } catch {
    return null;
  }
}

// --- Threads ---

export function saveParentThreads(threads: MessageThread[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.PARENT_THREADS, JSON.stringify(threads));
}

export function loadParentThreads(): MessageThread[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.PARENT_THREADS);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MessageThread[];
  } catch {
    return null;
  }
}

// --- Session helpers ---

export function getParentSession(): { name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// --- Combined status update ---

export function confirmConsultTime(
  consultId: string,
  slotDay: string,
  slotTime: string
): void {
  // Update consult status
  const consults = loadParentConsults();
  if (consults) {
    const updated = consults.map((c) =>
      c.id === consultId
        ? { ...c, status: "scheduled" as const, scheduledDate: slotDay, scheduledTime: slotTime }
        : c
    );
    saveParentConsults(updated);
  }

  // Add scheduled card to thread
  const threads = loadParentThreads();
  if (threads) {
    const updated = threads.map((t) => {
      if (t.consultId !== consultId) return t;
      return {
        ...t,
        unread: false,
        messages: [
          ...t.messages,
          {
            id: `msg-sched-${Date.now()}`,
            sender: "system" as const,
            content: `Consult scheduled — ${slotDay} at ${slotTime}`,
            timestamp: new Date().toISOString(),
            type: "scheduled" as const,
            scheduledDate: slotDay,
            scheduledTime: slotTime,
          },
        ],
      };
    });
    saveParentThreads(updated);
  }
}
