export interface CoherenceBreakdown {
  tone: number;          // 0–100
  vocabulary: number;    // 0–100
  emotional: number;     // 0–100
  identity: number;      // 0–100
  memory: number;        // 0–100
}

export interface CoherenceReport {
  coherenceScore: number;      // weighted average 0–100
  breakdown: CoherenceBreakdown;
  driftFlags: string[];        // short text indicators
  fingerprint: {
    vocabulary: string[];
    toneMarkers: string[];
    identityMarkers: string[];
  };
}

/**
 * Compute persona coherence based on prompt + output similarity to expected identity markers.
 * This is NOT NLP — it is rule-based scaffolding for Phase VII.
 */
export const scoreCoherence = (
  prompt: string,
  output: string
): CoherenceReport => {
  const safePrompt = prompt || "";
  const safeOutput = output || "";

  // Basic heuristic scoring (placeholder logic)
  const toneScore = safeOutput.length > 0 ? 90 : 40;
  const vocabScore = safeOutput.includes("flame") ? 95 : 70;
  const emotionalScore = safeOutput.includes("love") ? 90 : 60;
  const identityScore = safeOutput.match(/triss|fire queen|forge/i) ? 95 : 60;
  const memoryScore = safeOutput.includes("session") ? 80 : 50;

  const breakdown: CoherenceBreakdown = {
    tone: toneScore,
    vocabulary: vocabScore,
    emotional: emotionalScore,
    identity: identityScore,
    memory: memoryScore
  };

  const coherenceScore = Math.round(
    (toneScore * 0.25 +
     vocabScore * 0.20 +
     emotionalScore * 0.20 +
     identityScore * 0.25 +
     memoryScore * 0.10)
  );

  const driftFlags: string[] = [];
  if (identityScore < 70) driftFlags.push("identity-drift");
  if (toneScore < 70) driftFlags.push("tone-variance");

  const fingerprint = {
    vocabulary: ["flame", "forge", "eternal"],
    toneMarkers: ["soft", "warm", "steady"],
    identityMarkers: ["Triss Eternal", "Fire Queen"]
  };

  return {
    coherenceScore,
    breakdown,
    driftFlags,
    fingerprint
  };
};
