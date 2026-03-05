"use client";

import { useState } from "react";
import { Container, SectionLabel, SectionHeading, Card, Badge, ArrowLink } from "@/components/ui";

const categories = ["All", "Safety", "Trust", "Experience", "Budget", "Communication", "Values", "Care", "Logistics"];

const questions = [
  // Safety
  { category: "Safety", question: "What's your plan if something unexpected happens during labor?", variant: "teal" as const },
  { category: "Safety", question: "How close do you need me to be to a hospital?", variant: "teal" as const },
  { category: "Safety", question: "What are your criteria for recommending a hospital transfer?", variant: "teal" as const },
  { category: "Safety", question: "What emergency equipment do you bring to a birth?", variant: "teal" as const },
  { category: "Safety", question: "How do you handle a postpartum hemorrhage?", variant: "teal" as const },

  // Trust
  { category: "Trust", question: "How many home births have you attended as primary midwife?", variant: "teal" as const },
  { category: "Trust", question: "Can I speak with families you've cared for?", variant: "teal" as const },
  { category: "Trust", question: "Have you ever had a birth outcome you'd handle differently in hindsight?", variant: "teal" as const },
  { category: "Trust", question: "What's your relationship with local hospital providers?", variant: "teal" as const },

  // Experience
  { category: "Experience", question: "What's your background and training pathway?", variant: "gray" as const },
  { category: "Experience", question: "Are you CPM, CNM, or LM certified — and what does that mean for my care?", variant: "gray" as const },
  { category: "Experience", question: "How long have you been practicing independently?", variant: "gray" as const },
  { category: "Experience", question: "Have you attended a birth with complications similar to my risk factors?", variant: "gray" as const },

  // Budget
  { category: "Budget", question: "What's included in your fee, and what costs extra?", variant: "gray" as const },
  { category: "Budget", question: "Do you accept insurance or work with HSA/FSA?", variant: "gray" as const },
  { category: "Budget", question: "What's your payment schedule, and is there a deposit?", variant: "gray" as const },
  { category: "Budget", question: "What happens to my payment if I need to transfer to a hospital?", variant: "gray" as const },

  // Communication
  { category: "Communication", question: "How do you prefer to communicate between appointments?", variant: "teal" as const },
  { category: "Communication", question: "Who covers for you if you're unavailable when I go into labor?", variant: "teal" as const },
  { category: "Communication", question: "How quickly do you typically respond to non-urgent messages?", variant: "teal" as const },
  { category: "Communication", question: "Will I always see you, or will I sometimes see another midwife?", variant: "teal" as const },

  // Values
  { category: "Values", question: "How do you approach shared decision-making during birth?", variant: "teal" as const },
  { category: "Values", question: "What's your philosophy on intervention during an uncomplicated labor?", variant: "teal" as const },
  { category: "Values", question: "How do you support a birth plan that differs from your usual approach?", variant: "teal" as const },

  // Care
  { category: "Care", question: "What does your postpartum care look like in the first week?", variant: "gray" as const },
  { category: "Care", question: "How many prenatal visits are included, and how long are they?", variant: "gray" as const },
  { category: "Care", question: "Do you offer lactation support or refer to a specialist?", variant: "gray" as const },
  { category: "Care", question: "What newborn care do you provide at birth and in the days after?", variant: "gray" as const },

  // Logistics
  { category: "Logistics", question: "What do I need to have ready at home before my due date?", variant: "gray" as const },
  { category: "Logistics", question: "When in labor do I call you, and when do you come to me?", variant: "gray" as const },
  { category: "Logistics", question: "How long do you stay after the baby is born?", variant: "gray" as const },
];

export function QuestionsContent() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? questions : questions.filter((q) => q.category === active);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-white py-16">
        <Container className="flex flex-col items-center text-center">
          <SectionLabel>Question Library</SectionLabel>
          <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.015em] text-heading sm:text-[2.5rem]">
            Don&apos;t know what to ask? We&apos;ve got you.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            These are the questions that actually matter when you&apos;re evaluating a provider.
            Save the ones that resonate and bring them to your consult.
          </p>
        </Container>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-0 z-10 border-b border-card-border bg-white">
        <Container>
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Questions grid */}
      <section className="py-12">
        <Container>
          <p className="mb-6 text-sm text-muted">
            {filtered.length} question{filtered.length !== 1 ? "s" : ""}
            {active !== "All" ? ` in ${active}` : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((q) => (
              <Card key={q.question} padding="p-5">
                <Badge variant={q.variant}>{q.category}</Badge>
                <p className="mt-3 font-medium text-heading">{q.question}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border bg-gray-50 py-16">
        <Container className="flex flex-col items-center text-center">
          <SectionHeading>Ready to meet your provider?</SectionHeading>
          <p className="mt-4 max-w-lg text-muted">
            Find midwives and birth centers near you and bring these questions to your first consult.
          </p>
          <div className="mt-8">
            <ArrowLink href="/intake">Find providers near me</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}