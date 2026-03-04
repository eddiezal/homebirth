import type { Lead, LeadStatus } from "@/lib/types/lead";
import { Badge } from "@/components/ui";

interface LeadListProps {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusBadgeVariant: Record<LeadStatus, "teal" | "amber" | "blue" | "green" | "gray"> = {
  new: "teal",
  contacted: "amber",
  scheduled: "blue",
  booked: "green",
  "not-a-fit": "gray",
};

export function LeadList({ leads, selectedId, onSelect }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        No leads in this category
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {leads.map((lead) => {
        const isActive = lead.id === selectedId;
        const isNew = lead.status === "new";

        return (
          <button
            key={lead.id}
            type="button"
            onClick={() => onSelect(lead.id)}
            className={`flex w-full items-start gap-3 rounded-[8px] p-3 text-left transition-colors ${
              isActive
                ? "border-l-2 border-l-primary bg-primary-light"
                : "hover:bg-gray-50"
            } ${isNew && !isActive ? "border-l-2 border-l-green-400" : ""}`}
          >
            {/* Unread dot */}
            <div className="relative mt-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                {lead.parentInitials}
              </div>
              {isNew && (
                <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-heading">
                  {lead.parentName}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {lead.matchScore}%
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <Badge variant={statusBadgeVariant[lead.status]}>
                  {lead.status === "not-a-fit" ? "Not a fit" : lead.status}
                </Badge>
                <span className="text-xs text-muted">{lead.dueDate}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted">
                {formatTimestamp(lead.requestedAt)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
}
