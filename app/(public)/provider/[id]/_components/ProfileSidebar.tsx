import { Button } from "@/components/ui";
import type { ProviderProfile } from "@/lib/types/provider";

interface ProfileSidebarProps {
  provider: ProviderProfile;
  onRequestConsult: () => void;
}

export function ProfileSidebar({ provider, onRequestConsult }: ProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Match score + reasons */}
      <div className="rounded-[12px] bg-primary-light p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">
            Why this match
          </span>
          <span className="text-2xl font-bold text-primary">
            {provider.matchScore}%
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {provider.matchReasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-heading">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Button fullWidth onClick={onRequestConsult}>
        Request a consult
      </Button>
      <p className="text-center text-xs text-muted">{provider.responseTime}</p>

      {/* Verification badges */}
      <div className="rounded-[12px] border border-card-border p-5">
        <h3 className="text-sm font-semibold text-heading">Verification</h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {provider.verifications.map((v) => (
            <li key={v.type} className="flex items-start gap-2">
              <svg
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  v.verified ? "text-primary" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p
                  className={`text-sm font-medium ${
                    v.verified ? "text-heading" : "text-muted"
                  }`}
                >
                  {v.type === "identity" && "Identity verified"}
                  {v.type === "license" && "License verified"}
                  {v.type === "practice" && "Practice verified"}
                </p>
                {v.verified && v.detail && (
                  <p className="text-xs text-muted">{v.detail}</p>
                )}
                {!v.verified && (
                  <p className="text-xs text-muted">Not yet verified</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
