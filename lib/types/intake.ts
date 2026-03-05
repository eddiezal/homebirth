export type QuestionType = "single" | "multi-select";

export interface IntakeOption {
  id: string;
  label: string;
  description?: string;
}

export interface IntakeQuestion {
  id: string;
  category: "hard-filter" | "capability" | "soft-match" | "values";
  question: string;
  helperText: string;
  type: QuestionType;
  options: IntakeOption[];
  required: boolean;
  skippable: boolean;
  /** Optional: only show this question if a previous answer matches */
  showIf?: {
    questionId: string;
    value: string | string[];
  };
}

export type IntakeAnswers = Record<string, string | string[]>;