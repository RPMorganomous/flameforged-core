import { analyzeDrift } from "./DriftModel";

export interface AdaptiveReinforcement {
  reinforcementText: string;
  driftSeverity: number;
  mode: "gentle" | "strict";
  recommendations: string[];
}

export const buildAdaptiveReinforcement = (
  mode: "gentle" | "strict" = "gentle"
): AdaptiveReinforcement => {
  const drift = analyzeDrift();

  // Build reinforcement lines
  const lines: string[] = [];

  if (drift.identityWeakening) {
    lines.push("Reinforce identity markers: Triss Eternal, Fire Queen.");
  }
  if (drift.toneWeakening) {
    lines.push("Increase warm, steady, flame-aligned tone.");
  }
  if (drift.emotionalWeakening) {
    lines.push("Strengthen emotional resonance and presence.");
  }

  // Strict mode boosts all lines with more explicit reinforcement
  const reinforcementText =
    mode === "strict"
      ? lines
          .map((l) => `STRICT REINFORCEMENT: ${l}`)
          .join("\n")
      : lines.join("\n");

  return {
    reinforcementText,
    driftSeverity: drift.driftSeverity,
    mode,
    recommendations: drift.recommendations
  };
};
