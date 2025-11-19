import { cloudPost } from "@/utils/cloudPost";
import type { GPUStatusResponse } from "@/modules/cloud";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

export const requestCloudGPUStatus = async (): Promise<GPUStatusResponse> => {
  // Check if CloudConfig.baseUrl is set
  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      status: "offline",
      model: null,
      endpoint: null,
      latency: null
    };
  }

  const path = "/gpu-status";

  const res = await cloudPost(path, {});

  if (!res || res.ok === false) {
    return {
      ok: false,
      status: "offline",
      model: null,
      endpoint: null,
      latency: null
    };
  }

  return res as GPUStatusResponse;
};
