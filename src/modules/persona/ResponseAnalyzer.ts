import { scoreCoherence } from "./PersonaMetrics";
import type { CoherenceReport } from "./PersonaMetrics";

export const analyzeResponse = (
  prompt: string,
  output: string
): CoherenceReport => {
  return scoreCoherence(prompt, output);
};
