"use client";

import { Input, ChipSelect, FileUpload } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import { CREDENTIAL_OPTIONS } from "@/lib/types/onboarding";

interface Step1Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

export function Step1Name({ data, onChange }: Step1Props) {
  function toggleCredential(cred: string) {
    const next = data.credentialType.includes(cred)
      ? data.credentialType.filter((c) => c !== cred)
      : [...data.credentialType, cred];
    onChange({ credentialType: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <FileUpload
        label="Profile photo"
        hint="Drag & drop or click to browse. You can add this later."
        onFileSelect={() => onChange({ photo: "uploaded" })}
      />

      <Input
        label="Full name"
        placeholder="Your full name"
        value={data.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium text-heading">
          Credential type
        </label>
        <ChipSelect
          options={CREDENTIAL_OPTIONS}
          selected={data.credentialType}
          onToggle={toggleCredential}
          className="mt-2"
        />
      </div>

      <Input
        label="Additional certifications"
        placeholder="e.g., IBCLC, NRP certified"
        hint="Optional"
        value={data.additionalCertifications}
        onChange={(e) => onChange({ additionalCertifications: e.target.value })}
      />
    </div>
  );
}
