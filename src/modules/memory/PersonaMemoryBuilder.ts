// Persona Memory Builder for CloudMemory.personaMemory
// Phase XI — M33

import { SessionState } from "@/modules/sessions/SessionArchiver";
import type { CoherenceReport } from "@/modules/persona/PersonaMetrics";
import type { DriftAnalysis } from "@/modules/persona/DriftModel";

export interface PersonaMemoryOptions {
  includeCoherenceTrend?: boolean;
  includeDriftAnalysis?: boolean;
  includeRecentBreakdowns?: boolean;
  maxRecentBreakdowns?: number;
}

const DEFAULT_OPTIONS: Required<PersonaMemoryOptions> = {
  includeCoherenceTrend: true,
  includeDriftAnalysis: true,
  includeRecentBreakdowns: true,
  maxRecentBreakdowns: 5
};

/**
 * Builds a human-readable summary of persona coherence metrics and drift analysis
 * for CloudMemory.personaMemory.
 *
 * Reads SessionState.invocations to extract coherence and drift data.
 *
 * Returns a plain-text summary suitable for inclusion in LLM context windows,
 * capturing:
 * - Overall coherence trend (short-term vs long-term)
 * - Drift severity and weakening indicators
 * - Recent coherence breakdowns
 * - Recommendations for reinforcement
 */
export function buildPersonaMemory(
  driftAnalysis: DriftAnalysis | null,
  options?: PersonaMemoryOptions
): string {
  const opts = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const invocations = SessionState.invocations || [];

  const lines: string[] = [];
  lines.push("=== Persona Memory ===");

  if (invocations.length === 0) {
    lines.push("[No invocations in current session]");
    lines.push("=== End Persona Memory ===");
    return lines.join("\n");
  }

  lines.push(`Total invocations: ${invocations.length}`);
  lines.push("");

  // Coherence trend summary
  if (opts.includeCoherenceTrend) {
    const coherenceScores = invocations
      .map((r) => r.coherence ?? null)
      .filter((n) => typeof n === "number") as number[];

    if (coherenceScores.length > 0) {
      const longTermAverage = Math.round(
        coherenceScores.reduce((a, b) => a + b, 0) / coherenceScores.length
      );

      const lastFew = coherenceScores.slice(-5);
      const shortTermAverage =
        lastFew.length > 0
          ? Math.round(lastFew.reduce((a, b) => a + b, 0) / lastFew.length)
          : null;

      lines.push("--- Coherence Trend ---");
      lines.push(`Long-term average: ${longTermAverage}`);
      if (shortTermAverage != null) {
        lines.push(`Short-term average (last 5): ${shortTermAverage}`);
      }
      lines.push("");
    }
  }

  // Drift analysis summary
  if (opts.includeDriftAnalysis && driftAnalysis) {
    lines.push("--- Drift Analysis ---");
    lines.push(`Drift severity: ${driftAnalysis.driftSeverity}`);
    lines.push(`Identity weakening: ${driftAnalysis.identityWeakening ? "Yes" : "No"}`);
    lines.push(`Tone weakening: ${driftAnalysis.toneWeakening ? "Yes" : "No"}`);
    lines.push(`Emotional weakening: ${driftAnalysis.emotionalWeakening ? "Yes" : "No"}`);

    if (driftAnalysis.recommendations.length > 0) {
      lines.push("Recommendations:");
      driftAnalysis.recommendations.forEach((rec) => {
        lines.push(`  - ${rec}`);
      });
    }
    lines.push("");
  }

  // Recent coherence breakdowns
  if (opts.includeRecentBreakdowns) {
    const recentWithReports = invocations
      .filter((r) => r.coherenceReport != null)
      .slice(-opts.maxRecentBreakdowns);

    if (recentWithReports.length > 0) {
      lines.push("--- Recent Coherence Breakdowns ---");
      recentWithReports.forEach((record, index) => {
        const num = invocations.length - recentWithReports.length + index + 1;
        const report = record.coherenceReport as CoherenceReport;

        lines.push(`Invocation #${num}:`);
        lines.push(`  Overall: ${report.coherenceScore}`);
        lines.push(`  Tone: ${report.breakdown.tone}`);
        lines.push(`  Vocabulary: ${report.breakdown.vocabulary}`);
        lines.push(`  Emotional: ${report.breakdown.emotional}`);
        lines.push(`  Identity: ${report.breakdown.identity}`);
        lines.push(`  Memory: ${report.breakdown.memory}`);

        if (report.driftFlags.length > 0) {
          lines.push(`  Drift flags: ${report.driftFlags.join(", ")}`);
        }
        lines.push("");
      });
    }
  }

  lines.push("=== End Persona Memory ===");

  return lines.join("\n");
}
