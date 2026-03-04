"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function Stepper({ currentStep, totalSteps, className = "" }: StepperProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-1.5 flex-1 rounded-full bg-gray-100">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="shrink-0 text-xs font-medium text-muted">
        {currentStep} of {totalSteps}
      </span>
    </div>
  );
}
