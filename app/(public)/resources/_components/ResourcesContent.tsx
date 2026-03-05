import { Container, SectionLabel, SectionHeading, Card, Badge, ArrowLink } from "@/components/ui";

const resourceGroups = [
  {
    category: "Is homebirth right for me?",
    badge: "Start here",
    badgeVariant: "teal" as const,
    items: [
      {
        title: "What makes someone a good candidate for homebirth?",
        body: "Most low-risk pregnancies are excellent candidates. Key factors include a singleton pregnancy, no significant medical conditions, a trusted provider, and proximity to a hospital if transfer is needed.",
      },
      {
        title: "What are the real risks — and how are they managed?",
        body: "Complications can arise in any birth setting. What matters is how quickly they're identified and addressed. A skilled midwife monitors continuously and has clear transfer protocols for anything outside normal parameters.",
      },
      {
        title: "How is homebirth different from a hospital birth?",
        body: "Homebirth prioritizes continuity of care with one provider who knows you throughout pregnancy, labor, and postpartum. You're in a familiar environment, with full autonomy over your experience — no routine interventions unless you want them.",
      },
    ],
  },
  {
    category: "Understanding your options",
    badge: "Providers",
    badgeVariant: "gray" as const,
    items: [
      {
        title: "CPM vs CNM — what's the difference?",
        body: "A CPM (Certified Professional Midwife) is trained specifically for out-of-hospital birth. A CNM (Certified Nurse-Midwife) is a registered nurse with midwifery training who may attend homebirths or work in birth centers. Both are licensed — the right fit depends on your needs and state regulations.",
      },
      {
        title: "What does a birth center offer that homebirth doesn't?",
        body: "Birth centers are homelike facilities outside a hospital. They have on-site equipment, often a team of midwives, and can sometimes offer more backup options. Some parents prefer the middle ground they provide.",
      },
      {
        title: "Do I need a doula if I have a midwife?",
        body: "They serve different roles. Your midwife monitors clinical safety. A doula provides continuous emotional and physical support during labor. Many families find having both makes for a better experience — but it's entirely your choice.",
      },
    ],
  },
  {
    category: "Practical questions",
    badge: "Logistics",
    badgeVariant: "gray" as const,
    items: [
      {
        title: "What does a homebirth actually cost?",
        body: "Midwife fees typically range from $3,000–$8,000 depending on location and experience. Some accept insurance; many work with HSA/FSA funds. Birth center fees are similar. Ask specifically what's included — prenatal visits, birth, and postpartum care should all be covered.",
      },
      {
        title: "What happens if I need to transfer to a hospital?",
        body: "Transfer rates vary by provider and are typically 10–15% for first-time mothers, much lower for subsequent births. Most transfers are non-emergency — labor stalling, exhaustion, or wanting pain relief. Your midwife will accompany you and coordinate with hospital staff.",
      },
      {
        title: "How do I know if a provider is qualified?",
        body: "Look for licensure in your state, active certification (CPM through NARM, or CNM through AMCB), and experience attending births as a primary midwife. Ask directly how many births they've attended, what their transfer rate is, and how they handle emergencies.",
      },
    ],
  },
];

export function ResourcesContent() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-white py-16">
        <Container className="flex flex-col items-center text-center">
          <SectionLabel>Resources</SectionLabel>
          <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.015em] text-heading sm:text-[2.5rem]">
            Everything you need to make a confident decision
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Not sure if homebirth is right for you? That&apos;s exactly where to start.
            Read at your own pace — there&apos;s no pressure here.
          </p>
        </Container>
      </section>

      {/* Resource groups */}
      <section className="py-16">
        <Container className="flex flex-col gap-16">
          {resourceGroups.map((group) => (
            <div key={group.category}>
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-xl font-semibold text-heading">{group.category}</h2>
                <Badge variant={group.badgeVariant}>{group.badge}</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {group.items.map((item) => (
                  <Card key={item.title} padding="p-6">
                    <p className="font-medium text-heading">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Questions teaser */}
      <section className="border-t border-card-border bg-gray-50 py-16">
        <Container className="flex flex-col items-center text-center">
          <SectionLabel>Preparation</SectionLabel>
          <SectionHeading className="mt-3">Ready to start talking to providers?</SectionHeading>
          <p className="mt-4 max-w-lg text-muted">
            Knowing the right questions to ask is half the work.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <ArrowLink href="/questions">Browse the question library</ArrowLink>
            <ArrowLink href="/intake">Find providers near me</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}