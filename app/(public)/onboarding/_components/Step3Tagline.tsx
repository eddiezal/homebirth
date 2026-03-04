"use client";

import { Input } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";

interface Step3Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

const exampleTaglines = [
  "Empowering families to birth with confidence and joy.",
  "Evidence-based care with a gentle, personal touch.",
  "Walking alongside you on your journey to motherhood.",
  "Creating calm, safe spaces for transformative births.",
];

export function Step3Tagline({ data, onChange }: Step3Props) {
  return (
    <div className="flex flex-col gap-5">
      {data.tagline && (
        <div className="rounded-[8px] bg-primary-light px-4 py-3">
          <p className="text-sm italic text-primary">
            &ldquo;{data.tagline}&rdquo;
          </p>
        </div>
      )}

      <Input
        label="Your tagline"
        placeholder="In one sentence, describe what makes your practice unique"
        value={data.tagline}
        onChange={(e) => onChange({ tagline: e.target.value })}
        hint="This appears on your profile card in search results"
      />

      <div>
        <p className="text-sm font-medium text-heading">What works well</p>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-muted">
          <li>
            <span className="text-red-400">✗</span> &quot;Certified nurse-midwife with 10 years experience&quot; →{" "}
            <span className="text-primary">✓</span> &quot;Empowering families to birth with confidence&quot;
          </li>
          <li>
            <span className="text-red-400">✗</span> &quot;Providing quality care&quot; →{" "}
            <span className="text-primary">✓</span> &quot;Evidence-based care with a gentle, personal touch&quot;
          </li>
          <li className="text-xs text-muted">Specific &gt; vague · Philosophy &gt; credentials · Human &gt; clinical</li>
        </ul>
      </div>

      <div>
        <p className="text-sm font-medium text-heading">Need inspiration?</p>
        <div className="mt-2 flex flex-col gap-2">
          {exampleTaglines.map((tagline) => (
            <button
              key={tagline}
              type="button"
              onClick={() => onChange({ tagline })}
              className="rounded-[8px] border border-card-border px-3 py-2 text-left text-sm text-muted transition-colors hover:border-primary hover:text-heading"
            >
              &ldquo;{tagline}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
