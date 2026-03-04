import { Badge } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";

interface LivePreviewProps {
  data: OnboardingData;
}

export function LivePreview({ data }: LivePreviewProps) {
  const initials = data.fullName
    ? data.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  const hasContent =
    data.fullName ||
    data.credentialType.length > 0 ||
    data.practiceLocation ||
    data.tagline ||
    data.specialties.length > 0 ||
    data.feeMin;

  return (
    <div className="overflow-hidden rounded-[12px] border border-card-border bg-white">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${
            data.photo
              ? "bg-primary text-white"
              : data.fullName
                ? "bg-primary-light text-primary"
                : "bg-gray-100 text-muted"
          }`}>
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-heading">
              {data.fullName || "Your name"}
            </h3>
            {data.credentialType.length > 0 && (
              <p className="text-sm text-muted">
                {data.credentialType.join(", ")}
                {data.additionalCertifications && ` · ${data.additionalCertifications}`}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        {(data.practiceLocation || data.serviceRadius) && (
          <p className="mt-3 text-xs text-muted">
            {data.practiceLocation || "Location"}
            {data.serviceRadius && ` · ${data.serviceRadius} mi radius`}
          </p>
        )}

        {/* Birth settings */}
        {data.birthSettings.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.birthSettings.map((bs) => (
              <Badge key={bs} variant="gray">{bs}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Tagline */}
      {data.tagline && (
        <div className="border-t border-card-border px-5 py-3">
          <p className="text-sm italic text-muted">
            &ldquo;{data.tagline}&rdquo;
          </p>
        </div>
      )}

      {/* Philosophy */}
      {data.philosophy && (
        <div className="border-t border-card-border px-5 py-3">
          <p className="text-xs text-muted line-clamp-3">{data.philosophy}</p>
        </div>
      )}

      {/* Specialties & Values */}
      {(data.specialties.length > 0 || data.values.length > 0) && (
        <div className="border-t border-card-border px-5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {data.specialties.map((s) => (
              <Badge key={s} variant="teal">{s}</Badge>
            ))}
            {data.values.map((v) => (
              <Badge key={v} variant="teal">{v}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      {(data.feeMin || data.feeMax) && (
        <div className="border-t border-card-border px-5 py-3">
          <p className="text-sm font-semibold text-heading">
            ${data.feeMin || "?"} – ${data.feeMax || "?"}
          </p>
          {data.paymentOptions.length > 0 && (
            <p className="mt-0.5 text-xs text-muted">
              {data.paymentOptions.join(" · ")}
            </p>
          )}
        </div>
      )}

      {/* Verification & matching status */}
      <div className="border-t border-card-border bg-gray-50 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {data.identityVerified && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Identity
            </span>
          )}
          {data.licenseVerified && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              License
            </span>
          )}
          {data.practiceVerified && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Practice
            </span>
          )}
          {data.careStyle && (
            <span className="text-xs text-muted">
              Matching active
            </span>
          )}
        </div>
        {!hasContent && (
          <p className="text-xs text-muted">
            Your profile will build as you complete each step.
          </p>
        )}
      </div>
    </div>
  );
}
