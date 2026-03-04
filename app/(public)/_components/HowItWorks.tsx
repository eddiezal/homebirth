import { Container, SectionLabel, SectionHeading } from "@/components/ui";

const steps = [
  {
    number: "01",
    title: "Share your preferences",
    description:
      "Answer a few questions about your birth plan, care style, budget, and what matters most to you. Takes about 2 minutes.",
  },
  {
    number: "02",
    title: "See your matches",
    description:
      "We compare your preferences against vetted providers in your area and show you ranked matches with clear explanations.",
  },
  {
    number: "03",
    title: "Request a consult",
    description:
      "Pick one or more providers and request a free consult. They receive your profile and match reasons before responding.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <Container>
        <div className="text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading className="mt-3">
            Three steps to your match
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative overflow-hidden rounded-[12px] border border-card-border bg-white p-6"
            >
              <span className="absolute -right-2 -top-4 text-[6rem] font-bold leading-none text-gray-100/80">
                {step.number}
              </span>
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                {step.number}
              </span>
              <h3 className="relative mt-4 text-lg font-semibold text-heading">
                {step.title}
              </h3>
              <p className="relative mt-2 text-sm text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
