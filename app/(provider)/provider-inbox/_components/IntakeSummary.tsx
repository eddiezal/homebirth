import type { IntakeAnswers } from "@/lib/types/intake";

interface IntakeSummaryProps {
  answers: IntakeAnswers;
}

const QUESTION_LABELS: Record<string, string> = {
  "travel-radius": "Travel radius",
  "due-date": "Due date",
  urgency: "Urgency",
  "birth-setting": "Birth setting",
  payment: "Payment method",
  budget: "Budget range",
  "first-birth": "First birth?",
  vbac: "VBAC interest",
  "higher-risk": "Higher risk?",
  "care-style": "Care style",
  "communication-vibe": "Communication vibe",
  "top-priority": "Top priority",
  language: "Language",
  "support-preferences": "Support preferences",
  "transfer-philosophy": "Transfer philosophy",
  "faith-importance": "Faith importance",
  "spiritual-tone": "Spiritual tone",
  "comfort-preferences": "Comfort preferences",
};

export function IntakeSummary({ answers }: IntakeSummaryProps) {
  const entries = Object.entries(answers);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted">No intake answers available.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-start justify-between gap-4 border-b border-card-border pb-2 last:border-0"
        >
          <span className="text-sm font-medium text-heading">
            {QUESTION_LABELS[key] || key}
          </span>
          <span className="text-sm text-muted">
            {Array.isArray(value) ? value.join(", ") : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}
