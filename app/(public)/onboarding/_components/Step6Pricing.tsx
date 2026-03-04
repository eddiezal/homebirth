"use client";

import { Input, ChipSelect } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import {
  WHATS_INCLUDED_OPTIONS,
  PAYMENT_OPTIONS,
  DUE_MONTH_OPTIONS,
} from "@/lib/types/onboarding";

interface Step6Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

export function Step6Pricing({ data, onChange }: Step6Props) {
  function toggleIncluded(item: string) {
    const next = data.whatsIncluded.includes(item)
      ? data.whatsIncluded.filter((x) => x !== item)
      : [...data.whatsIncluded, item];
    onChange({ whatsIncluded: next });
  }

  function togglePayment(item: string) {
    const next = data.paymentOptions.includes(item)
      ? data.paymentOptions.filter((x) => x !== item)
      : [...data.paymentOptions, item];
    onChange({ paymentOptions: next });
  }

  function toggleMonth(month: string) {
    const next = data.acceptingDueMonths.includes(month)
      ? data.acceptingDueMonths.filter((x) => x !== month)
      : [...data.acceptingDueMonths, month];
    onChange({ acceptingDueMonths: next });
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-heading">
          Fee range
        </label>
        <p className="mt-0.5 text-xs text-muted">
          Parents see a range, not exact numbers
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-muted">$</span>
          <Input
            label=""
            placeholder="3,000"
            value={data.feeMin}
            onChange={(e) => onChange({ feeMin: e.target.value })}
            className="flex-1"
          />
          <span className="text-sm text-muted">to $</span>
          <Input
            label=""
            placeholder="6,000"
            value={data.feeMax}
            onChange={(e) => onChange({ feeMax: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-heading">
          What&apos;s included
        </label>
        <ChipSelect
          options={WHATS_INCLUDED_OPTIONS}
          selected={data.whatsIncluded}
          onToggle={toggleIncluded}
          className="mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-heading">
          Payment options
        </label>
        <ChipSelect
          options={PAYMENT_OPTIONS}
          selected={data.paymentOptions}
          onToggle={togglePayment}
          className="mt-2"
        />
      </div>

      <Input
        label="Insurance plans accepted"
        placeholder="e.g., Blue Cross, Aetna, Tricare"
        hint="If applicable"
        value={data.insurancePlans}
        onChange={(e) => onChange({ insurancePlans: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium text-heading">
          Accepting clients due in
        </label>
        <ChipSelect
          options={DUE_MONTH_OPTIONS}
          selected={data.acceptingDueMonths}
          onToggle={toggleMonth}
          className="mt-2"
        />
      </div>
    </div>
  );
}
