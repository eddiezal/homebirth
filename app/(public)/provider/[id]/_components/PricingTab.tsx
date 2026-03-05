import { Badge } from "@/components/ui";
import type { ProviderProfile } from "@/lib/types/provider";

interface PricingTabProps {
  provider: ProviderProfile;
}

export function PricingTab({ provider }: PricingTabProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Fee range */}
      <div>
        <h3 className="text-sm font-semibold text-heading">Fee range</h3>
        <p className="mt-2 text-2xl font-bold text-heading">
          {provider.priceRange}
        </p>
        {provider.slidingScale && (
          <div className="mt-2">
            <Badge variant="teal">Sliding scale available</Badge>
          </div>
        )}
      </div>

      {/* What's included */}
      {provider.whatsIncluded.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-heading">
            What&apos;s included
          </h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {provider.whatsIncluded.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 shrink-0 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-heading">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Insurance accepted */}
      {provider.insuranceAccepted.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-heading">
            Insurance accepted
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {provider.insuranceAccepted.map((ins) => (
              <span
                key={ins}
                className="rounded-full border border-card-border px-3 py-1 text-xs font-medium text-heading"
              >
                {ins}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Payment notes */}
      {provider.paymentNotes && (
        <div>
          <h3 className="text-sm font-semibold text-heading">Payment info</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {provider.paymentNotes}
          </p>
        </div>
      )}
    </div>
  );
}