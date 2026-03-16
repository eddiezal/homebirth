import { Button } from "@/components/ui";

interface EmptyProviderInboxProps {
  providerName?: string;
}

export function EmptyProviderInbox({ providerName }: EmptyProviderInboxProps) {
  const firstName = providerName?.split(" ")[0] || "there";

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[12px] border border-card-border bg-white p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-heading">
        Your profile is live, {firstName}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Leads are on the way. Parents in your area are searching and completing
        intake right now. You&apos;ll be notified when someone matches with you.
      </p>

      {/* Profile optimization */}
      <div className="mt-6 w-full max-w-xs text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Boost your profile
        </p>
        <ul className="mt-3 space-y-2">
          {[
            { label: "Add a profile photo", impact: "2x more clicks" },
            { label: "Get verified", impact: "3x more consults" },
            { label: "Add transparent pricing", impact: "40% more views" },
          ].map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-heading">{item.label}</span>
              <span className="text-xs text-primary">{item.impact}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button variant="outlined" size="sm" href="/provider-profile">
          Edit your profile
        </Button>
      </div>
    </div>
  );
}
