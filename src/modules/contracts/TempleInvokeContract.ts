import type { CloudMemory } from "@/modules/memory";

export interface CloudInvocationRequest {
  meta: any;           // PromptBuilder will assemble this
  persona: string;
  invocationKind: string;
  messages: { role: string; content: string }[];
  memory?: CloudMemory | null;  // Phase XI M35: CloudMemory object
}

export interface CloudInvocationResponse {
  success: boolean;
  error?: string | null;
  invocationId: string | null;
  replyText: string | null;
  modelName: string | null;
  latencyMs: number;
  cloudStateDelta: any | null;
  memoryDelta?: any | null;     // Phase XI M35: Memory updates from Temple
}
