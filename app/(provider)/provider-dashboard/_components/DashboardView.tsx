"use client";

import { Container, Card, Badge, Button, Timeline } from "@/components/ui";
import { StarRating } from "@/components/ui";
import { mockDashboardData } from "@/lib/data/mock-dashboard";
import { mockLeads } from "@/lib/data/mock-leads";
import { GreetingCard } from "./GreetingCard";
import { MetricsSidebar } from "./MetricsSidebar";

export function DashboardView() {
  const d = mockDashboardData;
  const newLeads = mockLeads.filter((l) => l.status === "new");

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column — main content */}
          <div className="min-w-0 flex-1">
            <GreetingCard greeting={d.greeting} />

            {/* New lead action cards */}
            {newLeads.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  Respond to new leads
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {newLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between rounded-[12px] border-l-4 border-l-primary border border-card-border bg-white p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                          {lead.parentInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-heading">
                              {lead.parentName}
                            </span>
                            <span className="text-sm font-semibold text-primary">
                              {lead.matchScore}%
                            </span>
                          </div>
                          <p className="text-xs text-muted">
                            {lead.dueDate} · {lead.preferenceTags.birthSetting} · {lead.preferenceTags.careStyle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted">
                          {formatTimestamp(lead.requestedAt)}
                        </span>
                        <Button size="sm" href="/provider-inbox">
                          Respond
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity timeline */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-heading">Recent activity</h2>
              <Timeline events={d.activity} className="mt-4" />
            </div>

            {/* Contextual insight */}
            <Card variant="teal" padding="p-4" className="mt-8">
              <p className="text-sm text-primary">{d.insight}</p>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="w-full shrink-0 lg:w-[320px]">
            <MetricsSidebar data={d} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
}
