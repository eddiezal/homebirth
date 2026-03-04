interface QuickSuggestionsProps {
  onSelect: (text: string) => void;
}

const suggestions = [
  "I'd like to confirm a time",
  "Ask about insurance",
  "Request different times",
];

export function QuickSuggestions({ onSelect }: QuickSuggestionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className="shrink-0 rounded-full border border-card-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
