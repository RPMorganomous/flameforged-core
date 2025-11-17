export interface SessionRecord {
  timestamp: string;
  action: string;
  payload?: any;
}

export interface InvocationRecord {
  id: string;              // uuid
  timestamp: number;       // Date.now()
  prompt: string;          // builtPrompt.promptText
  output: string | null;   // model output text
  latencyMs: number | null;
  status: number | null;
  tokens: number | null;
  personaState: any;
  codexMeta: any;
  scrollMeta: any;
  memoryContext: any;
  cloudBaseUrl: string | null;
}

export interface SessionLog {
  id: string;          // session id
  records: SessionRecord[];
  invocations: InvocationRecord[];
}
