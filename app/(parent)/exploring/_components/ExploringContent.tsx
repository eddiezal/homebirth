"use client";

import { useState } from "react";
import { Container, Card, Badge, ArrowLink } from "@/components/ui";

const checklistSections = [
  {
    title: "Before your consult",
    badge: "Do this first",
    badgeVariant: "teal" as const,
    items: [
      { id: "c1", text: "Write down your top 3 priorities for your birth experience" },
      { id: "c2", text: "Note any medical history your provider should know about" },
      { id: "c3", text: "List questions you want to ask — use the question library if you need ideas" },
      { id: "c4", text: "Talk to your partner or support person about what they're hoping for" },
      { id: "c5", text: "Check your insurance coverage for out-of-hospital birth" },
    ],
  },
  {
    title: "Questions to bring",
    badge: "Preparation",
    badgeVariant: "gray" as const,
    items: [
      { id: "q1", text: "What's your transfer rate, and what typically triggers a transfer?" },
      { id: "q2", text: "What emergency equipment do you bring to every birth?" },
      { id: "q3", text: "How many prenatal visits are included, and how long are they?" },
      { id: "q4", text: "Who covers for you if you're unavailable when I go into labor?" },
      { id: "q5", text: "What does postpartum care look like in the first week?" },
    ],
  },
  {
    title: "Things to think about",
    badge: "Reflect",
    badgeVariant: "gray" as const,
    items: [
      { id: "t1", text: "How far am I from the nearest hospital?" },
      { id: "t2", text: "Who will be at my birth as support — partner, family, doula?" },
      { id: "t3", text: "How do I feel about this provider after our first interaction?" },
      { id: "t4", text: "Does their communication style work for me?" },
      { id: "t5", text: "Do I feel like I can ask them anything without judgment?" },
    ],
  },
];

export function ExploringContent() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = checklistSections.reduce((n, s) => n + s.items.length, 0);
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  return (
    <section className="py-16">
      <Container className="max-w-2xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">Your consult is booked</p>
          <h1 className="mt-2 text-[2rem] font-semibold tracking-[-0.015em] text-heading">
            Get ready for your call
          </h1>
          <p className="mt-3 text-muted">
            A little preparation goes a long way. Work through this checklist before your consult so you get the most out of it.
          </p>
        </div>

        {/* Progress */}
        <Card padding="p-5" className="mb-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-heading">{done} of {total} complete</span>
            <span className="text-sm font-medium text-primary">{pct}%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {checklistSections.map((section) => (
            <div key={section.title}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-semibold text-heading">{section.title}</h2>
                <Badge variant={section.badgeVariant}>{section.badge}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                {section.items.map((item) => {
                  const isDone = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex items-start gap-3 rounded-[12px] border p-4 text-left transition-colors ${
                        isDone
                          ? "border-primary/20 bg-primary-light"
                          : "border-card-border bg-white hover:border-primary/30"
                      }`}
                    >
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isDone ? "border-primary bg-primary" : "border-gray-300"
                      }`}>
                        {isDone && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm leading-relaxed ${isDone ? "text-muted line-through" : "text-heading"}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-12 flex flex-col gap-3 border-t border-card-border pt-8 sm:flex-row">
          <ArrowLink href="/questions">Full question library</ArrowLink>
          <ArrowLink href="/messages">Back to messages</ArrowLink>
        </div>

      </Container>
    </section>
  );
}