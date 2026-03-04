"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui";
import { mockThreads } from "@/lib/data/mock-threads";
import { loadParentThreads, saveParentThreads, confirmConsultTime } from "@/lib/utils/parent-storage";
import type { MessageThread } from "@/lib/types/message";
import { ThreadList } from "./ThreadList";
import { ConversationThread } from "./ConversationThread";
import { ThreadHeader } from "./ThreadHeader";
import { MessageInput } from "./MessageInput";
import { QuickSuggestions } from "./QuickSuggestions";

export function MessagesView() {
  const searchParams = useSearchParams();
  const consultParam = searchParams.get("consult");

  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = loadParentThreads();
    const data = stored || mockThreads;
    if (!stored) saveParentThreads(mockThreads);
    setThreads(data);

    // Deep link from dashboard
    if (consultParam) {
      setSelectedId(consultParam);
      setMobileShowThread(true);
    } else if (data.length > 0) {
      setSelectedId(data[0].consultId);
    }

    setLoaded(true);
  }, [consultParam]);

  const selectedThread = threads.find((t) => t.consultId === selectedId) ?? null;

  function handleSelectThread(consultId: string) {
    setSelectedId(consultId);
    setMobileShowThread(true);
    // Mark as read
    setThreads((prev) => {
      const updated = prev.map((t) =>
        t.consultId === consultId ? { ...t, unread: false } : t
      );
      saveParentThreads(updated);
      return updated;
    });
  }

  function handleSendMessage(content: string) {
    if (!selectedId) return;
    setThreads((prev) => {
      const updated = prev.map((t) => {
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
      });
      saveParentThreads(updated);
      return updated;
    });
  }

  function handleConfirmSlot(day: string, time: string) {
    if (!selectedId) return;

    confirmConsultTime(selectedId, day, time);

    // Update local thread state
    setThreads((prev) => {
      const updated = prev.map((t) => {
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
      });
      saveParentThreads(updated);
      return updated;
    });
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
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
                <p className="text-sm text-muted">Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
