"use client";

import type { IntakeQuestion } from "@/lib/types/intake";

interface PreferenceRowProps {
  question: IntakeQuestion;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}

export function PreferenceRow({ question, value, onChange }: PreferenceRowProps) {
  const isMulti = question.type === "multi-select";
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  function handleToggle(optionId: string) {
    if (isMulti) {
      const next = selected.includes(optionId)
        ? selected.filter((s) => s !== optionId)
        : [...selected, optionId];
      onChange(next);
    } else {
      onChange(optionId);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-[12px] border border-card-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="text-sm font-medium text-heading">
        {question.question.replace("?", "")}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {question.options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleToggle(opt.id)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-card-border text-muted hover:border-primary hover:text-heading"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
