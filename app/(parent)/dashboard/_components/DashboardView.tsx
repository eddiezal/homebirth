"use client";

import { Container } from "@/components/ui";
import { getDashboardGreeting, getParentStage } from "@/lib/utils/notifications";
import type { ConsultCard } from "@/lib/types/parent";
import { GreetingStatus } from "./GreetingStatus";
import { ConsultCards } from "./ConsultCards";
import { ParentSidebar } from "./ParentSidebar";

// Static sidebar content — not from DB
const sidebarData = {
  dueDate: "",
  weeksRemaining: 0,
  preferenceTags: [] as string[],
  savedQuestions: [
    { category: "Safety", question: "What is your transfer plan if complications arise?" },
    { category: "Budget", question: "What does your fee include, and are there additional costs?" },
    { category: "Communication", question: "How do you prefer to communicate between visits?" },
    { category: "Care", question: "How do you approach pain management during labor?" },
  ],
  contextualResource: {
    responded: {
      title: "Preparing for your consult?",
      description: "Read our guide to making the most of your first conversation.",
      link: "/exploring",
    },
    sent: {
      title: "While you wait",
      description: "Questions to ask your midwife — build your checklist now.",
      link: "/exploring",
    },
    scheduled: {
      title: "Your consult is coming up",
      description: "Here's how to prepare and what to expect.",
      link: "/exploring",
    },
  },
};

interface DashboardViewProps {
  parentName: string;
  initialConsults: ConsultCard[];
}

export function DashboardView({ parentName, initialConsults }: DashboardViewProps) {
  const firstName = parentName.split(" ")[0];

  // Sort: action-needed first (responded), then scheduled, viewed, sent
  const sortedConsults = [...initialConsults].sort((a, b) => {
    const order = { responded: 0, scheduled: 1, viewed: 2, sent: 3, completed: 4 };
    return order[a.status] - order[b.status];
  });

  const greeting = getDashboardGreeting(firstName, initialConsults);
  const stage = getParentStage(initialConsults);

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="min-w-0 flex-1">
            <GreetingStatus name={firstName} status={greeting} />

            <div className="mt-6">
              <ConsultCards consults={sortedConsults} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full shrink-0 lg:w-[280px]">
            <ParentSidebar
              dashboard={sidebarData}
              stage={stage}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
