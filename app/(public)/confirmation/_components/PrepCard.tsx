import { Card, ArrowLink } from "@/components/ui";

const prepQuestions = [
  { category: "Safety", question: "What is your transfer plan if complications arise?" },
  { category: "Budget", question: "What's included in your fee, and what might cost extra?" },
  { category: "Communication", question: "How do you prefer to communicate between visits?" },
  { category: "Care", question: "What does a typical prenatal visit look like with you?" },
];

const categoryColors: Record<string, string> = {
  Safety: "bg-red-50 text-red-700",
  Budget: "bg-amber-50 text-amber-700",
  Communication: "bg-blue-50 text-blue-700",
  Care: "bg-primary-light text-primary",
};

export function PrepCard() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-heading">
        Prep for your consult
      </h3>
      <p className="mt-1 text-xs text-muted">
        Come prepared with questions. Here are a few to start.
      </p>

      <ul className="mt-4 flex flex-col gap-3">
        {prepQuestions.map((q) => (
          <li key={q.question} className="flex items-start gap-2">
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                categoryColors[q.category] || "bg-gray-100 text-muted"
              }`}
            >
              {q.category}
            </span>
            <span className="text-sm text-heading">{q.question}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <ArrowLink href="/questions" variant="teal">
          See all questions
        </ArrowLink>
      </div>
    </Card>
  );
}
