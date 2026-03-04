"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

interface ResponseComposerProps {
  onSend: (content: string) => void;
  onDecline: () => void;
}

const TEMPLATES = [
  "Hi! Thanks so much for reaching out. I'd love to chat about your birth plan. I have a few openings this week — would any of these work?",
  "Thank you for your interest! I'd love to learn more about what you're looking for. Let's schedule a time to talk.",
  "Hi there! I'd be happy to chat. I have availability this week for a free consult call.",
];

export function ResponseComposer({ onSend, onDecline }: ResponseComposerProps) {
  const [message, setMessage] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  function handleSend() {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-heading">Your response</h3>
      </div>

      <textarea
        className="w-full rounded-[8px] border border-card-border px-3 py-2.5 text-sm text-heading placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        rows={3}
        placeholder="Hi! Thanks for reaching out..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {showTemplates && (
        <div className="rounded-[8px] border border-card-border bg-gray-50 p-3">
          <p className="mb-2 text-xs font-medium text-heading">Templates</p>
          <div className="flex flex-col gap-2">
            {TEMPLATES.map((template, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setMessage(template);
                  setShowTemplates(false);
                }}
                className="rounded-[6px] border border-card-border bg-white p-2 text-left text-xs text-muted transition-colors hover:border-primary hover:text-heading"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleSend} disabled={!message.trim()}>
            Send response
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            {showTemplates ? "Hide templates" : "Use template"}
          </Button>
        </div>
        <button
          type="button"
          onClick={onDecline}
          className="text-sm font-medium text-red-500 hover:underline"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
