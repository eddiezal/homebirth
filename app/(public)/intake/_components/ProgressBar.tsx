"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  progress,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">
          Finding your match — Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
