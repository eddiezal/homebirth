"use client";

import { ChipSelect } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import { VALUES_OPTIONS } from "@/lib/types/onboarding";

interface Step5Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

export function Step5Values({ data, onChange }: Step5Props) {
  function toggleValue(v: string) {
    const next = data.values.includes(v)
      ? data.values.filter((x) => x !== v)
      : [...data.values, v];
    onChange({ values: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted">
        Select values that genuinely represent your practice. These appear as
        badges on your profile and are used in matching.
      </p>

      <ChipSelect
        options={VALUES_OPTIONS}
        selected={data.values}
        onToggle={toggleValue}
      />

      <div className="rounded-[8px] border border-card-border bg-gray-50 px-4 py-3">
        <p className="text-xs text-muted">
          Only select what genuinely represents your practice. Parents trust
          authenticity over keyword stuffing.
        </p>
      </div>
    </div>
  );
}
