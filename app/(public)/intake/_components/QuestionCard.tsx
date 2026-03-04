"use client";

import type { IntakeQuestion } from "@/lib/types/intake";
import { OptionCard } from "./OptionCard";
import { Button } from "@/components/ui";

interface QuestionCardProps {
  question: IntakeQuestion;
  selectedValue: string | string[] | undefined;
  onSelect: (value: string | string[]) => void;
  onAutoAdvance: () => void;
}

export function QuestionCard({
  question,
  selectedValue,
  onSelect,
  onAutoAdvance,
}: QuestionCardProps) {
  const isMultiSelect = question.type === "multi-select";
  const selectedArray = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue
      ? [selectedValue]
      : [];

  function handleOptionClick(optionId: string) {
    if (isMultiSelect) {
      const updated = selectedArray.includes(optionId)
        ? selectedArray.filter((id) => id !== optionId)
        : [...selectedArray, optionId];
      onSelect(updated);
    } else {
      onSelect(optionId);
      // Auto-advance after brief visual feedback for single-select
      setTimeout(onAutoAdvance, 300);
    }
  }

  return (
    <div className="w-full max-w-[640px]">
      <h2 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.015em] text-heading">
        {question.question}
      </h2>
      <p className="mt-3 text-muted">{question.helperText}</p>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selectedArray.includes(option.id)}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>

      {isMultiSelect && selectedArray.length > 0 && (
        <div className="mt-6">
          <Button onClick={onAutoAdvance}>Continue</Button>
        </div>
      )}
    </div>
  );
}
