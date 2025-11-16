export interface SystemStatus {
  invocation: boolean;
  codex: boolean;
  scrolls: boolean;
  sessions: boolean;
  persona: boolean;
  gpu: boolean;
  lambda: boolean;
}

export const defaultSystemStatus: SystemStatus = {
  invocation: true,
  codex: true,
  scrolls: true,
  sessions: true,
  persona: true,
  gpu: true,
  lambda: true
};
