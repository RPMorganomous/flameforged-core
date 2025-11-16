export interface GPUHandshakeResult {
  ok: boolean;
  endpoint: string;
  latencyMs: number;
  error?: string;
}
