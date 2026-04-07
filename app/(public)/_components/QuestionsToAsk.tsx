import { Container, SectionLabel, SectionHeading } from "@/components/ui";
import { FadeUp } from "./FadeUp";

const questions = [
  { category: "Safety", question: "What's your plan if something unexpected happens?" },
  { category: "Trust", question: "How many home births have you attended?" },
  { category: "Budget", question: "What's included in your fee?" },
  { category: "Comms", question: "How do you communicate between visits?" },
  { category: "Values", question: "How do you handle shared decision-making?" },
  { category: "Care", question: "What does postpartum look like in week one?" },
];

export function QuestionsToAsk() {
  return (
    <FadeUp className="bg-gradient-to-b from-bg to-primary-bg py-20">
      <Container narrow>
        <div className="mb-[50px] text-center">
          <SectionLabel>Questions to ask</SectionLabel>
          <SectionHeading className="mt-[14px]">
            Not sure what to ask? Here&apos;s a start.
          </SectionHeading>
          <p className="mx-auto mt-[10px] max-w-[520px] text-base leading-relaxed text-muted">
            Tap any question to learn why it matters.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {questions.map((q) => (
            <a
              key={q.question}
              href="/questions"
              className="flex items-center gap-[10px] rounded-3xl border-2 border-[#e8d9ee] bg-white px-[22px] py-[13px] text-[15px] text-[#5a4560] transition-all hover:-translate-y-[2px] hover:border-[#c9a8d8] hover:bg-primary-bg"
            >
              <span className="shrink-0 rounded-xl bg-primary-lighter px-[10px] py-[3px] text-[11px] font-bold text-primary">
                {q.category}
              </span>
              {q.question}
            </a>
          ))}
        </div>
      </Container>
    </FadeUp>
  );
}
