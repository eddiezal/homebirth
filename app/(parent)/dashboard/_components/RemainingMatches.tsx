import { Button, Badge } from "@/components/ui";

interface MatchPreview {
  id: string;
  name: string;
  credentials: string;
  initials: string;
  matchScore: number;
  distance: number;
  location: string;
  tags: string[];
}

interface RemainingMatchesProps {
  matches: MatchPreview[];
}

export function RemainingMatches({ matches }: RemainingMatchesProps) {
  return (
    <div>
      <p className="text-sm text-muted">
        {matches.length} more match{matches.length !== 1 ? "es" : ""} you
        haven&apos;t contacted yet
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex-1 rounded-[12px] border border-card-border bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                {match.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-heading">
                    {match.name}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {match.matchScore}%
                  </span>
                </div>
                <p className="text-xs text-muted">
                  {match.credentials} · {match.location} · {match.distance} mi
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {match.tags.map((tag) => (
                <Badge key={tag} variant="teal">{tag}</Badge>
              ))}
            </div>
            <div className="mt-3">
              <Button variant="outlined" size="sm" href={`/provider/${match.id}`}>
                View profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
