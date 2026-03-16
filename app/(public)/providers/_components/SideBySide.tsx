import { Container, SectionHeading } from "@/components/ui";

const rows = [
  {
    parent: {
      title: "Zip + path selection",
      description:
        "Parent enters zip, picks exploring or matching path. Two minutes to share what matters most.",
    },
    provider: {
      title: "Service area + availability setup",
      description:
        "Define your radius, availability, and client types during setup. Only matched leads come through.",
    },
  },
  {
    parent: {
      title: "12-18 intake questions",
      description:
        "Care style, birth setting, budget, insurance, due date, values — 2 minutes to complete.",
    },
    provider: {
      title: "Mirror intake",
      description:
        "Same categories from your side — what you offer, scope, pricing, philosophy. Matching by fit, not keyword.",
    },
  },
  {
    parent: {
      title: "Ranked match results",
      description:
        "3-7 providers with \"Why this match\" panels — distance, availability, care style, specialties.",
    },
    provider: {
      title: "Positioned by fit",
      description:
        "Not competing with everyone — shown only to parents whose needs align with your practice.",
    },
  },
  {
    parent: {
      title: "Profile + consult request",
      description:
        "Sees credentials, philosophy, pricing, aggregated reviews. Clicks \"Request consult,\" shares contact info.",
    },
    provider: {
      title: "Lead packet",
      description:
        "Receives name, contact, full intake answers, match reasoning — all before responding.",
    },
  },
];

export function SideBySide() {
  return (
    <section className="bg-gray-50/60 py-20">
      <Container>
        <div className="text-center">
          <SectionHeading>How matching works — both sides</SectionHeading>
          <p className="mt-3 text-muted">
            The same intake, mirrored. Parent preferences on the left, your
            practice details on the right.
          </p>
        </div>

        {/* Column headers */}
        <div className="mt-12 hidden grid-cols-[1fr_48px_1fr] gap-4 sm:grid">
          <div className="text-center text-sm font-semibold text-muted">
            What parents experience
          </div>
          <div />
          <div className="text-center text-sm font-semibold text-primary">
            What you experience
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 flex flex-col gap-6 sm:mt-6">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_48px_1fr]"
            >
              {/* Parent card */}
              <div className="rounded-[12px] border border-card-border bg-white p-5">
                <span className="mb-1 block text-xs font-medium text-muted sm:hidden">
                  Parent side
                </span>
                <h3 className="text-base font-semibold text-heading">
                  {row.parent.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {row.parent.description}
                </p>
              </div>

              {/* Arrow connector */}
              <div className="hidden items-center justify-center sm:flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M8 7l4-4m0 0l4 4m-4-4v18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(90 12 12)"
                  />
                </svg>
              </div>

              {/* Provider card */}
              <div className="rounded-[12px] bg-primary-light p-5">
                <span className="mb-1 block text-xs font-medium text-primary sm:hidden">
                  Provider side
                </span>
                <h3 className="text-base font-semibold text-heading">
                  {row.provider.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {row.provider.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
