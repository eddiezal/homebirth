import { Container, SectionLabel, SectionHeading, Card, ArrowLink } from "@/components/ui";

const featuredArticle = {
  title: "The complete beginner's guide to homebirth",
  description:
    "Everything you need to know about planning a home birth — from finding a provider to preparing your space.",
  readTime: "8 min read",
  href: "/resources",
};

const guides = [
  {
    title: "Is homebirth right for me?",
    description: "A framework for evaluating whether home birth fits your situation.",
    readTime: "4 min",
    href: "/resources",
  },
  {
    title: "Midwife vs. doula — explained",
    description: "The roles, training, and what each brings to your birth experience.",
    readTime: "3 min",
    href: "/resources",
  },
  {
    title: "What does homebirth cost?",
    description: "Real pricing breakdowns, insurance options, and financial planning.",
    readTime: "5 min",
    href: "/resources",
  },
  {
    title: "How to evaluate a provider",
    description: "Questions, red flags, and what to look for in a midwife or doula.",
    readTime: "4 min",
    href: "/resources",
  },
];

export function StartHereHub() {
  return (
    <section className="py-20">
      <Container>
        <SectionLabel>New to homebirth?</SectionLabel>
        <SectionHeading className="mt-3">
          Start here — we&apos;ll walk you through it
        </SectionHeading>

        <Card className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <span className="text-2xl">&#x1F9ED;</span>
            <h3 className="mt-2 text-xl font-semibold text-heading">
              {featuredArticle.title}
            </h3>
            <p className="mt-2 text-muted">{featuredArticle.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <ArrowLink href={featuredArticle.href}>Read</ArrowLink>
              <span className="text-xs text-muted">{featuredArticle.readTime}</span>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.title} padding="p-5">
              <h3 className="font-semibold text-heading">{guide.title}</h3>
              <p className="mt-1 text-sm text-muted">{guide.description}</p>
              <div className="mt-3 flex items-center gap-4">
                <ArrowLink href={guide.href}>Read</ArrowLink>
                <span className="text-xs text-muted">{guide.readTime}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}