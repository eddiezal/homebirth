import { Container, SectionLabel, SectionHeading, Badge } from "@/components/ui";

const matchReasons = [
  "Within 10 miles of your practice",
  "Open for June 2026 due date",
  "VBAC experienced — matches your specialty",
  "Insurance-compatible",
];

const tags = ["Home birth", "VBAC", "Insurance", "Balanced care", "June 2026"];

export function LeadPacketPreview() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <SectionLabel>What you receive</SectionLabel>
          <SectionHeading className="mt-3">
            Every lead comes with context
          </SectionHeading>
          <p className="mt-3 max-w-xl mx-auto text-muted">
            No cold calls, no blind inquiries. You get the parent&apos;s full
            intake answers, contact info, and exactly why they matched with you.
          </p>
        </div>

        {/* Lead packet card */}
        <div className="mx-auto mt-12 max-w-lg rounded-[12px] border border-card-border bg-white p-6 shadow-sm">
          {/* Parent header */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
              JM
            </div>
            <div>
              <p className="font-semibold text-heading">Jessica M.</p>
              <p className="text-sm text-muted">
                Due June 2026 &middot; San Diego, CA
              </p>
            </div>
            <Badge className="ml-auto">97% match</Badge>
          </div>

          {/* Preference tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-heading"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Why she matched */}
          <div className="mt-5 rounded-[8px] bg-primary-light p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              Why she matched with you
            </p>
            <ul className="mt-3 space-y-2">
              {matchReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm text-heading">
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
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex gap-3">
            <span className="inline-flex flex-1 items-center justify-center rounded-[8px] bg-cta px-4 py-2.5 text-sm font-medium text-white">
              Respond
            </span>
            <span className="inline-flex flex-1 items-center justify-center rounded-[8px] border border-card-border px-4 py-2.5 text-sm font-medium text-heading">
              View full intake
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
