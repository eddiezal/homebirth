import type { ActivityEventType } from "@/lib/types/dashboard";

interface TimelineEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  detail: string;
  timestamp: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const dotColors: Record<ActivityEventType, string> = {
  request: "bg-primary",
  response: "bg-amber-400",
  scheduled: "bg-blue-500",
  booked: "bg-green-500",
  system: "bg-gray-400",
};

export function Timeline({ events, className = "" }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Connecting line */}
          {index < events.length - 1 && (
            <div className="absolute left-[7px] top-5 h-full w-px bg-card-border" />
          )}

          {/* Dot */}
          <div
            className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full ${dotColors[event.type]}`}
          />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-heading">{event.title}</p>
              <span className="shrink-0 text-xs text-muted">{event.timestamp}</span>
            </div>
            <p className={`mt-0.5 text-xs ${
              event.type === "booked" ? "text-green-600" :
              event.type === "scheduled" ? "text-blue-600" :
              event.type === "response" ? "text-amber-600" :
              event.type === "request" ? "text-primary" :
              "text-muted"
            }`}>
              {event.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
