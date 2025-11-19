import { cloudPost } from "./CloudRequest";
import type { ScrollSummaryRequest, ScrollSummaryResponse } from "@/modules/contracts/TempleScrollSummaryContract";

export async function getCloudScrollSummary(
  req: ScrollSummaryRequest
): Promise<ScrollSummaryResponse> {
  const result = await cloudPost<ScrollSummaryResponse>("/scroll-summary", req);

  if (!result.ok || !result.data) {
    return {
      success: false,
      error: result.error ?? "CLOUD_ERROR",
      summaries: [],
      aggregateSummaryText: "",
      latencyMs: result.latencyMs
    };
  }

  console.log("🔥 Scroll Summary Response:", result.data);

  return {
    ...result.data,
    latencyMs: result.latencyMs
  };
}
