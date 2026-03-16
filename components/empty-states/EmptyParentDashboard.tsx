import { Badge, Button } from "@/components/ui";

interface EmptyParentDashboardProps {
  parentName: string;
  topMatch?: {
    id: string;
    name: string;
    credentials: string;
    matchScore: number;
    distance: number;
    tags: string[];
  } | null;
}

export function EmptyParentDashboard({
  parentName,
  topMatch,
}: EmptyParentDashboardProps) {
  const firstName = parentName.split(" ")[0];

  return (
    <div>
      <h1 className="text-xl font-semibold text-heading">
        Welcome back, {firstName}
      </h1>
      <p className="mt-1 text-sm text-muted">
        You completed intake but haven&apos;t requested a consult yet. Your
        matches are still waiting.
      </p>

      {topMatch && (
        <div className="mt-6 rounded-[12px] border-2 border-primary/20 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Your top match
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
              {topMatch.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-heading">{topMatch.name}</p>
                <span className="text-sm text-muted">
                  {topMatch.credentials}
                </span>
              </div>
              <p className="text-xs text-muted">
                {topMatch.distance} mi away &middot; {topMatch.matchScore}% match
              </p>
            </div>
          </div>
          {topMatch.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {topMatch.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="teal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-4">
            <Button size="sm" href={`/provider/${topMatch.id}`}>
              View profile
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <Button variant="outlined" size="sm" href="/results">
          See all matches
        </Button>
        <Button variant="ghost" size="sm" href="/intake">
          Retake intake
        </Button>
      </div>
    </div>
  );
}
