import { Container, SectionLabel, SectionHeading } from "@/components/ui";
import { FadeUp } from "./FadeUp";

const guideCards = [
  {
    title: "The beginner's guide",
    description:
      "Everything you need to know about homebirth in one friendly, honest guide.",
    href: "/resources",
    icon: (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden="true">
        <rect x="10" y="8" width="36" height="42" rx="4" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <line x1="18" y1="20" x2="38" y2="20" stroke="#d4b8e0" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="28" x2="34" y2="28" stroke="#e8d5f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="36" x2="28" y2="36" stroke="#e8d5f0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="42" r="10" fill="#8b5fa0" />
        <path d="M39 42l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Questions to ask",
    description:
      "A library of the questions that actually matter when interviewing a midwife.",
    href: "/questions",
    icon: (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden="true">
        <circle cx="28" cy="24" r="16" fill="#fce8d5" stroke="#f0cfc0" strokeWidth="2" />
        <path d="M20 44c0-5 3.5-9 8-9s8 4 8 9" fill="#d4b8e0" stroke="#c9a8d8" strokeWidth="2" />
        <circle cx="23" cy="22" r="2" fill="#8b5fa0" />
        <circle cx="33" cy="22" r="2" fill="#8b5fa0" />
        <path d="M25 29c1.5 2 4 2 6 0" stroke="#8b5fa0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Understanding costs",
    description:
      "What homebirth typically costs, what insurance covers, and how to budget.",
    href: "/resources",
    icon: (
      <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden="true">
        <circle cx="28" cy="28" r="20" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <text x="28" y="34" textAnchor="middle" fontFamily="Nunito" fontWeight="800" fontSize="18" fill="#8b5fa0">$</text>
        <path d="M20 20l16 16M36 20l-16 16" stroke="#e8d5f0" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
];

export function StartHereHub() {
  return (
    <FadeUp className="bg-primary-bg py-20" id="resources">
      <Container className="max-w-[1100px]">
        <div className="mb-[50px] text-center">
          <SectionLabel>Not sure where to begin?</SectionLabel>
          <SectionHeading className="mt-[14px]">
            Honest answers to the questions you&apos;re already asking
          </SectionHeading>
          <p className="mx-auto mt-[10px] max-w-[520px] text-base leading-relaxed text-muted">
            First-timer or planning your third — these resources meet you
            wherever you are right now.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {guideCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group rounded-[22px] bg-white p-8 text-center shadow-[0_2px_14px_rgba(139,95,160,0.06)] transition-all hover:-translate-y-[3px] hover:shadow-[0_6px_24px_rgba(139,95,160,0.1)]"
            >
              <div className="mb-4 flex justify-center">{card.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-heading">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </FadeUp>
  );
}
