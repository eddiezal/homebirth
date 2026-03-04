"use client";

import type { IntakeQuestion, IntakeAnswers } from "@/lib/types/intake";
import { PreferenceRow } from "./PreferenceRow";

interface PreferenceGroupProps {
  label: string;
  questions: IntakeQuestion[];
  answers: IntakeAnswers;
  onChange: (questionId: string, value: string | string[]) => void;
}

export function PreferenceGroup({
  label,
  questions,
  answers,
  onChange,
}: PreferenceGroupProps) {
  return (
    <div>
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-primary">
        {label}
      </p>
      <div className="space-y-4">
        {questions.map((q) => (
          <PreferenceRow
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(val) => onChange(q.id, val)}
          />
        ))}
      </div>
    </div>
  );
}
