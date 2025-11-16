export type RitualActionType =
  | "PREPARE_LINK"
  | "LOAD_CODEX"
  | "ALIGN_MEMORY"
  | "SIGNATURE_HANDSHAKE"
  | "FINALIZE";

export interface RitualAction {
  id: string;
  type: RitualActionType;
  payload?: any;
}
