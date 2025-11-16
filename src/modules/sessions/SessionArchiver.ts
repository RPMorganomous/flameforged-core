import type { SessionRecord, SessionLog } from "./sessionTypes";
import { log } from "@/utils/log";

let currentSession: SessionLog | null = null;

export const startNewSession = (): SessionLog => {
  const id = new Date().toISOString().replace(/[:.]/g, "-");
  currentSession = { id, records: [] };

  log("[Session] Started:", id);
  return currentSession;
};

export const appendRecord = (record: SessionRecord): void => {
  if (!currentSession) startNewSession();
  currentSession!.records.push(record);

  log("[Session] Record appended:", record);
};

export const getSession = (): SessionLog | null => currentSession;
