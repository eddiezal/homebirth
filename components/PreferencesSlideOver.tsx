"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { intakeQuestions } from "@/lib/data/intake-questions";
import { loadIntakeAnswers, saveIntakeAnswers } from "@/lib/utils/intake-storage";
import type { IntakeAnswers } from "@/lib/types/intake";
import { PreferenceGroup } from "@/app/(parent)/preferences/_components/PreferenceGroup";

interface PreferencesSlideOverProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  "hard-filter": "Hard Filters",
  capability: "Capability Match",
  "soft-match": "Soft Match",
  values: "Values & Preferences",
};

const CATEGORY_ORDER = ["hard-filter", "capability", "soft-match", "values"];

export function PreferencesSlideOver({ open, onClose, onUpdate }: PreferencesSlideOverProps) {
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [zip, setZip] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      const stored = loadIntakeAnswers();
      if (stored) {
        setAnswers(stored.answers);
        setZip(stored.zip);
      }
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  function handleChange(questionId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleUpdate() {
    saveIntakeAnswers(answers, zip);
    onClose();
    onUpdate();
  }

  if (!open || !mounted) return null;

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    questions: intakeQuestions.filter((q) => q.category === cat),
  }));

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[400px] overflow-y-auto bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-heading">Edit preferences</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-heading"
            aria-label="Close"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {grouped.map((group) => (
            <PreferenceGroup
              key={group.category}
              label={group.label}
              questions={group.questions}
              answers={answers}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="mt-8 sticky bottom-0 bg-white pb-2 pt-4 border-t border-card-border">
          <button
            onClick={handleUpdate}
            className="w-full rounded-[8px] bg-cta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta/90"
          >
            Update matches
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full text-center text-sm text-muted hover:text-heading"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
