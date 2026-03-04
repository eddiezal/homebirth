import type { Provider } from "@/lib/types/provider";
import type { IntakeAnswers } from "@/lib/types/intake";

/**
 * Score and rank providers based on parent intake answers.
 *
 * Sprint 1: Returns mock providers sorted by their hardcoded matchScore.
 * Future: Real scoring based on hard filters + soft scoring weights.
 */
export function scoreProviders(
  providers: Provider[],
  _answers: IntakeAnswers
): Provider[] {
  return [...providers].sort((a, b) => b.matchScore - a.matchScore);
}
