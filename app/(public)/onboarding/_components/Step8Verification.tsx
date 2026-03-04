"use client";

import { Button } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";

interface Step8Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

interface VerificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  verified: boolean;
  onToggle: () => void;
}

function VerificationCard({ icon, title, description, verified, onToggle }: VerificationCardProps) {
  return (
    <div className={`rounded-[12px] border p-5 transition-colors ${
      verified ? "border-primary bg-primary-light" : "border-card-border bg-white"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          verified ? "bg-primary text-white" : "bg-gray-100 text-muted"
        }`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-heading">{title}</h3>
            {verified && (
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">{description}</p>
          <div className="mt-3">
            <Button
              variant={verified ? "ghost" : "outlined"}
              size="sm"
              onClick={onToggle}
            >
              {verified ? "Verified" : "Upload / Enter"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step8Verification({ data, onChange }: Step8Props) {
  return (
    <div className="flex flex-col gap-4">
      <VerificationCard
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        }
        title="Identity verification"
        description="Confirmed via government-issued ID"
        verified={data.identityVerified}
        onToggle={() => onChange({ identityVerified: !data.identityVerified })}
      />

      <VerificationCard
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        }
        title="License verification"
        description="Checked against California state records"
        verified={data.licenseVerified}
        onToggle={() => onChange({ licenseVerified: !data.licenseVerified })}
      />

      <VerificationCard
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        }
        title="Practice verification"
        description="Confirmed active practice via NPI or website URL"
        verified={data.practiceVerified}
        onToggle={() => onChange({ practiceVerified: !data.practiceVerified })}
      />

      <div className="mt-2 flex items-center gap-3">
        <input
          type="checkbox"
          id="pull-reviews"
          checked={data.pullReviews}
          onChange={(e) => onChange({ pullReviews: e.target.checked })}
          className="h-4 w-4 rounded border-card-border text-primary focus:ring-primary"
        />
        <label htmlFor="pull-reviews" className="text-sm text-heading">
          Pull my reviews from Google, Yelp, and Facebook
        </label>
      </div>

      <p className="text-xs text-muted">
        Skip this for now? No problem — add verification anytime from your dashboard.
      </p>
    </div>
  );
}
