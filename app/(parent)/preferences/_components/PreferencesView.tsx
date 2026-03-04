"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { intakeQuestions } from "@/lib/data/intake-questions";
import { loadIntakeAnswers, saveIntakeAnswers } from "@/lib/utils/intake-storage";
import type { IntakeAnswers } from "@/lib/types/intake";
import { PreferenceGroup } from "./PreferenceGroup";

const CATEGORY_LABELS: Record<string, string> = {
  "hard-filter": "Hard Filters",
  capability: "Capability Match",
  "soft-match": "Soft Match",
  values: "Values & Preferences",
};

const CATEGORY_ORDER = ["hard-filter", "capability", "soft-match", "values"];

export function PreferencesView() {
  const router = useRouter();
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [zip, setZip] = useState("");
  const [lastUpdated] = useState(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));

  useEffect(() => {
    const stored = loadIntakeAnswers();
    if (stored) {
      setAnswers(stored.answers);
      setZip(stored.zip);
    }
  }, []);

  function handleChange(questionId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleUpdate() {
    saveIntakeAnswers(answers, zip);
    router.push("/results?updated=true");
  }

  function handleCancel() {
    router.back();
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    questions: intakeQuestions.filter((q) => q.category === cat),
  }));

  return (
    <div className="mx-auto max-w-[640px] px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-heading">
          Your preferences
        </h1>
        <p className="mt-1 text-sm text-muted">Last updated {lastUpdated}</p>
      </div>

      <div className="space-y-8">
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

      <div className="mt-10">
        <button
          onClick={handleUpdate}
          className="w-full rounded-[8px] bg-cta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta/90"
        >
          Update matches
        </button>
        <button
          onClick={handleCancel}
          className="mt-3 w-full text-center text-sm text-muted hover:text-heading"
        >
          Cancel
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Updating preferences will refresh your match list but won&apos;t affect consults you&apos;ve already sent.
      </p>
    </div>
  );
}
