"use client";

import { useState, useMemo } from "react";
import {
  Container,
  SectionLabel,
  Button,
} from "@/components/ui";
import { useChecklist } from "@/lib/hooks/use-checklist";
import {
  questions,
  categories,
  getQuestionsByCategory,
  getCategoryMeta,
  type QuestionCategory,
} from "@/lib/data/questions";

/* ─── Category icon SVGs (inline, tiny) ──────────────────── */

function SafetyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M10 1l7 3v5c0 4.4-3 8.2-7 9.5C6 17.2 3 13.4 3 9V4l7-3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M7.5 10l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <rect x="3" y="6" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CareStyleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M10 17s-7-4.5-7-8.5C3 5.5 5 3.5 7 3.5c1.2 0 2.3.7 3 1.7.7-1 1.8-1.7 3-1.7 2 0 4 2 4 5 0 4-7 8.5-7 8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CommsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <rect x="2" y="4" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 15l-1 3 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9h6M7 11.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CostIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.5v9M12.5 7.5c-.5-1-1.5-1.2-2.5-1.2S7.5 7 7.5 8.2c0 1.3 1.2 1.6 2.5 2 1.3.3 2.5.7 2.5 2 0 1.2-1 2-2.5 2s-2-.3-2.5-1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PostpartumIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const categoryIcons: Record<QuestionCategory, React.ReactNode> = {
  safety: <SafetyIcon />,
  experience: <ExperienceIcon />,
  "care-style": <CareStyleIcon />,
  communication: <CommsIcon />,
  cost: <CostIcon />,
  postpartum: <PostpartumIcon />,
};

/* ─── Checkmark SVG ──────────────────────────────────────── */

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
        checked
          ? "border-primary bg-primary text-white"
          : "border-[#d4c4de] bg-white"
      }`}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7l3 3 5-5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

/* ─── Question Card ──────────────────────────────────────── */

function QuestionCard({
  id,
  question,
  whyItMatters,
  mustAsk,
  isChecked,
  onToggle,
}: {
  id: string;
  question: string;
  whyItMatters: string;
  mustAsk: boolean;
  isChecked: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      className={`group w-full rounded-[18px] border-2 p-5 text-left transition-all ${
        isChecked
          ? "border-primary bg-[#faf5fd]"
          : "border-card-border bg-white hover:border-primary-light"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          role="checkbox"
          aria-checked={isChecked}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }
          }}
          className="mt-0.5"
        >
          <CheckIcon checked={isChecked} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold leading-snug text-heading">
              {question}
            </p>
            {mustAsk && (
              <span className="shrink-0 rounded-full bg-[#fce8d5] px-2.5 py-0.5 text-[11px] font-bold text-[#b87a4a]">
                Must ask
              </span>
            )}
          </div>

          {/* Expand/collapse */}
          <div
            className={`grid transition-all duration-300 ${
              expanded ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-[14px] leading-relaxed text-muted">
                {whyItMatters}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className={`rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${
                    isChecked
                      ? "bg-primary text-white"
                      : "bg-primary-lighter text-primary hover:bg-[#eddcf5]"
                  }`}
                >
                  {isChecked ? "Added to checklist" : "Add to my checklist"}
                </button>
              </div>
            </div>
          </div>

          {/* "Why this matters" hint when collapsed */}
          {!expanded && (
            <p className="mt-1.5 text-[13px] text-faint">
              Tap to see why this matters
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Sidebar Checklist Item ─────────────────────────────── */

function ChecklistItem({
  question,
  category,
  onRemove,
}: {
  question: string;
  category: QuestionCategory;
  onRemove: () => void;
}) {
  const meta = getCategoryMeta(category);
  return (
    <div className="group flex items-start gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-gray-50">
      <span className="mt-0.5 text-primary">{categoryIcons[category]}</span>
      <p className="flex-1 text-[13px] leading-snug text-heading">{question}</p>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Remove "${question}" from checklist`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Copy Checklist Helper ──────────────────────────────── */

function buildChecklistText(checkedIds: Set<string>): string {
  const lines: string[] = ["My Consult Checklist — Homebirth.com\n"];
  for (const cat of categories) {
    const catQs = getQuestionsByCategory(cat.id).filter((q) =>
      checkedIds.has(q.id)
    );
    if (catQs.length === 0) continue;
    lines.push(`\n${cat.label}`);
    for (const q of catQs) {
      lines.push(`  [ ] ${q.question}`);
    }
  }
  lines.push("\n\nBuilt at homebirth.com/questions");
  return lines.join("\n");
}

/* ─── Main Component ─────────────────────────────────────── */

export function QuestionsContent() {
  const { checkedIds, toggleQuestion, isChecked, checkedCount } =
    useChecklist();
  const [copied, setCopied] = useState(false);

  const checkedQuestions = useMemo(
    () => questions.filter((q) => checkedIds.has(q.id)),
    [checkedIds]
  );

  const handleCopy = async () => {
    const text = buildChecklistText(checkedIds);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select-all in a textarea
    }
  };

  const handleEmail = () => {
    const text = buildChecklistText(checkedIds);
    const subject = encodeURIComponent("My Consult Checklist — Homebirth.com");
    const body = encodeURIComponent(text);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-white py-16">
        <Container className="flex flex-col items-center text-center">
          <SectionLabel>Question Library</SectionLabel>
          <h1 className="mt-3 font-serif text-[2rem] font-semibold tracking-[-0.015em] text-heading sm:text-[2.5rem]">
            Build your consult checklist
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            30 questions organized by category. Check the ones that matter to
            you and bring them to your first consult — or save them for later.
          </p>
        </Container>
      </section>

      {/* Two-column body */}
      <section className="py-10">
        <Container>
          <div className="flex gap-10 max-lg:flex-col">
            {/* ── Left: Questions by category ─────────── */}
            <div className="flex-1 space-y-10">
              {categories.map((cat) => {
                const catQuestions = getQuestionsByCategory(cat.id);
                return (
                  <div key={cat.id}>
                    {/* Category header */}
                    <div className="mb-4 flex items-center gap-3 text-primary">
                      {categoryIcons[cat.id]}
                      <h2 className="font-serif text-[22px] font-semibold text-heading">
                        {cat.label}
                      </h2>
                      <span className="text-[13px] text-faint">
                        {catQuestions.length} questions
                      </span>
                    </div>
                    <p className="mb-5 max-w-lg text-[14px] leading-relaxed text-muted">
                      {cat.description}
                    </p>

                    {/* Question cards */}
                    <div className="space-y-3">
                      {catQuestions.map((q) => (
                        <QuestionCard
                          key={q.id}
                          id={q.id}
                          question={q.question}
                          whyItMatters={q.whyItMatters}
                          mustAsk={q.mustAsk}
                          isChecked={isChecked(q.id)}
                          onToggle={() => toggleQuestion(q.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: Sticky checklist sidebar ─────── */}
            <div className="w-full shrink-0 lg:w-[300px]">
              <div className="sticky top-6">
                <div className="rounded-[22px] border-2 border-card-border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-heading">
                      Your checklist
                    </h3>
                    <span className="rounded-full bg-primary-lighter px-3 py-0.5 text-[13px] font-bold text-primary">
                      {checkedCount}/{questions.length}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${(checkedCount / questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Checked items list */}
                  {checkedCount > 0 ? (
                    <div className="mt-4 max-h-[400px] space-y-1 overflow-y-auto">
                      {checkedQuestions.map((q) => (
                        <ChecklistItem
                          key={q.id}
                          question={q.question}
                          category={q.category}
                          onRemove={() => toggleQuestion(q.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-center text-[13px] text-faint">
                      Check questions to build your list
                    </p>
                  )}

                  {/* Action buttons */}
                  {checkedCount > 0 && (
                    <div className="mt-5 space-y-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-card-border px-4 py-2.5 text-[14px] font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="9"
                            height="9"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        {copied ? "Copied!" : "Copy checklist"}
                      </button>

                      <button
                        type="button"
                        onClick={handleEmail}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-card-border px-4 py-2.5 text-[14px] font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            x="1.5"
                            y="3"
                            width="13"
                            height="10"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M1.5 5l6.5 4 6.5-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Email to myself
                      </button>
                    </div>
                  )}
                </div>

                {/* Matching CTA */}
                <div className="mt-5 rounded-[22px] bg-primary-bg p-6 text-center">
                  <p className="font-serif text-[17px] font-semibold text-heading">
                    Ready to use these?
                  </p>
                  <p className="mt-2 text-[13px] text-muted">
                    Find providers who match your preferences and bring your
                    checklist to the consult.
                  </p>
                  <Button
                    href="/intake"
                    size="sm"
                    className="mt-4"
                    fullWidth
                  >
                    Find my midwife
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
