import { Container, Button } from "@/components/ui";

export function ProviderBottomCta() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[12px] bg-cta p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">
            See both sides for yourself
          </h2>
          <p className="mt-3 text-base text-gray-300">
            Free during beta. San Diego only. 5-minute setup.
          </p>
          <div className="mt-8">
            <Button
              href="/provider-apply"
              size="lg"
              className="bg-white text-heading hover:bg-gray-100"
            >
              Apply to join
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
