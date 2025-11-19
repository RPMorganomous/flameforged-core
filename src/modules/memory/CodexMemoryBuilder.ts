// Codex Memory Builder for CloudMemory.codexMemory
// Phase XI — M32

import type { CodexEntry, CodexMetadata } from "@/modules/codex/codexTypes";

export interface CodexMemoryOptions {
  maxEntries?: number;
  includeMetadata?: boolean;
  includeTypes?: boolean;
  includeContent?: boolean;
  maxContentLength?: number;
}

const DEFAULT_OPTIONS: Required<CodexMemoryOptions> = {
  maxEntries: 20,
  includeMetadata: true,
  includeTypes: true,
  includeContent: true,
  maxContentLength: 100
};

/**
 * Builds a human-readable summary of codex entries for CloudMemory.codexMemory.
 *
 * Takes CodexEntry[] and CodexMetadata from CodexContext and produces a
 * plain-text summary suitable for inclusion in LLM context windows.
 *
 * Returns a formatted string capturing:
 * - Total entry count and type distribution
 * - Recent entries with id, type, and content preview
 * - Type-specific aggregation
 */
export function buildCodexMemory(
  entries: CodexEntry[] | null,
  metadata: CodexMetadata | null,
  options?: CodexMemoryOptions
): string {
  const opts = { ...DEFAULT_OPTIONS, ...(options || {}) };

  if (!entries || entries.length === 0) {
    return "[No codex entries loaded]";
  }

  const lines: string[] = [];
  lines.push("=== Codex Memory ===");

  // Include metadata summary
  if (opts.includeMetadata && metadata) {
    lines.push(`Total entries: ${metadata.totalEntries}`);

    if (opts.includeTypes && metadata.types) {
      lines.push("Entry types:");
      Object.entries(metadata.types).forEach(([type, count]) => {
        lines.push(`  - ${type}: ${count}`);
      });
    }
    lines.push("");
  }

  // Include recent entries
  const recent = entries.slice(-opts.maxEntries);
  lines.push(`Showing last ${recent.length} entries:`);
  lines.push("");

  recent.forEach((entry: CodexEntry, index: number) => {
    const num = entries.length - recent.length + index + 1;
    lines.push(`--- Entry #${num} ---`);
    lines.push(`ID: ${entry.id || "unknown"}`);
    lines.push(`Type: ${entry.type || "unknown"}`);

    if (opts.includeContent && entry.content) {
      const contentStr = stringifyContent(entry.content);
      const contentPreview = truncate(contentStr, opts.maxContentLength);
      lines.push(`Content: ${contentPreview}`);
    }

    lines.push("");
  });

  lines.push("=== End Codex Memory ===");

  return lines.join("\n");
}

/**
 * Converts codex entry content (any type) to a readable string.
 */
function stringifyContent(content: any): string {
  if (!content) return "";

  if (typeof content === "string") {
    return content;
  }

  if (typeof content === "object") {
    try {
      return JSON.stringify(content);
    } catch {
      return "[Complex object]";
    }
  }

  return String(content);
}

/**
 * Helper function to truncate long strings with ellipsis.
 */
function truncate(str: string, maxLen: number): string {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}
