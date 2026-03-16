import type { Provider } from "@/lib/types/provider";
import { Badge, Button } from "@/components/ui";

interface DirectoryCardProps {
  provider: Provider;
}

export function DirectoryCard({ provider }: DirectoryCardProps) {
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div className="flex items-center gap-4 rounded-[12px] border border-card-border bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-muted">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-medium text-heading">
            {provider.name}
          </h4>
          {provider.credentials && (
            <span className="shrink-0 text-xs text-muted">{provider.credentials}</span>
          )}
        </div>
        {provider.location && (
          <p className="mt-0.5 text-sm text-muted">{provider.location}</p>
        )}
      </div>
      <Badge variant="amber" className="shrink-0 text-xs">Unclaimed</Badge>
      <Button variant="outlined" size="sm" href={`/provider/${provider.id}`}>
        View
      </Button>
    </div>
  );
}
