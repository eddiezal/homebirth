import type { LeadMessage } from "@/lib/types/lead";

interface MessageThreadProps {
  messages: LeadMessage[];
}

export function MessageThread({ messages }: MessageThreadProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => {
        if (msg.type === "system") {
          return (
            <div key={msg.id} className="flex items-center gap-3">
              <div className="h-px flex-1 bg-card-border" />
              <p className="shrink-0 text-xs text-muted">
                {msg.content} · {formatTime(msg.timestamp)}
              </p>
              <div className="h-px flex-1 bg-card-border" />
            </div>
          );
        }

        if (msg.type === "provider") {
          return (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[80%]">
                <div className="rounded-[12px] rounded-br-sm bg-primary-light px-4 py-3">
                  <p className="text-sm text-heading">{msg.content}</p>
                  {msg.availabilitySlots && msg.availabilitySlots.length > 0 && (
                    <div className="mt-3 rounded-[8px] border border-primary/20 bg-white p-3">
                      <p className="mb-2 text-xs font-medium text-primary">
                        Available times offered
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.availabilitySlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between text-xs text-heading"
                          >
                            <span>{slot.day}</span>
                            <span className="text-muted">
                              {slot.time} · {slot.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-right text-xs text-muted">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        }

        // Parent message
        return (
          <div key={msg.id} className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="rounded-[12px] rounded-bl-sm bg-gray-100 px-4 py-3">
                <p className="text-sm text-heading">{msg.content}</p>
              </div>
              <p className="mt-1 text-xs text-muted">
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
