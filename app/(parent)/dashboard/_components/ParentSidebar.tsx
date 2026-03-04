import { Card, Badge, Button } from "@/components/ui";

interface SavedQuestion {
  category: string;
  question: string;
}

interface ContextualResource {
  title: string;
  description: string;
  link: string;
}

interface DashboardData {
  dueDate: string;
  weeksRemaining: number;
  preferenceTags: string[];
  savedQuestions: SavedQuestion[];
  contextualResource: Record<string, ContextualResource>;
}

interface ParentSidebarProps {
  dashboard: DashboardData;
  stage: "responded" | "sent" | "scheduled";
}

const categoryColors: Record<string, string> = {
  Safety: "text-red-600",
  Budget: "text-amber-600",
  Communication: "text-blue-600",
  Care: "text-primary",
};

export function ParentSidebar({ dashboard, stage }: ParentSidebarProps) {
  const resource = dashboard.contextualResource[stage];

  function handleCopy() {
    const text = dashboard.savedQuestions.map((q) => `[${q.category}] ${q.question}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      {/* Due date + profile card */}
      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          Due date
        </p>
        <p className="mt-1 text-2xl font-bold text-heading">
          {dashboard.dueDate}
        </p>
        <p className="text-xs text-muted">{dashboard.weeksRemaining} weeks remaining</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {dashboard.preferenceTags.map((tag) => (
            <Badge key={tag} variant="teal">{tag}</Badge>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outlined" size="sm" href="/preferences">
            Edit preferences
          </Button>
        </div>
      </Card>

      {/* Checklist preview */}
      <Card>
        <h3 className="text-sm font-semibold text-heading">Your checklist</h3>
        <div className="mt-3 flex flex-col gap-2.5">
          {dashboard.savedQuestions.map((q) => (
            <div key={q.question} className="flex items-start gap-2">
              <span className={`text-xs font-medium ${categoryColors[q.category] || "text-muted"}`}>
                {q.category}
              </span>
              <p className="text-xs text-heading">{q.question}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-[6px] border border-card-border px-3 py-1 text-xs font-medium text-heading transition-colors hover:border-primary"
          >
            Copy
          </button>
          <button
            type="button"
            className="rounded-[6px] border border-card-border px-3 py-1 text-xs font-medium text-heading transition-colors hover:border-primary"
          >
            Email
          </button>
        </div>
      </Card>

      {/* Contextual resource */}
      {resource && (
        <Card variant="teal">
          <h3 className="text-sm font-semibold text-heading">
            {resource.title}
          </h3>
          <p className="mt-1 text-xs text-muted">{resource.description}</p>
          <div className="mt-3">
            <Button variant="outlined" size="sm" href={resource.link}>
              Read more
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
