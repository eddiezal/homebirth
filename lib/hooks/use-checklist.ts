"use client";

import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "@/lib/utils/storage-keys";

const STORAGE_KEY = STORAGE_KEYS.CHECKLIST;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable — degrade silently
  }
}

/**
 * Persist checked question IDs to localStorage (SSR-safe).
 *
 * On account creation, call `migrateChecklist(parentId)` to move
 * localStorage state to the database via the API route.
 */
export function useChecklist() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    setCheckedIds(new Set(readStorage()));
    setHydrated(true);
  }, []);

  // Sync to localStorage on change (skip the initial hydration write)
  useEffect(() => {
    if (!hydrated) return;
    writeStorage(Array.from(checkedIds));
  }, [checkedIds, hydrated]);

  const toggleQuestion = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isChecked = useCallback(
    (id: string) => checkedIds.has(id),
    [checkedIds],
  );

  const checkedCount = checkedIds.size;

  return { checkedIds, toggleQuestion, isChecked, checkedCount };
}

/**
 * Migrate localStorage checklist to the database.
 * Call this after account creation (signUpParent).
 * Clears localStorage on success.
 */
export async function migrateChecklist(parentId: string): Promise<void> {
  const ids = readStorage();
  if (ids.length === 0) return;

  try {
    const res = await fetch("/api/checklist/migrate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentId, questionIds: ids }),
    });

    if (res.ok) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Migration failed — localStorage persists as fallback
  }
}
