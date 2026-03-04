import type { Provider } from "@/lib/types/provider";
import { Badge, Button } from "@/components/ui";

interface ProviderCardProps {
  provider: Provider;
  onRequestConsult?: (providerId: string) => void;
}

export function ProviderCard({ provider, onRequestConsult }: ProviderCardProps) {
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] border border-card-border bg-white md:flex-row">
      {/* Left side — Provider info */}
      <div className="flex-1 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-heading">
                {provider.name}
              </h3>
              <span className="text-sm text-muted">{provider.credentials}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {provider.location} · {provider.distance} mi ·{" "}
              {provider.yearsExperience} yrs · {provider.birthsAttended} births
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm italic text-muted">
          &ldquo;{provider.philosophy}&rdquo;
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-semibold text-heading">
            {provider.priceRange}
          </span>
          <span className="text-xs text-muted">· {provider.responseTime}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {provider.tags.map((tag) => (
            <Badge key={tag} variant="teal">
              {tag}
            </Badge>
          ))}
          {!provider.acceptingClients && (
            <Badge variant="amber">Not accepting clients</Badge>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button size="sm" onClick={() => onRequestConsult?.(provider.id)}>Request consult</Button>
          <Button variant="outlined" size="sm" href={`/provider/${provider.id}`}>
            View profile
          </Button>
        </div>
      </div>

      {/* Right side — Why this match */}
      <div className="w-full border-t border-card-border bg-primary-light p-6 md:w-[38%] md:border-l md:border-t-0">
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
    </div>
  );
}
