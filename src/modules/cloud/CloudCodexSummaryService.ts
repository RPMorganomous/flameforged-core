import { cloudPost } from "./CloudRequest";
import type { CodexSummaryRequest, CodexSummaryResponse } from "@/modules/contracts/TempleCodexSummaryContract";

export async function getCloudCodexSummary(
  req: CodexSummaryRequest
): Promise<CodexSummaryResponse> {
  const result = await cloudPost<CodexSummaryResponse>("/codex-summary", req);

  if (!result.ok || !result.data) {
    return {
      success: false,
      error: result.error ?? "CLOUD_ERROR",
      codexRegionId: req.codexRegionId,
      summaryText: "",
      latencyMs: result.latencyMs
    };
  }

  console.log("🔥 Codex Summary Response:", result.data);

  return {
    ...result.data,
    latencyMs: result.latencyMs
  };
}
