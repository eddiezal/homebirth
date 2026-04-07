import { Container, SectionLabel, SectionHeading } from "@/components/ui";
import { FadeUp } from "./FadeUp";

const verifications = [
  {
    title: "Identity verified",
    description:
      "Every provider confirms their identity with government-issued ID before going live.",
    icon: (
      <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden="true">
        <rect x="6" y="10" width="32" height="26" rx="4" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <circle cx="22" cy="22" r="6" fill="#d4b8e0" />
        <path d="M22 18v8M18 22h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 10V6a8 8 0 0116 0v4" stroke="#d4b8e0" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "License checked",
    description:
      "We verify professional credentials against state licensing databases so you don't have to.",
    icon: (
      <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden="true">
        <path d="M22 4l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="#fce8d5" stroke="#f0cfc0" strokeWidth="2" />
        <circle cx="22" cy="20" r="5" fill="#d4b8e0" />
        <path d="M20 19l2 2 3-3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Match explained",
    description:
      "Every match comes with an explanation — you'll see exactly why a provider was recommended for you.",
    icon: (
      <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden="true">
        <circle cx="22" cy="22" r="16" fill="#f5e6f9" stroke="#d4b8e0" strokeWidth="2" />
        <circle cx="22" cy="18" r="4" fill="#d4b8e0" />
        <path d="M16 22s2.5 4 6 4 6-4 6-4" stroke="#d4b8e0" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="22" y1="28" x2="22" y2="34" stroke="#d4b8e0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function VerificationExplainer() {
  return (
    <FadeUp className="py-[70px]">
      <Container narrow>
        <div className="mb-[50px] text-center">
          <SectionLabel>Safety & trust</SectionLabel>
          <SectionHeading className="mt-[14px]">
            Every provider is vetted with care
          </SectionHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {verifications.map((v) => (
            <div
              key={v.title}
              className="rounded-[20px] border-2 border-card-border bg-white p-8 text-center"
            >
              <div className="mb-[14px] flex justify-center">{v.icon}</div>
              <h3 className="mb-2 text-[17px] font-bold text-heading">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </FadeUp>
  );
}
