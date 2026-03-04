"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui";
import { mockConsults } from "@/lib/data/mock-consults";
import { mockParentDashboard } from "@/lib/data/mock-parent-dashboard";
import { getParentSession, loadParentConsults, saveParentConsults } from "@/lib/utils/parent-storage";
import { getDashboardGreeting, getParentStage } from "@/lib/utils/notifications";
import type { ConsultCard } from "@/lib/types/parent";
import { GreetingStatus } from "./GreetingStatus";
import { ConsultCards } from "./ConsultCards";
import { RemainingMatches } from "./RemainingMatches";
import { ParentSidebar } from "./ParentSidebar";

export function DashboardView() {
  const [consults, setConsults] = useState<ConsultCard[]>([]);
  const [parentName, setParentName] = useState("there");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load from sessionStorage or fall back to mock data
    const stored = loadParentConsults();
    const data = stored || mockConsults;
    if (!stored) saveParentConsults(mockConsults);
    setConsults(data);

    const session = getParentSession();
    if (session) setParentName(session.name.split(" ")[0]);

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  // Sort: action-needed first (responded), then scheduled, viewed, sent
  const sortedConsults = [...consults].sort((a, b) => {
    const order = { responded: 0, scheduled: 1, viewed: 2, sent: 3, completed: 4 };
    return order[a.status] - order[b.status];
  });

  const greeting = getDashboardGreeting(parentName, consults);
  const stage = getParentStage(consults);

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="min-w-0 flex-1">
            <GreetingStatus name={parentName} status={greeting} />

            <div className="mt-6">
              <ConsultCards consults={sortedConsults} />
            </div>

            {mockParentDashboard.remainingMatches.length > 0 && (
              <div className="mt-8">
                <RemainingMatches matches={mockParentDashboard.remainingMatches} />
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-full shrink-0 lg:w-[280px]">
            <ParentSidebar
              dashboard={mockParentDashboard}
              stage={stage}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
