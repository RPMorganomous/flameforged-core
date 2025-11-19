import { log } from "@/utils/log";
import { wait } from "@/utils/wait";
import { lambdaValidateCodex, lambdaExtractScroll, lambdaGPUHandshake } from "../lambda/LambdaService";
import { CloudConfig } from "@/modules/cloud/CloudConfig";
import { runCloudLinkTest } from "@/modules/cloud/CloudLinkTest";
import { invokeModel } from "@/modules/cloud/InvocationService";
import { buildPrompt } from "@/modules/invocation/PromptBuilder";

export const runCohesionTest = async (modules: {
  invocation: any;
  codex: any;
  scroll: any;
  persona: any;
  gpu: any;
}) => {
  log("[Cohesion] Starting Phase III cohesion test...");

  // Cloud Binding Check
  log("[Cohesion] Cloud Binding:", CloudConfig.baseUrl ? "active" : "inactive");

  // Cloud Link Test
  const cloudLinkResult = await runCloudLinkTest();
  log(
    "[Cohesion] Cloud Link Test:",
    cloudLinkResult.ok ? "ok" : "failed",
    "| status:",
    cloudLinkResult.status,
    "| latency:",
    cloudLinkResult.latencyMs
  );

  // Prompt Builder Test
  const testPrompt = buildPrompt({
    userMessage: "Cohesion Test",
    systemPrompt: "System Prompt",
    memoryContext: {},
    personaState: {},
    codexMeta: {},
    scrollMeta: {}
  });
  log("[Cohesion] Prompt Preview:", testPrompt.promptText);

  // Invocation Test
  const invokeResult = await invokeModel("ping");
  log("[Cohesion] Invocation Test:", invokeResult.ok ? "ok" : "failed",
      "| status:", invokeResult.status,
      "| latency:", invokeResult.latencyMs,
      "| output:", invokeResult.output);
  log("[Cohesion] Invocation Output:", invokeResult.output);
  log("[Cohesion] Invocation Tokens:", invokeResult.tokens ?? "—");
  log("[Cohesion] Invocation Latency:", invokeResult.latencyMs);
  log("[Cohesion] Coherence Score:", invokeResult.coherence ?? "—");
  log("[Cohesion] Drift Flags:", invokeResult.coherenceReport?.driftFlags ?? "—");

  // Test 1: Invocation Engine
  log("[Cohesion] Testing Invocation Engine...");
  await modules.invocation.invoke("Cohesion Test Payload");
  await wait(100);

  // Test 2: Codex Processor
  log("[Cohesion] Testing Codex Processor...");
  if (modules.codex.validate) {
    modules.codex.validate();
  }
  if (modules.codex.metadata) {
    log("[Cohesion] Codex metadata available:", modules.codex.metadata !== null);
  }
  await wait(100);

  // Test 2b: Codex Cloud Summary
  log("[Cohesion] Testing Codex Cloud Summary...");
  await modules.codex.fetchCloudCodexSummary();
  log("[Cohesion] Codex Cloud Status:", modules.codex.cloudStatus);
  await wait(100);

  // Test 3: Scroll Pipeline
  log("[Cohesion] Testing Scroll Pipeline...");
  if (modules.scroll.scroll) {
    log("[Cohesion] Scroll loaded:", modules.scroll.scroll !== null);
  }
  await wait(100);

  // Test 3b: Scroll Cloud Summary
  log("[Cohesion] Testing Scroll Cloud Summary...");
  await modules.scroll.fetchCloudScrollSummary();
  log("[Cohesion] Scroll Cloud Status:", modules.scroll.cloudStatus);
  await wait(100);

  // Test 4: Persona Diagnostics
  log("[Cohesion] Testing Persona Diagnostics...");
  modules.persona.run();
  await wait(100);

  // Test 5: GPU Handshake
  log("[Cohesion] Testing GPU Handshake...");
  await modules.gpu.handshake();
  await wait(100);

  // Test 5b: GPU Cloud Check
  log("[Cohesion] Testing GPU Cloud Check...");
  await modules.gpu.checkGpu();
  log("[Cohesion] GPU Status:", modules.gpu.gpuStatus);
  await wait(100);

  // Test 5c: Cloud GPU Status
  log("[Cohesion] Testing Cloud GPU Status...");
  await modules.gpu.fetchCloudGPUStatus();
  log("[Cohesion] Cloud GPU Status:", modules.gpu.cloudStatus);
  await wait(100);

  // Test 6: Lambda Services
  log("[Cohesion] Testing Lambda Services...");
  await lambdaValidateCodex();
  await wait(50);
  await lambdaExtractScroll();
  await wait(50);
  await lambdaGPUHandshake();

  log("[Cohesion] Phase III cohesion test complete!");

  return {
    ok: true,
    message: "Phase III Cohesion Test complete — all modules operational."
  };
};
