"use client";

import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import type { MessageThread, Message } from "@/lib/types/message";

interface ConversationThreadProps {
  thread: MessageThread;
  onConfirmSlot: (day: string, time: string) => void;
}

export function ConversationThread({ thread, onConfirmSlot }: ConversationThreadProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {thread.messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          providerInitials={thread.providerInitials}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          onConfirmSlot={onConfirmSlot}
        />
      ))}
    </div>
  );
}

function MessageBubble({
  message,
  providerInitials,
  selectedSlot,
  onSelectSlot,
  onConfirmSlot,
}: {
  message: Message;
  providerInitials: string;
  selectedSlot: string | null;
  onSelectSlot: (id: string | null) => void;
  onConfirmSlot: (day: string, time: string) => void;
}) {
  // System events
  if (message.type === "system_event") {
    return (
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-card-border" />
        <p className="shrink-0 text-xs text-muted">
          {message.content} · {formatTime(message.timestamp)}
        </p>
        <div className="h-px flex-1 bg-card-border" />
      </div>
    );
  }

  // Intake snippet
  if (message.type === "intake_snippet") {
    return (
      <div className="rounded-[8px] bg-gray-50 px-4 py-3">
        <p className="text-xs font-medium text-muted">{message.content}</p>
        {message.preferenceTags && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.preferenceTags.map((tag) => (
              <Badge key={tag} variant="gray">{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Scheduled card
  if (message.type === "scheduled") {
    return (
      <div className="rounded-[12px] border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <p className="text-sm font-semibold text-blue-800">{message.content}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button variant="outlined" size="sm" onClick={() => {}}>
            Add to calendar
          </Button>
          <Button variant="ghost" size="sm" href="/exploring">
            View your checklist
          </Button>
        </div>
      </div>
    );
  }

  // Provider message
  if (message.sender === "provider") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%]">
          <div className="flex items-end gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-semibold text-primary">
              {providerInitials}
            </div>
            <div className="rounded-[12px] rounded-bl-sm bg-gray-100 px-4 py-3">
              <p className="text-sm text-heading">{message.content}</p>

              {/* Availability widget */}
              {message.availabilitySlots && message.availabilitySlots.length > 0 && (
                <div className="mt-3 rounded-[8px] border border-card-border bg-white p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <p className="text-xs font-medium text-primary">
                      Available times for a free consult call
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {message.availabilitySlots.map((slot) => {
                      const isSelected = selectedSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => onSelectSlot(isSelected ? null : slot.id)}
                          className={`flex items-center justify-between rounded-[6px] border px-3 py-2 text-left text-xs transition-colors ${
                            isSelected
                              ? "border-primary bg-primary-light text-primary"
                              : "border-card-border text-heading hover:border-primary"
                          }`}
                        >
                          <span className="font-medium">{slot.day}</span>
                          <span className={isSelected ? "text-primary" : "text-muted"}>
                            {slot.time} · {slot.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedSlot && (
                    <div className="mt-2">
                      <Button
                        size="sm"
                        fullWidth
                        onClick={() => {
                          const slot = message.availabilitySlots!.find((s) => s.id === selectedSlot);
                          if (slot) onConfirmSlot(slot.day, slot.time);
                          onSelectSlot(null);
                        }}
                      >
                        Confirm this time
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="mt-1 ml-9 text-xs text-muted">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  // Parent message
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div className="rounded-[12px] rounded-br-sm bg-primary-light px-4 py-3">
          <p className="text-sm text-heading">{message.content}</p>
        </div>
        <p className="mt-1 text-right text-xs text-muted">
          {formatTime(message.timestamp)}
        </p>
      </div>
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
