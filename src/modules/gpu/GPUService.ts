import type { GPUHandshakeResult } from "./gpuTypes";
import { wait } from "@/utils/wait";

export const performHandshake = async (): Promise<GPUHandshakeResult> => {
  const start = performance.now();

  // Simulated delay
  await wait(150);

  const latency = Math.round(performance.now() - start);

  console.log("[GPU] Handshake simulated. Latency:", latency);

  return {
    ok: true,
    endpoint: "lambda://placeholder-endpoint",
    latencyMs: latency
  };
};
