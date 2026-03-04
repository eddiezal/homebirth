"use client";

import { Textarea, ChipSelect } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import { SPECIALTY_OPTIONS } from "@/lib/types/onboarding";

interface Step4Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

export function Step4Approach({ data, onChange }: Step4Props) {
  function toggleSpecialty(s: string) {
    const next = data.specialties.includes(s)
      ? data.specialties.filter((x) => x !== s)
      : [...data.specialties, s];
    onChange({ specialties: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <Textarea
        label="Care philosophy"
        placeholder="Think about what you'd say in a first consult — 2-3 sentences about your approach to care"
        hint="Shown on your full profile page"
        value={data.philosophy}
        onChange={(e) => onChange({ philosophy: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium text-heading">
          Specialties
        </label>
        <ChipSelect
          options={SPECIALTY_OPTIONS}
          selected={data.specialties}
          onToggle={toggleSpecialty}
          className="mt-2"
        />
      </div>
    </div>
  );
}
