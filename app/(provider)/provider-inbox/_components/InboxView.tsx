"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import type { Lead } from "@/lib/types/lead";
import { sendProviderResponse, declineConsult, sendMessage } from "@/lib/queries/messages";
import { EmptyProviderInbox } from "@/components/empty-states/EmptyProviderInbox";
import { LeadList } from "./LeadList";
import { LeadDetail } from "./LeadDetail";

const FILTER_OPTIONS = ["all", "new", "contacted", "scheduled", "booked"];

interface InboxViewProps {
  initialLeads: Lead[];
}

export function InboxView({ initialLeads }: InboxViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("all");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(
    initialLeads[0]?.id ?? null
  );
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const filteredLeads =
    filter === "all"
      ? leads.filter((l) => l.status !== "not-a-fit")
      : leads.filter((l) => l.status === filter);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;

  function handleStatusChange(leadId: string, status: Lead["status"]) {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  }

  async function handleSendMessage(leadId: string, content: string) {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        return {
          ...l,
          status: l.status === "new" ? "contacted" : l.status,
          messages: [
            ...l.messages,
            {
              id: `msg-${Date.now()}`,
              type: "provider" as const,
              content,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      })
    );

    // Persist to DB
    if (leads.find((l) => l.id === leadId)?.status === "new") {
      await sendProviderResponse(leadId, content);
    } else {
      await sendMessage(leadId, "provider", content);
    }

    // Revalidate in background
    startTransition(() => {
      router.refresh();
    });
  }

  async function handleDecline(leadId: string, reason: string, note: string) {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status: "not-a-fit" as const, declineReason: reason, declineNote: note }
          : l
      )
    );

    // Select next lead
    const remaining = leads.filter(
      (l) => l.id !== leadId && l.status !== "not-a-fit"
    );
    setSelectedLeadId(remaining[0]?.id ?? null);

    // Persist to DB
    await declineConsult(leadId, reason, note);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
          {/* Left panel — lead list */}
          <div className="w-full shrink-0 lg:w-[320px] lg:border-r lg:border-card-border lg:pr-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-heading">Leads</h1>
              {leads.filter((l) => l.status === "new").length > 0 && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                  {leads.filter((l) => l.status === "new").length} new
                </span>
              )}
            </div>

            {/* Filter pills */}
            <div className="mb-4 flex gap-2 overflow-x-auto">
              {FILTER_OPTIONS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    filter === f
                      ? "border-primary bg-primary text-white"
                      : "border-card-border text-muted hover:border-primary"
                  }`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>

            <LeadList
              leads={filteredLeads}
              selectedId={selectedLeadId}
              onSelect={setSelectedLeadId}
            />
          </div>

          {/* Right panel — lead detail */}
          <div className="min-w-0 flex-1 lg:pl-6">
            {selectedLead ? (
              <LeadDetail
                lead={selectedLead}
                onSendMessage={handleSendMessage}
                onStatusChange={handleStatusChange}
                onDecline={handleDecline}
              />
            ) : leads.length === 0 ? (
              <EmptyProviderInbox />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-[12px] border border-card-border bg-white">
                <p className="text-sm text-muted">Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
