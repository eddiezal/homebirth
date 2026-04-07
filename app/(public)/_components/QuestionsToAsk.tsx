"use client";

import { useState } from "react";
import { Container, SectionLabel, SectionHeading, ArrowLink } from "@/components/ui";
import { FadeUp } from "./FadeUp";
import { featuredQuestions, getCategoryMeta } from "@/lib/data/questions";
import { useChecklist } from "@/lib/hooks/use-checklist";

export function QuestionsToAsk() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { toggleQuestion, isChecked, checkedCount } = useChecklist();

  function toggleOpen(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <FadeUp className="bg-gradient-to-b from-bg via-primary-bg to-primary-bg py-20">
      <Container narrow>
        <div className="mb-12 text-center">
          <SectionLabel>Questions to ask</SectionLabel>
          <SectionHeading className="mt-[14px]">
            Not sure what to ask? Here&apos;s a start.
          </SectionHeading>
          <p className="mx-auto mt-[10px] max-w-[480px] text-base leading-relaxed text-muted">
            The questions that matter most — before you choose a provider.
          </p>
        </div>

        {/* Conversation bubbles */}
        <div className="mx-auto flex max-w-[540px] flex-col gap-[14px]">
          {featuredQuestions.map((q, i) => {
            const meta = getCategoryMeta(q.category);
            const colors = meta?.color ?? {
              bg: "bg-primary-lighter",
              text: "text-primary",
            };
            const isLeft = q.featuredAlign === "left";
            const isOpen = openId === q.id;
            const checked = isChecked(q.id);

            return (
              <div
                key={q.id}
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={q.featuredMaxW ?? "max-w-[340px]"}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleOpen(q.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(q.id); } }}
                    className={`w-full cursor-pointer text-left ${
                      isLeft
                        ? "rounded-[22px_22px_22px_6px]"
                        : "rounded-[22px_22px_6px_22px]"
                    } border-2 ${
                      isOpen
                        ? "border-primary-light bg-white shadow-[0_4px_16px_rgba(139,95,160,0.1)]"
                        : "border-[#e8d9ee] bg-white shadow-[0_2px_8px_rgba(139,95,160,0.04)]"
                    } px-5 py-[14px] transition-all duration-200 hover:-translate-y-[2px] hover:border-primary-light hover:shadow-[0_4px_16px_rgba(139,95,160,0.1)]`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-[2px] shrink-0 rounded-xl ${colors.bg} px-[10px] py-[3px] text-[11px] font-bold ${colors.text}`}
                      >
                        {meta?.shortLabel ?? q.category}
                      </span>
                      <span className="text-[15px] leading-snug text-heading">
                        {q.question}
                      </span>
                    </div>

                    {/* Expanded content */}
                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[13px] leading-relaxed text-muted">
                          {q.whyItMatters}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleQuestion(q.id);
                          }}
                          className={`mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-[6px] text-[13px] font-semibold transition-colors ${
                            checked
                              ? "bg-primary text-white"
                              : "bg-primary-lighter text-primary hover:bg-primary-light"
                          }`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            {checked ? (
                              <path
                                d="M3 7l3 3 5-5.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            ) : (
                              <path
                                d="M7 3v8M3 7h8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            )}
                          </svg>
                          {checked ? "Added" : "Add to checklist"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <ArrowLink href="/questions">See all 30 questions</ArrowLink>
          {checkedCount > 0 && (
            <span className="text-[13px] text-muted">
              {checkedCount} saved to your checklist
            </span>
          )}
        </div>
      </Container>
    </FadeUp>
  );
}
