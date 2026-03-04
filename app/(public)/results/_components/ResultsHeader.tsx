"use client";

import { SectionLabel } from "@/components/ui";
import type { IntakeAnswers } from "@/lib/types/intake";

interface ResultsHeaderProps {
  count: number;
  location: string;
  answers: IntakeAnswers;
}

const answerLabels: Record<string, Record<string, string>> = {
  "birth-setting": { home: "Home birth", "birth-center": "Birth center", either: "Either setting" },
  "due-date": { "2026-q2": "Apr–Jun 2026", "2026-q3": "Jul–Sep 2026", "2026-q4": "Oct–Dec 2026", "2027-q1": "Jan–Mar 2027" },
  vbac: { yes: "VBAC", maybe: "VBAC (maybe)" },
  payment: { insurance: "Insurance", "self-pay": "Self-pay", medicaid: "Medicaid" },
  "care-style": { "hands-off": "Hands-off", balanced: "Balanced care", guided: "Guided" },
};

export function ResultsHeader({ count, location, answers }: ResultsHeaderProps) {
  const pills: string[] = [];

  for (const [key, labelMap] of Object.entries(answerLabels)) {
    const val = answers[key];
    if (typeof val === "string" && labelMap[val]) {
      pills.push(labelMap[val]);
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <SectionLabel>Your matches</SectionLabel>
        <h1 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.015em] text-heading">
          {count} provider{count !== 1 ? "s" : ""} matched in {location}
        </h1>
      </div>

      {pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
            >
              {pill}
            </span>
          ))}
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
