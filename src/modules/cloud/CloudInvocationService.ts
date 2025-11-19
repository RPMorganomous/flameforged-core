import { cloudPost } from "./CloudRequest";
import type { CloudInvocationRequest, CloudInvocationResponse } from "@/modules/contracts/TempleInvokeContract";

export async function invokeThroughCloud(
  payload: CloudInvocationRequest
): Promise<CloudInvocationResponse | null> {
  const result = await cloudPost<CloudInvocationResponse>("/invoke", payload);

  if (!result.ok || !result.data) {
    console.error("❌ Cloud Invocation Error:", result.error);
    return {
      success: false,
      error: result.error ?? "UNKNOWN_ERROR",
      invocationId: null,
      replyText: null,
      modelName: null,
      latencyMs: result.latencyMs ?? 0,
      cloudStateDelta: null
    };
  }

  console.log("✅ Cloud Invocation Success:", result.data);

  return {
    ...result.data,
    latencyMs: result.latencyMs
  };
}
