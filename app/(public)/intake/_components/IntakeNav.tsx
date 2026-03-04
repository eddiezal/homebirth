"use client";

interface IntakeNavProps {
  isFirstStep: boolean;
  isSkippable: boolean;
  onBack: () => void;
  onSkip: () => void;
}

export function IntakeNav({
  isFirstStep,
  isSkippable,
  onBack,
  onSkip,
}: IntakeNavProps) {
  return (
    <div className="flex w-full max-w-[640px] items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={`text-sm font-medium transition-colors ${
          isFirstStep
            ? "cursor-not-allowed text-gray-300"
            : "text-muted hover:text-heading"
        }`}
      >
        ← Back
      </button>

      {isSkippable && (
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-muted hover:text-heading hover:underline"
        >
          Skip this question
        </button>
      )}
    </div>
  );
}
