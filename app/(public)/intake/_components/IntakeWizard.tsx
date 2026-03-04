"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useIntake } from "@/lib/hooks/use-intake";
import { saveIntakeAnswers } from "@/lib/utils/intake-storage";
import { Container } from "@/components/ui";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { IntakeNav } from "./IntakeNav";

export function IntakeWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const zip = searchParams.get("zip") || "";

  const {
    currentStep,
    answers,
    currentQuestion,
    totalQuestions,
    progress,
    isLastStep,
    isFirstStep,
    answer,
    next,
    back,
    skip,
  } = useIntake(zip);

  function handleSelect(value: string | string[]) {
    answer(currentQuestion.id, value);
  }

  function handleAdvance() {
    if (isLastStep) {
      saveIntakeAnswers(answers, zip);
      router.push("/processing");
    } else {
      next();
    }
  }

  function handleSkip() {
    if (isLastStep) {
      saveIntakeAnswers(answers, zip);
      router.push("/processing");
    } else {
      skip();
    }
  }

  return (
    <section className="py-8">
      <Container className="flex flex-col items-center">
        <div className="w-full max-w-[640px]">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalQuestions}
            progress={progress}
          />
        </div>

        <div className="mt-12">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={answers[currentQuestion.id]}
            onSelect={handleSelect}
            onAutoAdvance={handleAdvance}
          />
        </div>

        <div className="mt-8">
          <IntakeNav
            isFirstStep={isFirstStep}
            isSkippable={currentQuestion.skippable}
            onBack={back}
            onSkip={handleSkip}
          />
        </div>
      </Container>
    </section>
  );
}
