import { Container, SectionLabel, SectionHeading, Card } from "@/components/ui";

const verifications = [
  {
    title: "Identity verified",
    description:
      "Every provider confirms their identity with a government-issued ID before their profile goes live.",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
      </svg>
    ),
  },
  {
    title: "License checked",
    description:
      "We verify professional credentials against state licensing databases so you don't have to.",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Match transparency",
    description:
      "Every match comes with an explanation — you'll see exactly why a provider was recommended for you.",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export function VerificationExplainer() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <SectionLabel>Trust & verification</SectionLabel>
          <SectionHeading className="mt-3">
            Every provider is vetted. Every match is explained.
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {verifications.map((v) => (
            <Card key={v.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                {v.icon}
              </div>
              <h3 className="mt-4 font-semibold text-heading">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}