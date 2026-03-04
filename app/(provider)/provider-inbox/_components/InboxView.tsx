"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { mockLeads } from "@/lib/data/mock-leads";
import type { Lead } from "@/lib/types/lead";
import { LeadList } from "./LeadList";
import { LeadDetail } from "./LeadDetail";

const FILTER_OPTIONS = ["all", "new", "contacted", "scheduled", "booked"];

export function InboxView() {
  const [filter, setFilter] = useState("all");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(
    mockLeads[0]?.id ?? null
  );
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const filteredLeads =
    filter === "all"
      ? leads.filter((l) => l.status !== "not-a-fit")
      : leads.filter((l) => l.status === filter);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;

  function handleStatusChange(leadId: string, status: Lead["status"]) {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  }

  function handleSendMessage(leadId: string, content: string) {
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
  }

  function handleDecline(leadId: string, reason: string, note: string) {
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
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-[12px] border border-card-border bg-white">
                <p className="text-sm text-muted">
                  Select a lead to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
