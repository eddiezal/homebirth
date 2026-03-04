import { Button } from "@/components/ui";
import type { MessageThread } from "@/lib/types/message";

interface ThreadHeaderProps {
  thread: MessageThread;
}

export function ThreadHeader({ thread }: ThreadHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-card-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
          {thread.providerInitials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-heading">
              {thread.providerName}
            </h2>
            <span className="text-xs text-muted">{thread.providerCredentials}</span>
          </div>
          <p className="text-xs text-muted">
            {thread.matchScore}% match · {thread.location}
          </p>
          <p className="text-xs text-muted">{thread.responseTime}</p>
        </div>
      </div>
      <Button variant="outlined" size="sm" href={`/provider/${thread.providerId}`}>
        View profile
      </Button>
    </div>
  );
}
