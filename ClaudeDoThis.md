# Phase XI — M30: Cloud Memory JSON Model
**Assigned to Claude Sonnet**  
**Date:** 2025-11-19  
**Status:** 🚧 READY FOR EXECUTION  
**Phase:** Cloud Memory & Frame Sync Layer — Step 1 of Phase XI

This milestone defines the **canonical Cloud Memory Object** used by both the local Forge and the Temple Lambda.
It does NOT wire anything into the invocation pipeline yet. This is a pure **model + helpers** milestone.

Modify ONLY the files listed.  
Report ALL changes when finished.  
Do NOT add additional files unless explicitly requested.

---

# 🎯 Objective

Create a single source of truth for the Cloud Memory model that:

- Defines memory zones and the CloudMemory shape
- Provides a factory for an empty CloudMemory object
- Provides basic redaction + size limiting helpers
- Is safe to import from both UI and service code
- Does NOT depend on React or browser APIs

This will be used by later milestones (M31–M33, M36–M38).

---

# 📁 Part 1 — Create CloudMemoryModel.ts

**File:** `src/modules/memory/CloudMemoryModel.ts` (NEW FILE)

Create this file with the following content:

```ts
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
```

---

# 📁 Part 2 — Export from Memory Module Index (If Present)

If there is a memory module index file, add an export for the model.

**File (optional):** `src/modules/memory/index.ts`

If this file exists, add:

```ts
export * from "./CloudMemoryModel";
```

Do NOT create `index.ts` if it does not already exist.

---

# 📁 Part 3 — Add Cloud Memory Docs Stub (Optional)

**File:** `docs/cloud/CloudMemoryModel.md` (NEW FILE, only if `docs/cloud` directory already exists)

Create this file with a short stub description:

```md
# Cloud Memory Model (Phase XI — M30)

This document describes the canonical CloudMemory JSON structure used by both the local Forge and the Temple Lambda.

See `src/modules/memory/CloudMemoryModel.ts` for the authoritative TypeScript definition.
```

If the `docs/cloud` directory does not exist, skip this step.

---

# 📋 Validation Checklist

M30 is COMPLETE when:

- `src/modules/memory/CloudMemoryModel.ts` exists and compiles
- CloudMemory, CloudMemoryZoneName, and helper functions are exported
- The model has **no** React or browser-specific dependencies
- The codebase builds with 0 new TypeScript errors
- (Optional) Memory module index exports CloudMemoryModel
- (Optional) `docs/cloud/CloudMemoryModel.md` exists as a stub

---

# 📝 M30 Execution Report
Claude: Append your execution report BELOW this section.  
Do NOT modify ANYTHING above this line.
