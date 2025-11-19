// Phase VII: Persona Coherence (M13 Stub)
import type { CoherenceReport } from "@/modules/persona/PersonaMetrics";

import type { SessionRecord, SessionLog, InvocationRecord } from "./sessionTypes";
import { log } from "@/utils/log";
import { v4 as uuidv4 } from "uuid";

let currentSession: SessionLog | null = null;

export const SessionState = {
  invocations: [] as InvocationRecord[]
};

export const startNewSession = (): SessionLog => {
  const id = new Date().toISOString().replace(/[:.]/g, "-");
  currentSession = { id, records: [], invocations: [] };

  log("[Session] Started:", id);
  return currentSession;
};

export const appendRecord = (record: SessionRecord): void => {
  if (!currentSession) startNewSession();
  currentSession!.records.push(record);

  log("[Session] Record appended:", record);
};

export const archiveInvocation = (record: Omit<InvocationRecord, "id">) => {
  const fullRecord: InvocationRecord = {
    id: uuidv4(),
    ...record,
    coherence: record.coherence ?? null,
    coherenceReport: record.coherenceReport ?? null,
    driftSeverity: record.driftSeverity ?? null,
    driftRecommendations: record.driftRecommendations ?? null,
    adaptiveReinforcement: record.adaptiveReinforcement ?? null,
    adaptiveMode: record.adaptiveMode ?? null,
    adaptiveIntensity: record.adaptiveIntensity ?? null,
    reinforcementRecommendations: record.reinforcementRecommendations ?? null,
  };

  SessionState.invocations.push(fullRecord);
};

export const getSession = (): SessionLog | null => currentSession;

/**
 * Phase VII M13 Stub:
 *   CoherenceReport objects will be attached to invocation records in M14.
 *   No functional changes required in M13 — only the import stub above.
 */

/**
 * Phase VIII M16 Stub:
 *   DriftAnalysis will be attached to invocation records in M17.
 *   No functional behavior in M16 — only structural prep.
 */

/**
 * Phase VIII M17 Stub:
 *   Adaptive reinforcement values will be attached to invocation records in Phase IX.
 *   No functional adaptive wiring occurs in M17 — only structural prep.
 */

/**
 * Phase IX M19:
 *   Adaptive reinforcement is now actively injected into PromptBuilder.
 *   SessionArchiver captures adaptiveReinforcement and adaptiveMode from InvocationService.
 */

/**
 * Phase IX M20:
 *   Adaptive reinforcement history is now logged permanently.
 *   InvocationRecord includes:
 *     - adaptiveReinforcement
 *     - adaptiveMode
 *     - adaptiveIntensity
 *     - driftSeverity
 *     - reinforcementRecommendations
 *   These fields are displayed in Session Inspector and Adaptive Persona Panel.
 */
