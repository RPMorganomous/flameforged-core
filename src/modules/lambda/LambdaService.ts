import type { LambdaResponse } from "./lambdaTypes";
import { wait } from "@/utils/wait";
import { log } from "@/utils/log";
import { cloudPost } from "@/utils/cloudPost";

export const lambdaValidateCodex = async (): Promise<LambdaResponse<string>> => {
  await wait(120);
  log("[Lambda] validateCodex (mock)");
  return { ok: true, data: "Codex OK (mock)" };
};

export const lambdaSummarizeCodex = async (): Promise<LambdaResponse<string>> => {
  await wait(140);
  log("[Lambda] summarizeCodex (mock)");
  return { ok: true, data: "Summary (mock)" };
};

export const lambdaExtractScroll = async (): Promise<LambdaResponse<string>> => {
  await wait(130);
  log("[Lambda] extractScroll (mock)");
  return { ok: true, data: "Scroll parsed (mock)" };
};

export const lambdaGPUHandshake = async (): Promise<LambdaResponse<string>> => {
  await wait(110);
  log("[Lambda] gpuHandshake (mock)");
  return { ok: true, data: "GPU Ready (mock)" };
};
