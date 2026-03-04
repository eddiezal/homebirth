import { Container, Card, Button } from "@/components/ui";

export function BottomCta() {
  return (
    <section className="py-20">
      <Container className="flex justify-center">
        <Card className="max-w-2xl text-center">
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.015em] text-heading">
            Ready to find your match?
          </h2>
          <p className="mt-3 text-muted">
            Answer a few questions and see vetted providers in your area. Free,
            no account required, takes about 2 minutes.
          </p>
          <div className="mt-6">
            <Button href="/#hero">Start your match</Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
