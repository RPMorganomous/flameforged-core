import { cloudPost } from "./CloudRequest";
import type { GpuStatusResponse } from "@/modules/contracts/TempleGpuStatusContract";

export async function getCloudGpuStatus(): Promise<GpuStatusResponse> {
  const result = await cloudPost<GpuStatusResponse>("/gpu-status", {});

  if (!result.ok || !result.data) {
    return {
      success: false,
      gpuAvailable: false,
      error: result.error ?? "CLOUD_ERROR",
      latencyMs: result.latencyMs
    };
  }

  return {
    ...result.data,
    latencyMs: result.latencyMs
  };
}
