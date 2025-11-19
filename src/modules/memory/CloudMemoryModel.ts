// Canonical Cloud Memory model for FlameForged Core
// Phase XI — M30

export type CloudMemoryZoneName =
  | "sessionMemory"
  | "codexMemory"
  | "personaMemory"
  | "cloudStateDelta"
  | "localFocusMemory";

export interface CloudMemory {
  sessionMemory: string;
  codexMemory: string;
  personaMemory: string;
  cloudStateDelta: Record<string, any>;
  localFocusMemory: string;
  lastInvocation: Record<string, any>;
  timestamp: string; // ISO 8601
}

export interface CloudMemoryOptions {
  maxSessionChars?: number;
  maxCodexChars?: number;
  maxPersonaChars?: number;
  maxLocalFocusChars?: number;
}

const DEFAULT_OPTIONS: Required<CloudMemoryOptions> = {
  maxSessionChars: 4000,
  maxCodexChars: 4000,
  maxPersonaChars: 4000,
  maxLocalFocusChars: 4000
};

/**
 * Creates a new, empty CloudMemory object.
 */
export function createEmptyCloudMemory(): CloudMemory {
  const now = new Date().toISOString();
  return {
    sessionMemory: "",
    codexMemory: "",
    personaMemory: "",
    cloudStateDelta: {},
    localFocusMemory: "",
    lastInvocation: {},
    timestamp: now
  };
}

/**
 * Applies simple redaction rules to a CloudMemory instance.
 * This is a placeholder for later, more advanced filters.
 */
export function redactCloudMemory(memory: CloudMemory): CloudMemory {
  // For now, we only enforce that no raw secure tokens or obvious secrets
  // are allowed. Later milestones may extend these rules.
  const sanitize = (value: string): string => {
    // Very conservative placeholder logic; intentionally simple.
    if (!value) return "";

    // Strip obvious token-like substrings (very shallow, non-regex for safety).
    const lowered = value.toLowerCase();
    if (lowered.includes("api_key") || lowered.includes("bearer ")) {
      return "[REDACTED]";
    }
    return value;
  };

  return {
    ...memory,
    sessionMemory: sanitize(memory.sessionMemory),
    codexMemory: sanitize(memory.codexMemory),
    personaMemory: sanitize(memory.personaMemory),
    localFocusMemory: sanitize(memory.localFocusMemory)
    // cloudStateDelta and lastInvocation remain as-is for now; structured
    // redaction will be applied in later milestones.
  };
}

/**
 * Ensures that text fields in CloudMemory obey maximum length constraints.
 * Longer strings are truncated from the front, preserving the most recent
 * content at the end.
 */
export function clampCloudMemory(
  memory: CloudMemory,
  options?: CloudMemoryOptions
): CloudMemory {
  const opts = { ...DEFAULT_OPTIONS, ...(options || {}) };

  const clamp = (value: string, max: number): string => {
    if (!value) return "";
    if (value.length <= max) return value;
    return value.slice(value.length - max);
  };

  return {
    ...memory,
    sessionMemory: clamp(memory.sessionMemory, opts.maxSessionChars),
    codexMemory: clamp(memory.codexMemory, opts.maxCodexChars),
    personaMemory: clamp(memory.personaMemory, opts.maxPersonaChars),
    localFocusMemory: clamp(memory.localFocusMemory, opts.maxLocalFocusChars)
  };
}

/**
 * Utility to clone and normalize a CloudMemory object, ensuring
 * all required fields exist and have safe defaults.
 */
export function normalizeCloudMemory(partial: Partial<CloudMemory> | null | undefined): CloudMemory {
  if (!partial) {
    return createEmptyCloudMemory();
  }

  const now = new Date().toISOString();

  return {
    sessionMemory: partial.sessionMemory ?? "",
    codexMemory: partial.codexMemory ?? "",
    personaMemory: partial.personaMemory ?? "",
    cloudStateDelta: partial.cloudStateDelta ?? {},
    localFocusMemory: partial.localFocusMemory ?? "",
    lastInvocation: partial.lastInvocation ?? {},
    timestamp: partial.timestamp ?? now
  };
}
