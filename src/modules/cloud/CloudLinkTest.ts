import { cloudPost } from "@/utils/cloudPost";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

export interface CloudLinkTestResult {
  ok: boolean;
  status: number;
  latencyMs: number | null;
  message: string;
}

export const runCloudLinkTest = async (): Promise<CloudLinkTestResult> => {
  const start = performance.now();

  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      status: 0,
      latencyMs: null,
      message: "CloudConfig.baseUrl is not set."
    };
  }

  try {
    const res: any = await cloudPost("/health", { ping: "flameforged" });
    const end = performance.now();

    if (!res || res.ok === false) {
      return {
        ok: false,
        status: res?.status ?? 0,
        latencyMs: end - start,
        message: "Cloud link test failed."
      };
    }

    return {
      ok: true,
      status: res.status ?? 200,
      latencyMs: end - start,
      message: "Cloud link test succeeded."
    };
  } catch (error) {
    const end = performance.now();
    return {
      ok: false,
      status: 0,
      latencyMs: end - start,
      message: "Cloud link test error."
    };
  }
};
