import { Badge } from "@/components/ui";
import { StarRating } from "@/components/ui/StarRating";
import type { ProviderProfile } from "@/lib/types/provider";

interface ProfileHeaderProps {
  provider: ProviderProfile;
}

export function ProfileHeader({ provider }: ProfileHeaderProps) {
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-light text-2xl font-semibold text-primary">
        {initials}
      </div>

      <div className="min-w-0 flex-1 text-center sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <h1 className="text-[1.75rem] font-semibold tracking-[-0.015em] text-heading">
            {provider.name}
          </h1>
          <span className="text-sm text-muted">{provider.credentials}</span>
        </div>

        <p className="mt-1 text-sm text-muted">
          {provider.location} · {provider.distance} mi ·{" "}
          {provider.yearsExperience} yrs experience · {provider.birthsAttended}{" "}
          births
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {provider.acceptingClients ? (
            <Badge variant="teal">Accepting clients</Badge>
          ) : (
            <Badge variant="amber">Not accepting clients</Badge>
          )}

          {provider.reviewCount > 0 && (
            <div className="flex items-center gap-1.5">
              <StarRating rating={provider.aggregateRating} size="sm" />
              <span className="text-sm font-medium text-heading">
                {provider.aggregateRating}
              </span>
              <span className="text-sm text-muted">
                ({provider.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
