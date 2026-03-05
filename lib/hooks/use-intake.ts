"use client";

import { useReducer, useMemo, useCallback } from "react";
import type { IntakeAnswers, IntakeQuestion } from "@/lib/types/intake";
import { intakeQuestions } from "@/lib/data/intake-questions";

interface IntakeState {
  currentStep: number;
  answers: IntakeAnswers;
  zip: string;
}

type IntakeAction =
  | { type: "ANSWER"; questionId: string; value: string | string[] }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "SKIP" };

/** Returns only questions that pass their showIf condition given current answers */
function getVisibleQuestions(answers: IntakeAnswers): IntakeQuestion[] {
  return intakeQuestions.filter((q) => {
    if (!q.showIf) return true;
    const { questionId, value } = q.showIf;
    const given = answers[questionId];
    if (!given) return false;
    if (Array.isArray(value)) {
      // Show if the given answer is one of the allowed values
      return Array.isArray(given)
        ? given.some((v) => value.includes(v))
        : value.includes(given as string);
    }
    return Array.isArray(given) ? given.includes(value) : given === value;
  });
}

function reducer(state: IntakeState, action: IntakeAction): IntakeState {
  const visible = getVisibleQuestions(state.answers);
  const lastStep = visible.length - 1;

  switch (action.type) {
    case "ANSWER": {
      const newAnswers = { ...state.answers, [action.questionId]: action.value };
      // Recalculate visible after this answer — step stays the same
      return { ...state, answers: newAnswers };
    }
    case "NEXT":
      return { ...state, currentStep: Math.min(state.currentStep + 1, lastStep) };
    case "BACK":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case "SKIP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, lastStep) };
    default:
      return state;
  }
}

export function useIntake(zip: string) {
  const [state, dispatch] = useReducer(reducer, {
    currentStep: 0,
    answers: {},
    zip,
  });

  // Recompute visible questions whenever answers change
  const visibleQuestions = useMemo(
    () => getVisibleQuestions(state.answers),
    [state.answers]
  );

  const currentQuestion = visibleQuestions[state.currentStep];
  const totalQuestions = visibleQuestions.length;
  const progress = ((state.currentStep + 1) / totalQuestions) * 100;
  const isLastStep = state.currentStep === totalQuestions - 1;
  const isFirstStep = state.currentStep === 0;

  const actions = useMemo(
    () => ({
      answer(questionId: string, value: string | string[]) {
        dispatch({ type: "ANSWER", questionId, value });
      },
      next() {
        dispatch({ type: "NEXT" });
      },
      back() {
        dispatch({ type: "BACK" });
      },
      skip() {
        dispatch({ type: "SKIP" });
      },
    }),
    []
  );

  return {
    ...state,
    currentQuestion,
    totalQuestions,
    progress,
    isLastStep,
    isFirstStep,
    ...actions,
  };
}