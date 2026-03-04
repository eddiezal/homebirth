"use client";

import { useState } from "react";
import { Badge, Button, Modal } from "@/components/ui";
import type { Lead, LeadStatus } from "@/lib/types/lead";
import { DECLINE_REASONS } from "@/lib/types/lead";
import { IntakeSummary } from "./IntakeSummary";
import { MessageThread } from "./MessageThread";
import { ResponseComposer } from "./ResponseComposer";

interface LeadDetailProps {
  lead: Lead;
  onSendMessage: (leadId: string, content: string) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onDecline: (leadId: string, reason: string, note: string) => void;
}

const statusBadgeVariant: Record<LeadStatus, "teal" | "amber" | "blue" | "green" | "gray"> = {
  new: "teal",
  contacted: "amber",
  scheduled: "blue",
  booked: "green",
  "not-a-fit": "gray",
};

export function LeadDetail({
  lead,
  onSendMessage,
  onStatusChange,
  onDecline,
}: LeadDetailProps) {
  const [showDecline, setShowDecline] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineNote, setDeclineNote] = useState("");
  const [showIntake, setShowIntake] = useState(false);

  function handleDeclineSubmit() {
    onDecline(lead.id, declineReason, declineNote);
    setShowDecline(false);
    setDeclineReason("");
    setDeclineNote("");
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white">
      {/* Header bar */}
      <div className="border-b border-card-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
              {lead.parentInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-heading">
                  {lead.parentName}
                </h2>
                <Badge variant={statusBadgeVariant[lead.status]}>
                  {lead.status === "not-a-fit" ? "Not a fit" : lead.status}
                </Badge>
              </div>
              <p className="text-xs text-muted">
                {lead.dueDate} · {lead.location} · {lead.distance} mi · {lead.matchScore}% match
              </p>
            </div>
          </div>
          <Button variant="outlined" size="sm" onClick={() => setShowIntake(true)}>
            View full intake
          </Button>
        </div>
      </div>

      {/* Intake summary */}
      <div className="border-b border-card-border bg-gray-50 p-4">
        <div className="flex flex-wrap gap-1.5">
          {lead.preferenceTags.birthSetting && (
            <Badge variant="gray">{lead.preferenceTags.birthSetting}</Badge>
          )}
          {lead.preferenceTags.dueDate && (
            <Badge variant="gray">{lead.preferenceTags.dueDate}</Badge>
          )}
          {lead.preferenceTags.vbac && <Badge variant="gray">VBAC</Badge>}
          {lead.preferenceTags.payment && (
            <Badge variant="gray">{lead.preferenceTags.payment}</Badge>
          )}
          {lead.preferenceTags.careStyle && (
            <Badge variant="gray">{lead.preferenceTags.careStyle}</Badge>
          )}
          {lead.preferenceTags.language && lead.preferenceTags.language !== "English" && (
            <Badge variant="gray">{lead.preferenceTags.language}</Badge>
          )}
        </div>

        {/* Match reasons */}
        <div className="mt-3">
          <p className="text-xs font-medium text-primary">Why she matched with you</p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {lead.matchReasons.map((reason) => (
              <li key={reason} className="flex items-center gap-1.5 text-xs text-heading">
                <svg className="h-3.5 w-3.5 shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Conversation thread */}
      <div className="max-h-[400px] overflow-y-auto p-4">
        <MessageThread messages={lead.messages} />
      </div>

      {/* Response composer or message input */}
      <div className="border-t border-card-border p-4">
        {lead.status === "new" ? (
          <ResponseComposer
            onSend={(content) => onSendMessage(lead.id, content)}
            onDecline={() => setShowDecline(true)}
          />
        ) : lead.status === "contacted" || lead.status === "scheduled" ? (
          <MessageInput onSend={(content) => onSendMessage(lead.id, content)} />
        ) : null}
      </div>

      {/* Full intake modal */}
      <Modal open={showIntake} onClose={() => setShowIntake(false)} maxWidth="max-w-2xl">
        <h2 className="text-lg font-semibold text-heading">Full intake answers</h2>
        <p className="mt-1 text-sm text-muted">{lead.parentName}</p>
        <div className="mt-4">
          <IntakeSummary answers={lead.intakeAnswers} />
        </div>
        <div className="mt-6">
          <Button variant="outlined" onClick={() => setShowIntake(false)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* Decline modal */}
      <Modal open={showDecline} onClose={() => setShowDecline(false)}>
        <h2 className="text-lg font-semibold text-heading">Decline this lead?</h2>
        <p className="mt-1 text-sm text-muted">
          {lead.parentName} won&apos;t be notified. The request will simply stop progressing.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {DECLINE_REASONS.map((reason) => (
            <label
              key={reason.id}
              className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-3 transition-colors ${
                declineReason === reason.id
                  ? "border-primary bg-primary-light"
                  : "border-card-border hover:border-primary"
              }`}
            >
              <input
                type="radio"
                name="decline-reason"
                value={reason.id}
                checked={declineReason === reason.id}
                onChange={() => setDeclineReason(reason.id)}
                className="h-4 w-4 text-primary"
              />
              <span className="text-sm text-heading">{reason.label}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-heading">
            Add a note (only visible to you)
          </label>
          <textarea
            className="mt-1.5 w-full rounded-[8px] border border-card-border px-3 py-2.5 text-sm text-heading placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            rows={2}
            placeholder="Optional — for your own records"
            value={declineNote}
            onChange={(e) => setDeclineNote(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button variant="outlined" onClick={() => setShowDecline(false)}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={handleDeclineSubmit}
            disabled={!declineReason}
            className="text-sm font-medium text-red-500 hover:underline disabled:text-muted disabled:no-underline"
          >
            Confirm decline
          </button>
        </div>
      </Modal>
    </div>
  );
}

function MessageInput({ onSend }: { onSend: (content: string) => void }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 rounded-[8px] border border-card-border px-3 py-2.5 text-sm text-heading placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button size="sm" onClick={handleSend} disabled={!text.trim()}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </Button>
    </div>
  );
}
