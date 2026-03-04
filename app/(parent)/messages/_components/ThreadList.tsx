import type { MessageThread } from "@/lib/types/message";

interface ThreadListProps {
  threads: MessageThread[];
  selectedId: string | null;
  onSelect: (consultId: string) => void;
}

export function ThreadList({ threads, selectedId, onSelect }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        No messages yet. Request a consult to start a conversation.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {threads.map((thread) => {
        const isActive = thread.consultId === selectedId;
        const lastMsg = thread.messages[thread.messages.length - 1];
        const preview =
          lastMsg?.type === "system_event"
            ? lastMsg.content
            : lastMsg?.sender === "provider"
              ? lastMsg.content
              : lastMsg?.sender === "parent"
                ? `You: ${lastMsg.content}`
                : lastMsg?.content || "No messages yet";

        return (
          <button
            key={thread.consultId}
            type="button"
            onClick={() => onSelect(thread.consultId)}
            className={`flex w-full items-start gap-3 rounded-[8px] p-3 text-left transition-colors ${
              isActive
                ? "border-l-2 border-l-primary bg-primary-light"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="relative mt-0.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                {thread.providerInitials}
              </div>
              {thread.unread && (
                <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${thread.unread ? "text-heading" : "text-heading"}`}>
                  {thread.providerName}
                </span>
                <span className="text-xs text-muted">
                  {formatTime(lastMsg?.timestamp || "")}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted">
                {preview.length > 60 ? preview.slice(0, 60) + "..." : preview}
              </p>
            </div>

            {/* Mobile chevron */}
            <svg
              className="mt-1 h-4 w-4 shrink-0 text-muted lg:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function formatTime(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Now";
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
