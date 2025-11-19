// CloudMemory Assembler — combines all memory builders into a single CloudMemory object
// Phase XI — M34

import type { CloudMemory, CloudMemoryOptions } from "./CloudMemoryModel";
import { createEmptyCloudMemory, redactCloudMemory, clampCloudMemory } from "./CloudMemoryModel";
import { buildSessionMemory, type SessionMemoryOptions } from "./SessionMemoryBuilder";
import { buildCodexMemory, type CodexMemoryOptions } from "./CodexMemoryBuilder";
import { buildPersonaMemory, type PersonaMemoryOptions } from "./PersonaMemoryBuilder";
import type { CodexEntry, CodexMetadata } from "@/modules/codex/codexTypes";
import type { DriftAnalysis } from "@/modules/persona/DriftModel";
import { SessionState } from "@/modules/sessions/SessionArchiver";

export interface CloudMemoryAssemblerOptions {
  sessionOptions?: SessionMemoryOptions;
  codexOptions?: CodexMemoryOptions;
  personaOptions?: PersonaMemoryOptions;
  cloudMemoryOptions?: CloudMemoryOptions;
  applyRedaction?: boolean;
  applyClamping?: boolean;
}

const DEFAULT_OPTIONS: Required<CloudMemoryAssemblerOptions> = {
  sessionOptions: {},
  codexOptions: {},
  personaOptions: {},
  cloudMemoryOptions: {},
  applyRedaction: true,
  applyClamping: true
};

/**
 * Assembles a complete CloudMemory object by orchestrating all memory builders.
 *
 * This is the primary entry point for creating CloudMemory before sending to Temple.
 * It:
 * 1. Calls each memory builder (session, codex, persona)
 * 2. Populates all 5 memory zones
 * 3. Captures lastInvocation context from SessionState
 * 4. Optionally applies redaction and clamping
 * 5. Returns a complete, ready-to-send CloudMemory object
 *
 * @param codexEntries - CodexEntry[] from CodexContext (or null)
 * @param codexMetadata - CodexMetadata from CodexContext (or null)
 * @param driftAnalysis - DriftAnalysis from DriftModel (or null)
 * @param options - Optional configuration for each builder and post-processing
 * @returns Complete CloudMemory object
 */
export function assembleCloudMemory(
  codexEntries: CodexEntry[] | null,
  codexMetadata: CodexMetadata | null,
  driftAnalysis: DriftAnalysis | null,
  options?: CloudMemoryAssemblerOptions
): CloudMemory {
  const opts = { ...DEFAULT_OPTIONS, ...(options || {}) };

  // Start with empty CloudMemory
  let memory = createEmptyCloudMemory();

  // Build session memory
  memory.sessionMemory = buildSessionMemory(opts.sessionOptions);

  // Build codex memory
  memory.codexMemory = buildCodexMemory(
    codexEntries,
    codexMetadata,
    opts.codexOptions
  );

  // Build persona memory
  memory.personaMemory = buildPersonaMemory(
    driftAnalysis,
    opts.personaOptions
  );

  // cloudStateDelta is initially empty (will be populated by Temple response)
  memory.cloudStateDelta = {};

  // localFocusMemory is currently a placeholder for future use
  memory.localFocusMemory = "";

  // Capture lastInvocation context
  memory.lastInvocation = buildLastInvocationContext();

  // Update timestamp
  memory.timestamp = new Date().toISOString();

  // Apply post-processing
  if (opts.applyRedaction) {
    memory = redactCloudMemory(memory);
  }

  if (opts.applyClamping) {
    memory = clampCloudMemory(memory, opts.cloudMemoryOptions);
  }

  return memory;
}

/**
 * Builds lastInvocation context object from SessionState.
 * Captures relevant metadata about the most recent invocation.
 */
function buildLastInvocationContext(): Record<string, any> {
  const invocations = SessionState.invocations;

  if (!invocations || invocations.length === 0) {
    return {
      exists: false,
      timestamp: null
    };
  }

  const last = invocations[invocations.length - 1];

  return {
    exists: true,
    timestamp: last.timestamp,
    coherence: last.coherence ?? null,
    cloudOnline: last.cloudOnline ?? null,
    cloudModelName: last.cloudModelName ?? null,
    cloudLatencyMs: last.cloudLatencyMs ?? null,
    cloudInvocationId: last.cloudInvocationId ?? null,
    adaptiveMode: last.adaptiveMode ?? null,
    adaptiveIntensity: last.adaptiveIntensity ?? null,
    driftSeverity: last.driftSeverity ?? null
  };
}
