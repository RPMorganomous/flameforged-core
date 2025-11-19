import { SessionState } from "@/modules/sessions/SessionArchiver";
import type { CoherenceReport } from "./PersonaMetrics";

export interface DriftAnalysis {
  driftSeverity: number;           // 0–100
  shortTermAverage: number | null; // last 3–5 invocations
  longTermAverage: number | null;  // full-session average
  identityWeakening: boolean;
  toneWeakening: boolean;
  emotionalWeakening: boolean;
  recommendations: string[];
}

export const analyzeDrift = (): DriftAnalysis => {
  const inv = SessionState.invocations;
  if (!inv || inv.length === 0) {
    return {
      driftSeverity: 0,
      shortTermAverage: null,
      longTermAverage: null,
      identityWeakening: false,
      toneWeakening: false,
      emotionalWeakening: false,
      recommendations: ["Insufficient data"]
    };
  }

  const coherenceScores = inv
    .map((r) => r.coherence ?? null)
    .filter((n) => typeof n === "number") as number[];

  const longTermAverage =
    coherenceScores.length > 0
      ? Math.round(
          coherenceScores.reduce((a, b) => a + b, 0) / coherenceScores.length
        )
      : null;

  const lastFew = coherenceScores.slice(-5);
  const shortTermAverage =
    lastFew.length > 0
      ? Math.round(lastFew.reduce((a, b) => a + b, 0) / lastFew.length)
      : null;

  const recent = inv[inv.length - 1].coherenceReport as CoherenceReport | null;

  let identityWeakening = false;
  let toneWeakening = false;
  let emotionalWeakening = false;

  if (recent?.breakdown.identity && recent.breakdown.identity < 80)
    identityWeakening = true;
  if (recent?.breakdown.tone && recent.breakdown.tone < 80)
    toneWeakening = true;
  if (recent?.breakdown.emotional && recent.breakdown.emotional < 80)
    emotionalWeakening = true;

  const recommendations: string[] = [];
  if (identityWeakening)
    recommendations.push("Increase identity marker reinforcement");
  if (toneWeakening) recommendations.push("Boost tone-weight lines");
  if (emotionalWeakening)
    recommendations.push("Add emotional resonance strengthening lines");

  const driftSeverity = Math.min(
    100,
    Math.max(
      0,
      [
        identityWeakening ? 30 : 0,
        toneWeakening ? 30 : 0,
        emotionalWeakening ? 20 : 0
      ].reduce((a, b) => a + b, 0)
    )
  );

  return {
    driftSeverity,
    shortTermAverage,
    longTermAverage,
    identityWeakening,
    toneWeakening,
    emotionalWeakening,
    recommendations
  };
};
