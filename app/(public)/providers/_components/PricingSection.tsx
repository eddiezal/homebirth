import { Container, SectionLabel, SectionHeading, Button } from "@/components/ui";

const tiers = [
  {
    name: "Basic",
    price: "$49",
    period: "/mo",
    description: "Get found by matched parents",
    highlighted: false,
    features: [
      "Profile listing (intake-matched)",
      "Matched lead delivery with intake answers",
      "Basic verification (identity)",
      "Aggregated web reviews on profile",
      "1 response template",
    ],
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    description: "Grow your practice with insights",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Everything in Basic",
      "Full pipeline tracking",
      "Unlimited response templates",
      "Lead analytics (views, match rate, conversion)",
      "Premium verification badges",
      "Priority placement in results",
    ],
  },
  {
    name: "Practice",
    price: "$199",
    period: "/mo",
    description: "For teams and busy practices",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Multi-user inbox (associates, staff)",
      "Team management + permissions",
      "Auto-responses for after-hours leads",
      "Custom intake questions (1-3)",
      "Dedicated onboarding support",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="bg-gray-50/60 py-20">
      <Container>
        <div className="text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading className="mt-3">
            Simple, transparent pricing
          </SectionHeading>
          <p className="mt-3 text-muted">
            All tiers are <strong className="text-heading">free during the beta</strong>. No credit card required.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[12px] border p-6 ${
                tier.highlighted
                  ? "border-primary bg-white shadow-md"
                  : "border-card-border bg-white"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                  {tier.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold text-heading">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{tier.description}</p>

              <div className="mt-4">
                <span className="text-3xl font-bold text-heading">
                  {tier.price}
                </span>
                <span className="text-sm text-muted">{tier.period}</span>
              </div>

              <p className="mt-1 text-xs font-medium text-primary">
                Free during beta
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-heading"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  href="/provider-apply"
                  variant={tier.highlighted ? "primary" : "outlined"}
                  fullWidth
                  size="sm"
                >
                  Get started free
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
