import type { Provider } from "@/lib/types/provider";
import type { IntakeAnswers } from "@/lib/types/intake";

/**
 * Score and rank providers based on parent intake answers.
 *
 * Scoring model:
 * - Hard filters applied first (binary disqualifiers)
 * - Soft scoring weights applied to remaining providers
 * - Final score is 0–100
 */

// ── Hard filter helpers ────────────────────────────────────────────────────

function passesBirthSetting(provider: Provider, answers: IntakeAnswers): boolean {
  const setting = answers["birth-setting"] as string | undefined;
  if (!setting || setting === "either") return true;
  const map: Record<string, string> = {
    home: "Home birth",
    "birth-center": "Birth center",
  };
  return provider.birthSettings.includes(map[setting] ?? setting);
}

function passesPayment(provider: Provider, answers: IntakeAnswers): boolean {
  const payment = answers["payment"] as string | undefined;
  if (!payment || payment === "not-sure" || payment === "flexible") return true;
  if (payment === "medicaid") {
    return (
      provider.slidingScale ||
      provider.insuranceAccepted.some((i) =>
        i.toLowerCase().includes("medicaid")
      )
    );
  }
  if (payment === "insurance") {
    return provider.insuranceAccepted.some(
      (i) => !i.toLowerCase().includes("medicaid") && i.toLowerCase() !== "self-pay"
    );
  }
  return true;
}

function passesDistance(provider: Provider, answers: IntakeAnswers): boolean {
  const radius = answers["travel-radius"] as string | undefined;
  if (!radius || radius === "30+") return true;
  return provider.distance <= parseInt(radius, 10);
}

function passesVbac(provider: Provider, answers: IntakeAnswers): boolean {
  const vbac = answers["vbac"] as string | undefined;
  if (!vbac || vbac === "no") return true;
  return provider.tags.some((t) =>
    t.toLowerCase().includes("vbac")
  );
}

// ── Soft score helpers (0–1 each) ─────────────────────────────────────────

function scoreBirthSetting(provider: Provider, answers: IntakeAnswers): number {
  const setting = answers["birth-setting"] as string | undefined;
  if (!setting || setting === "either") return 0.5;
  const map: Record<string, string> = {
    home: "Home birth",
    "birth-center": "Birth center",
  };
  return provider.birthSettings.includes(map[setting]) ? 1 : 0;
}

function scoreCareStyle(provider: Provider, answers: IntakeAnswers): number {
  const style = answers["care-style"] as string | undefined;
  if (!style) return 0.5;
  const tagMap: Record<string, string[]> = {
    "hands-off": ["hands-off", "low-intervention", "autonomous"],
    balanced:    ["balanced", "shared decision"],
    guided:      ["guided", "active support"],
  };
  const targetTags = tagMap[style] ?? [];
  const allTags = [
    ...provider.tags.map((t) => t.toLowerCase()),
    ...("communicationTags" in provider
      ? (provider as unknown as { communicationTags: string[] }).communicationTags.map((t: string) => t.toLowerCase())
      : []),
  ];
  return targetTags.some((t) => allTags.some((pt) => pt.includes(t))) ? 1 : 0.3;
}

function scoreLanguage(provider: Provider, answers: IntakeAnswers): number {
  const lang = answers["language"] as string | undefined;
  if (!lang || lang === "english") return 0.5;
  if (lang === "spanish") {
    return provider.languages.some((l) => l.toLowerCase().includes("spanish")) ? 1 : 0;
  }
  if (lang === "bilingual") {
    return provider.languages.length >= 2 ? 1 : 0.3;
  }
  return 0.5;
}

function scoreSupportPreferences(provider: Provider, answers: IntakeAnswers): number {
  const prefs = answers["support-preferences"] as string[] | undefined;
  if (!prefs || prefs.includes("none") || prefs.length === 0) return 0.5;
  const tagMap: Record<string, string[]> = {
    "trauma-informed":     ["trauma-informed"],
    "lgbtq-affirming":     ["lgbtq", "affirming"],
    "culturally-specific": ["culturally responsive", "culturally specific"],
  };
  const allTags = provider.tags.map((t) => t.toLowerCase());
  const matched = prefs.filter((pref) => {
    const targets = tagMap[pref] ?? [];
    return targets.some((t) => allTags.some((pt) => pt.includes(t)));
  });
  return matched.length / prefs.filter((p) => p !== "none").length;
}

function scoreTopPriority(provider: Provider, answers: IntakeAnswers): number {
  const priority = answers["top-priority"] as string | undefined;
  if (!priority) return 0.5;
  const tagMap: Record<string, string[]> = {
    "calm-reassurance": ["calm", "reassuring", "gentle"],
    "evidence-based":   ["evidence-based", "evidence based"],
    advocacy:           ["advocacy", "affirming", "empowering"],
    holistic:           ["holistic", "whole-person"],
  };
  const targets = tagMap[priority] ?? [];
  const allTags = provider.tags.map((t) => t.toLowerCase());
  return targets.some((t) => allTags.some((pt) => pt.includes(t))) ? 1 : 0.3;
}

// ── Main scoring function ──────────────────────────────────────────────────

export function scoreProviders(
  providers: Provider[],
  answers: IntakeAnswers
): Provider[] {
  const hasAnswers = Object.keys(answers).length > 0;

  const scored = providers
    .filter((p) => {
      if (!hasAnswers) return true;
      return (
        passesBirthSetting(p, answers) &&
        passesPayment(p, answers) &&
        passesDistance(p, answers) &&
        passesVbac(p, answers)
      );
    })
    .map((p) => {
      if (!hasAnswers) return { ...p };

      // Weighted soft score
      const softScore =
        scoreBirthSetting(p, answers)       * 0.20 +
        scoreCareStyle(p, answers)           * 0.25 +
        scoreLanguage(p, answers)            * 0.15 +
        scoreSupportPreferences(p, answers)  * 0.20 +
        scoreTopPriority(p, answers)         * 0.20;

      // Normalize to 0–100, blended with provider's base score for stability
      const computed = Math.round(softScore * 100);
      const blended = Math.round(computed * 0.7 + p.matchScore * 0.3);

      return { ...p, matchScore: Math.min(blended, 99) };
    });

  return scored.sort((a, b) => b.matchScore - a.matchScore);
}