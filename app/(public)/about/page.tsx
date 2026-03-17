import { Container } from "@/components/ui";

export default function AboutPage() {
  return (
    <main className="py-20">
      <Container className="max-w-[720px]">
        <h1 className="text-3xl font-semibold tracking-tight text-heading">
          About Homebirth.com
        </h1>
        <div className="mt-8 space-y-4 text-muted leading-relaxed">
          <p>
            Homebirth.com is a trust-first marketplace connecting expecting
            parents with midwives and doulas for out-of-hospital birth. We
            believe finding the right provider should be guided, transparent, and
            human.
          </p>
          <p>
            Parents answer a short intake about their preferences. Providers
            answer the mirror version. Our matching engine connects the two based
            on real compatibility — not ads, not keywords, not proximity alone.
          </p>
          <p>
            We launched in San Diego and are expanding based on community demand.
            If we&apos;re not in your area yet, join the waitlist and help bring
            us there.
          </p>
        </div>
      </Container>
    </main>
  );
}
