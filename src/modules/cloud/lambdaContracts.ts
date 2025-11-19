// Invocation chain request/response
export interface InvocationChainRequest {
  userMessage: string;
  systemPrompt: string;
  memoryContext: any;
  codexMeta: any;
  scrollMeta: any;
  personaState: any;
}

export interface InvocationChainResponse {
  ok: boolean;
  output: string;
  latencyMs: number;
  model: string;
}

// Codex summary request/response
export interface CodexSummaryRequest {
  codex: any;
}

export interface CodexSummaryResponse {
  ok: boolean;
  summary: string;
  tags: string[];
  warnings: string[];
}

// Scroll analysis request/response
export interface ScrollAnalysisRequest {
  scroll: any;
}

export interface ScrollAnalysisResponse {
  ok: boolean;
  title: string;
  sections: string[];
  summary: string;
  tags: string[];
}

// Persona diagnostic request/response
export interface PersonaDiagnosticRequest {
  personaState: any;
  systemContext: any;
}

export interface PersonaDiagnosticResponse {
  ok: boolean;
  tone: string;
  memorySignature: string;
  identityStatus: "intact" | "drifting" | "error";
  details?: string;
}

// GPU handshake request/response
export interface GPUHandshakeRequest {
  modelHint?: string;
}

export interface GPUHandshakeResponse {
  ok: boolean;
  model: string;
  endpoint: string;
  latencyMs: number;
}

// GPU status request/response
export interface GPUStatusResponse {
  ok: boolean;
  status: "online" | "offline";
  model: string | null;
  endpoint: string | null;
  latency: number | null;
}
