"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { sendMessage, confirmTimeSlot } from "@/lib/queries/messages";
import type { MessageThread } from "@/lib/types/message";
import { ThreadList } from "./ThreadList";
import { ConversationThread } from "./ConversationThread";
import { ThreadHeader } from "./ThreadHeader";
import { MessageInput } from "./MessageInput";
import { QuickSuggestions } from "./QuickSuggestions";

interface MessagesViewProps {
  initialThreads: MessageThread[];
}

export function MessagesView({ initialThreads }: MessagesViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const consultParam = searchParams.get("consult");

  const [threads, setThreads] = useState<MessageThread[]>(initialThreads);
  const [selectedId, setSelectedId] = useState<string | null>(
    consultParam || initialThreads[0]?.consultId || null
  );
  const [mobileShowThread, setMobileShowThread] = useState(!!consultParam);

  const selectedThread = threads.find((t) => t.consultId === selectedId) ?? null;

  function handleSelectThread(consultId: string) {
    setSelectedId(consultId);
    setMobileShowThread(true);
    // Mark as read locally
    setThreads((prev) =>
      prev.map((t) =>
        t.consultId === consultId ? { ...t, unread: false } : t
      )
    );
  }

  async function handleSendMessage(content: string) {
    if (!selectedId) return;

    // Optimistic update
    setThreads((prev) =>
      prev.map((t) => {
        if (t.consultId !== selectedId) return t;
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender: "parent" as const,
              content,
              timestamp: new Date().toISOString(),
              type: "text" as const,
            },
          ],
        };
      })
    );

    // Persist to DB
    await sendMessage(selectedId, "parent", content);

    startTransition(() => {
      router.refresh();
    });
  }

  async function handleConfirmSlot(day: string, time: string) {
    if (!selectedId) return;

    // Optimistic update
    setThreads((prev) =>
      prev.map((t) => {
        if (t.consultId !== selectedId) return t;
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: `msg-parent-${Date.now()}`,
              sender: "parent" as const,
              content: `${day} at ${time} works great for me!`,
              timestamp: new Date().toISOString(),
              type: "text" as const,
            },
            {
              id: `msg-sched-${Date.now()}`,
              sender: "system" as const,
              content: `Consult scheduled — ${day} at ${time}`,
              timestamp: new Date().toISOString(),
              type: "scheduled" as const,
              scheduledDate: day,
              scheduledTime: time,
            },
          ],
        };
      })
    );

    // Persist to DB
    await sendMessage(selectedId, "parent", `${day} at ${time} works great for me!`);
    await confirmTimeSlot(selectedId, day, time);

    startTransition(() => {
      router.refresh();
    });
  }

  // Sort threads by last message timestamp (most recent first)
  const sortedThreads = [...threads].sort((a, b) => {
    const aLast = a.messages[a.messages.length - 1]?.timestamp || "";
    const bLast = b.messages[b.messages.length - 1]?.timestamp || "";
    return bLast.localeCompare(aLast);
  });

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
          {/* Thread list — hidden on mobile when viewing a thread */}
          <div className={`w-full shrink-0 lg:w-[300px] lg:border-r lg:border-card-border lg:pr-6 ${
            mobileShowThread ? "hidden lg:block" : ""
          }`}>
            <h1 className="mb-4 text-lg font-semibold text-heading">Messages</h1>
            <ThreadList
              threads={sortedThreads}
              selectedId={selectedId}
              onSelect={handleSelectThread}
            />
          </div>

          {/* Conversation — on mobile, shows with back button */}
          <div className={`min-w-0 flex-1 lg:pl-6 ${
            !mobileShowThread ? "hidden lg:block" : ""
          }`}>
            {selectedThread ? (
              <div className="flex flex-col rounded-[12px] border border-card-border bg-white">
                {/* Mobile back button */}
                <div className="border-b border-card-border p-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileShowThread(false)}
                    className="text-sm font-medium text-muted hover:text-heading"
                  >
                    ← Back to messages
                  </button>
                </div>

                <ThreadHeader thread={selectedThread} />

                <div className="max-h-[500px] overflow-y-auto p-4">
                  <ConversationThread
                    thread={selectedThread}
                    onConfirmSlot={handleConfirmSlot}
                  />
                </div>

                <div className="border-t border-card-border p-4">
                  <QuickSuggestions onSelect={handleSendMessage} />
                  <div className="mt-2">
                    <MessageInput onSend={handleSendMessage} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-[12px] border border-card-border bg-white">
                <p className="text-sm text-muted">
                  {threads.length === 0
                    ? "No messages yet — request a consult to start a conversation."
                    : "Select a conversation"}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
