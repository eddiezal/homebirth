"use client";

import { Input, ChipSelect } from "@/components/ui";
import { Card } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import { RADIUS_OPTIONS, BIRTH_SETTING_OPTIONS } from "@/lib/types/onboarding";

interface Step2Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

export function Step2Location({ data, onChange }: Step2Props) {
  function selectRadius(r: string) {
    onChange({ serviceRadius: data.serviceRadius === r ? "" : r });
  }

  function toggleBirthSetting(bs: string) {
    const next = data.birthSettings.includes(bs)
      ? data.birthSettings.filter((b) => b !== bs)
      : [...data.birthSettings, bs];
    onChange({ birthSettings: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Practice location"
        placeholder="Street address or area, San Diego, CA"
        value={data.practiceLocation}
        onChange={(e) => onChange({ practiceLocation: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium text-heading">
          Service radius (miles)
        </label>
        <ChipSelect
          options={RADIUS_OPTIONS}
          selected={data.serviceRadius ? [data.serviceRadius] : []}
          onToggle={selectRadius}
          multiple={false}
          className="mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-heading">
          Birth settings offered
        </label>
        <ChipSelect
          options={BIRTH_SETTING_OPTIONS}
          selected={data.birthSettings}
          onToggle={toggleBirthSetting}
          className="mt-2"
        />
      </div>

      <Card variant="teal" padding="p-4">
        <p className="text-sm text-primary">
          Parents outside your radius will never see your profile. No wasted leads.
        </p>
      </Card>
    </div>
  );
}
