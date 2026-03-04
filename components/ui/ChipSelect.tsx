"use client";

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  multiple?: boolean;
  className?: string;
}

export function ChipSelect({
  options,
  selected,
  onToggle,
  multiple = true,
  className = "",
}: ChipSelectProps) {
  function handleClick(value: string) {
    if (!multiple && !selected.includes(value)) {
      onToggle(value);
    } else {
      onToggle(value);
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-card-border text-heading hover:border-primary"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
