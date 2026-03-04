import { Badge, Button } from "@/components/ui";
import type { ConsultCard, ConsultStatus } from "@/lib/types/parent";
import { hasActionNeeded } from "@/lib/utils/notifications";

interface ConsultCardsProps {
  consults: ConsultCard[];
}

const statusBadge: Record<ConsultStatus, { variant: "teal" | "amber" | "gray" | "blue" | "green"; label: string }> = {
  responded: { variant: "teal", label: "Responded" },
  viewed: { variant: "amber", label: "Viewed your request" },
  sent: { variant: "gray", label: "Request sent" },
  scheduled: { variant: "blue", label: "Scheduled" },
  completed: { variant: "green", label: "Completed" },
};

export function ConsultCards({ consults }: ConsultCardsProps) {
  if (consults.length === 0) {
    return (
      <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
        <p className="text-sm text-muted">
          No active consults yet. Find a provider to get started.
        </p>
        <div className="mt-4">
          <Button size="sm" href="/results">See your matches</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {consults.map((consult) => {
        const actionNeeded = hasActionNeeded(consult);
        const badge = statusBadge[consult.status];

        return (
          <div
            key={consult.id}
            className={`rounded-[12px] border bg-white p-5 ${
              actionNeeded
                ? "border-l-4 border-l-green-400 border-card-border"
                : "border-card-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                  {consult.providerInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-heading">
                      {consult.providerName}
                    </h3>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <p className="text-xs text-muted">
                    {consult.providerCredentials} · {consult.matchScore}% match
                  </p>
                </div>
              </div>
            </div>

            {/* Provider's response message */}
            {consult.lastMessage && consult.status === "responded" && (
              <div className="mt-3 rounded-[8px] bg-gray-50 px-3 py-2">
                <p className="text-sm italic text-muted">
                  &ldquo;{consult.lastMessage}&rdquo;
                </p>
              </div>
            )}

            {/* Scheduled details */}
            {consult.status === "scheduled" && consult.scheduledDate && (
              <div className="mt-3 rounded-[8px] bg-blue-50 px-3 py-2">
                <p className="text-sm text-blue-700">
                  Consult: {consult.scheduledDate} at {consult.scheduledTime}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-3">
              {consult.status === "responded" && (
                <>
                  <Button size="sm" href={`/messages?consult=${consult.id}`}>
                    Confirm time
                  </Button>
                  <Button variant="outlined" size="sm" href={`/messages?consult=${consult.id}`}>
                    Message
                  </Button>
                </>
              )}
              {consult.status === "viewed" && (
                <Button variant="outlined" size="sm" href={`/messages?consult=${consult.id}`}>
                  Message
                </Button>
              )}
              {consult.status === "sent" && (
                <p className="text-xs text-muted">
                  Providers typically respond within 24–48 hours
                </p>
              )}
              {consult.status === "scheduled" && (
                <Button variant="outlined" size="sm" href={`/messages?consult=${consult.id}`}>
                  View thread
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
