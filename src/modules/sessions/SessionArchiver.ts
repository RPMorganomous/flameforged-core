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
    ...record
  };

  SessionState.invocations.push(fullRecord);
};

export const getSession = (): SessionLog | null => currentSession;
