"use client";

import { Card, ChipSelect } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import {
  CARE_STYLE_OPTIONS,
  COMMUNICATION_VIBE_OPTIONS,
  FOCUS_OPTIONS,
  TRANSFER_OPTIONS,
  CONTACT_OPTIONS,
  EDUCATION_STYLE_OPTIONS,
  SCOPE_COMFORT_OPTIONS,
  PARTNER_OPTIONS,
} from "@/lib/types/onboarding";

interface Step7Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

interface SingleSelectGroupProps {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onSelect: (id: string) => void;
}

function SingleSelectGroup({ label, options, value, onSelect }: SingleSelectGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-heading">{label}</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id === value ? "" : opt.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              value === opt.id
                ? "border-primary bg-primary text-white"
                : "border-card-border text-heading hover:border-primary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Step7Matching({ data, onChange }: Step7Props) {
  function toggleScope(s: string) {
    const next = data.scopeComfort.includes(s)
      ? data.scopeComfort.filter((x) => x !== s)
      : [...data.scopeComfort, s];
    onChange({ scopeComfort: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <Card variant="teal" padding="p-4">
        <p className="text-sm text-primary">
          Parents never see these answers. They only power the matching algorithm.
        </p>
      </Card>

      <SingleSelectGroup
        label="Care style you practice"
        options={CARE_STYLE_OPTIONS}
        value={data.careStyle}
        onSelect={(v) => onChange({ careStyle: v })}
      />

      <SingleSelectGroup
        label="Communication vibe"
        options={COMMUNICATION_VIBE_OPTIONS}
        value={data.communicationVibe}
        onSelect={(v) => onChange({ communicationVibe: v })}
      />

      <SingleSelectGroup
        label="How you'd describe your focus"
        options={FOCUS_OPTIONS}
        value={data.focusDescription}
        onSelect={(v) => onChange({ focusDescription: v })}
      />

      <SingleSelectGroup
        label="Transfer approach"
        options={TRANSFER_OPTIONS}
        value={data.transferApproach}
        onSelect={(v) => onChange({ transferApproach: v })}
      />

      <SingleSelectGroup
        label="Preferred contact method from parents"
        options={CONTACT_OPTIONS}
        value={data.preferredContact}
        onSelect={(v) => onChange({ preferredContact: v })}
      />

      <SingleSelectGroup
        label="Education style with clients"
        options={EDUCATION_STYLE_OPTIONS}
        value={data.educationStyle}
        onSelect={(v) => onChange({ educationStyle: v })}
      />

      <div>
        <label className="block text-sm font-medium text-heading">
          Scope comfort — select all that apply
        </label>
        <ChipSelect
          options={SCOPE_COMFORT_OPTIONS}
          selected={data.scopeComfort}
          onToggle={toggleScope}
          className="mt-2"
        />
      </div>

      <SingleSelectGroup
        label="Partner/support person involvement"
        options={PARTNER_OPTIONS}
        value={data.partnerInvolvement}
        onSelect={(v) => onChange({ partnerInvolvement: v })}
      />
    </div>
  );
}
