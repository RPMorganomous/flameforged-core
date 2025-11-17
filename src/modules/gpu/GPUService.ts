import type { GPUHandshakeResult } from "./gpuTypes";
import { wait } from "@/utils/wait";
import { cloudPost } from "@/utils/cloudPost";
import type { GPUHandshakeRequest, GPUHandshakeResponse } from "@/modules/cloud";

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

export const performGpuHandshake = async (): Promise<GPUHandshakeResponse> => {
  // Placeholder endpoint — will be replaced in Phase V
  const path = "/gpu-handshake";

  const payload: GPUHandshakeRequest = {
    modelHint: "llama-3.1"
  };

  const res = await cloudPost(path, payload);

  // If cloudPost returned an error, convert to handshake failure structure
  if (!res || res.ok === false) {
    return {
      ok: false,
      model: "",
      endpoint: "",
      latencyMs: 0
    };
  }

  return res as GPUHandshakeResponse;
};
