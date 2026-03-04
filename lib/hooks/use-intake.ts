"use client";

import { useReducer, useMemo } from "react";
import type { IntakeAnswers } from "@/lib/types/intake";
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

function reducer(state: IntakeState, action: IntakeAction): IntakeState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    case "NEXT":
      return {
        ...state,
        currentStep: Math.min(
          state.currentStep + 1,
          intakeQuestions.length - 1
        ),
      };
    case "BACK":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case "SKIP":
      return {
        ...state,
        currentStep: Math.min(
          state.currentStep + 1,
          intakeQuestions.length - 1
        ),
      };
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

  const currentQuestion = intakeQuestions[state.currentStep];
  const totalQuestions = intakeQuestions.length;
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
