import { Container, SectionLabel, SectionHeading } from "@/components/ui";
import { FadeUp } from "./FadeUp";

const steps = [
  {
    number: 1,
    title: "Tell us what matters",
    description:
      "Birth plan, values, budget, communication style — a quick quiz about what your ideal care looks like. Takes 2 minutes.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="4" width="32" height="40" rx="4" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <line x1="16" y1="16" x2="32" y2="16" stroke="#d4b8e0" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="24" x2="28" y2="24" stroke="#e8d5f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="32" x2="24" y2="32" stroke="#e8d5f0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Your matches, explained",
    description:
      "Vetted midwives near you, ranked by how well they align with what you said matters. You'll see exactly why each one was chosen.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
        <circle cx="18" cy="20" r="8" fill="#d4b8e0" opacity="0.6" />
        <circle cx="30" cy="20" r="8" fill="#f0cfc0" opacity="0.6" />
        <path d="M24 14c2.2 1.5 3.5 3.7 3.5 6s-1.3 4.5-3.5 6c-2.2-1.5-3.5-3.7-3.5-6s1.3-4.5 3.5-6z" fill="#e8a0b8" opacity="0.6" />
        <circle cx="24" cy="36" r="6" fill="#8b5fa0" />
        <path d="M21.5 36l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Say hello — they already know you",
    description:
      "Pick a provider and request a free consult. They'll already know what matters to you before you even say hello.",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
        <path d="M40 32a2 2 0 01-2 2H14l-6 6V12a2 2 0 012-2h28a2 2 0 012 2z" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <circle cx="18" cy="20" r="2" fill="#d4b8e0" />
        <circle cx="26" cy="20" r="2" fill="#d4b8e0" />
        <circle cx="34" cy="20" r="2" fill="#d4b8e0" />
      </svg>
    ),
  },
];

function MatchIllustration() {
  return (
    <div className="relative mb-[60px] flex items-center justify-center gap-5 overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-lighter to-peach-light p-10 max-sm:flex-col">
      {/* Sparkles */}
      <div className="absolute left-[10%] top-[12%] animate-float">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><polygon fill="#d4b8e0" opacity="0.55" points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" /></svg>
      </div>
      <div className="absolute right-[8%] top-[18%] animate-float" style={{ animationDelay: "1s" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><polygon fill="#f0cfc0" opacity="0.55" points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" /></svg>
      </div>
      <div className="absolute bottom-[15%] left-[15%] animate-float" style={{ animationDelay: "0.5s" }}>
        <svg width="14" height="14" viewBox="0 0 20 18" aria-hidden="true"><path fill="#e8a0b8" opacity="0.4" d="M10 18s-1-1-4-4C3 11 0 8 0 5.5 0 2.5 2.5 0 5 0c1.5 0 3 .8 5 3C12 .8 13.5 0 15 0c2.5 0 5 2.5 5 5.5 0 2.5-3 5.5-6 8.5-3 3-4 4-4 4z" /></svg>
      </div>
      <div className="absolute bottom-[20%] right-[12%] animate-float" style={{ animationDelay: "1.5s" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true"><polygon fill="#b8d4a8" opacity="0.45" points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" /></svg>
      </div>

      {/* You node */}
      <div className="flex flex-col items-center gap-[10px]">
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-primary-light shadow-[0_4px_18px_rgba(139,95,160,0.2)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="h-9 w-9" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span className="text-sm font-bold text-primary-dark">You</span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[7px] max-sm:rotate-90">
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-40" />
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-60" />
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-85" />
      </div>

      {/* Match node */}
      <div className="flex flex-col items-center gap-[10px]">
        <div className="flex h-[90px] w-[90px] animate-pulse-gentle items-center justify-center rounded-full border-[3px] border-dashed border-primary-light bg-white">
          <svg viewBox="0 0 24 24" fill="#e8a0b8" className="h-9 w-9" aria-hidden="true">
            <path d="M12 21s-1-1-4.5-4.5C4 13 1 10 1 7c0-3 2.5-5.5 5.5-5.5 1.5 0 3 .7 5.5 3.5C14.5 2.2 16 1.5 17.5 1.5 20.5 1.5 23 4 23 7c0 3-3 6-7.5 9.5C12 20 12 21 12 21z" />
          </svg>
        </div>
        <span className="text-sm font-bold text-primary-dark">Match</span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[7px] max-sm:rotate-90">
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-40" />
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-60" />
        <div className="h-[7px] w-[7px] rounded-full bg-primary-light opacity-85" />
      </div>

      {/* Midwife node */}
      <div className="flex flex-col items-center gap-[10px]">
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-peach shadow-[0_4px_18px_rgba(240,207,192,0.25)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="h-9 w-9" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>
        <span className="text-sm font-bold text-primary-dark">Your midwife</span>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <FadeUp className="py-[100px]" id="how">
      <Container narrow>
        <div className="mb-[50px] text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading className="mt-[14px]">
            We do the searching. You do the choosing.
          </SectionHeading>
        </div>

        <MatchIllustration />

        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[22px] border-2 border-card-border bg-white p-9 text-center transition-all hover:-translate-y-[2px] hover:border-card-border-hover"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <div className="mx-auto mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary-lighter text-[13px] font-extrabold text-primary">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-bold text-heading">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </FadeUp>
  );
}
