import type { CloudError } from "@/modules/cloud/cloudTypes";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

export const cloudPost = async (path: string, payload: any): Promise<any | CloudError> => {
  // Check if baseUrl is configured
  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      error: "CloudConfig.baseUrl is not set.",
      status: 0,
      data: null
    };
  }

  const fullUrl = CloudConfig.baseUrl + path;
  const start = performance.now();

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const latency = Math.round(performance.now() - start);

    return {
      ok: res.ok,
      status: res.status,
      data: await res.json().catch(() => null)
    };

  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      message: "Network unreachable"
    };
  }
};
