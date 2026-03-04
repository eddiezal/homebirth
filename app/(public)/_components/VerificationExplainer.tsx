import { Container, SectionLabel, SectionHeading, Card } from "@/components/ui";

const verifications = [
  {
    title: "Identity verified",
    description:
      "Every provider confirms their identity with a government-issued ID before their profile goes live.",
  },
  {
    title: "License checked",
    description:
      "We verify professional credentials against state licensing databases so you don't have to.",
  },
  {
    title: "Match transparency",
    description:
      "Every match comes with an explanation — you'll see exactly why a provider was recommended for you.",
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
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
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
