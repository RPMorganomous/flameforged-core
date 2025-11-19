// Session Memory Builder for CloudMemory.sessionMemory
// Phase XI — M31

import { SessionState } from "@/modules/sessions/SessionArchiver";
import type { InvocationRecord } from "@/modules/sessions/sessionTypes";

export interface SessionMemoryOptions {
  maxInvocations?: number;
  includeTimestamps?: boolean;
  includeCoherence?: boolean;
  includeCloudMetadata?: boolean;
}

const DEFAULT_OPTIONS: Required<SessionMemoryOptions> = {
  maxInvocations: 10,
  includeTimestamps: true,
  includeCoherence: true,
  includeCloudMetadata: true
};

/**
 * Builds a human-readable summary of recent invocations from SessionState.
 * Used to populate CloudMemory.sessionMemory before sending to Temple.
 *
 * Returns a plain-text summary that captures:
 * - Recent invocation context (prompt/reply pairs)
 * - Persona mode
 * - Coherence metrics (if available)
 * - Cloud metadata (if available)
 *
 * The output is intentionally simple and readable, suitable for
 * inclusion in LLM context windows.
 */
export function buildSessionMemory(options?: SessionMemoryOptions): string {
  const opts = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const invocations = SessionState.invocations || [];

  if (invocations.length === 0) {
    return "[No invocations in current session]";
  }

  // Take the most recent N invocations
  const recent = invocations.slice(-opts.maxInvocations);

  const lines: string[] = [];
  lines.push("=== Session Memory ===");
  lines.push(`Total invocations: ${invocations.length}`);
  lines.push(`Showing last ${recent.length}:`);
  lines.push("");

  recent.forEach((record: InvocationRecord, index: number) => {
    const num = invocations.length - recent.length + index + 1;
    lines.push(`--- Invocation #${num} ---`);

    if (opts.includeTimestamps && record.timestamp) {
      lines.push(`Timestamp: ${record.timestamp}`);
    }

    lines.push(`Persona: ${(record.personaState as any)?.name || "default"}`);

    if (opts.includeCoherence && record.coherence != null) {
      lines.push(`Coherence: ${record.coherence.toFixed(2)}`);
    }

    if (opts.includeCloudMetadata) {
      if (record.cloudOnline != null) {
        lines.push(`Cloud: ${record.cloudOnline ? "online" : "offline"}`);
      }
      if (record.cloudModelName) {
        lines.push(`Model: ${record.cloudModelName}`);
      }
      if (record.cloudLatencyMs != null) {
        lines.push(`Latency: ${record.cloudLatencyMs}ms`);
      }
    }

    // Include truncated prompt/reply for context
    const promptPreview = truncate(record.prompt || "", 200);
    const replyPreview = truncate(record.output || "", 200);

    lines.push(`Prompt: ${promptPreview}`);
    lines.push(`Reply: ${replyPreview}`);
    lines.push("");
  });

  lines.push("=== End Session Memory ===");

  return lines.join("\n");
}

/**
 * Helper function to truncate long strings with ellipsis.
 */
function truncate(str: string, maxLen: number): string {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}
