"use client";

const checklistItems = [
  { label: "Location & availability", threshold: 25 },
  { label: "Budget & payment", threshold: 45 },
  { label: "Care style & values", threshold: 70 },
  { label: "Ranking best matches", threshold: 90 },
];

interface ProcessingChecklistProps {
  progress: number;
}

export function ProcessingChecklist({ progress }: ProcessingChecklistProps) {
  return (
    <div className="flex flex-col gap-3">
      {checklistItems.map((item) => {
        const checked = progress >= item.threshold;
        return (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                checked ? "bg-primary" : "border-2 border-gray-300"
              }`}
            >
              {checked && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                checked ? "font-medium text-heading" : "text-muted"
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
