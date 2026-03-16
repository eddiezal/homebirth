import { Container, SectionLabel, Button } from "@/components/ui";

export function ProviderHero() {
  return (
    <section className="pb-20 pt-16">
      <Container className="flex flex-col items-center text-center">
        <SectionLabel>For midwives &amp; birth workers</SectionLabel>

        <h1 className="mt-4 max-w-3xl text-[2.5rem] font-semibold leading-tight tracking-[-0.025em] text-heading sm:text-[3.8rem]">
          Two sides of the same experience
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          Parents answer intake questions. You answer the mirror version. We
          match based on real compatibility&nbsp;&mdash; not keywords, not ads,
          not proximity alone.
        </p>

        <div className="mt-10">
          <Button href="/provider-apply" size="lg">
            Join the beta &mdash; free
          </Button>
        </div>
      </Container>
    </section>
  );
}
