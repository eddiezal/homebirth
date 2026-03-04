import { Container, SectionLabel, SectionHeading, Card, Badge, ArrowLink } from "@/components/ui";

const questions = [
  {
    category: "Safety",
    question: "What's your plan if something unexpected happens during labor?",
    variant: "teal" as const,
  },
  {
    category: "Trust",
    question: "How many home births have you attended as primary midwife?",
    variant: "teal" as const,
  },
  {
    category: "Budget",
    question: "What's included in your fee, and what costs extra?",
    variant: "gray" as const,
  },
  {
    category: "Communication",
    question: "How do you prefer to communicate between appointments?",
    variant: "gray" as const,
  },
  {
    category: "Values",
    question: "How do you approach shared decision-making during birth?",
    variant: "teal" as const,
  },
  {
    category: "Care",
    question: "What does your postpartum care look like in the first week?",
    variant: "gray" as const,
  },
];

export function QuestionsToAsk() {
  return (
    <section className="py-20">
      <Container>
        <SectionLabel>Resources</SectionLabel>
        <SectionHeading className="mt-3">
          Don&apos;t know what to ask? We&apos;ve got you.
        </SectionHeading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {questions.map((q) => (
            <Card key={q.question} padding="p-5">
              <Badge variant={q.variant}>{q.category}</Badge>
              <p className="mt-3 font-medium text-heading">{q.question}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <ArrowLink href="/questions">View full question library</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
