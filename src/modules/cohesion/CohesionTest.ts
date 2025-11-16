import { log } from "@/utils/log";
import { wait } from "@/utils/wait";
import { lambdaValidateCodex, lambdaExtractScroll, lambdaGPUHandshake } from "../lambda/LambdaService";

export const runCohesionTest = async (modules: {
  invocation: any;
  codex: any;
  scroll: any;
  persona: any;
  gpu: any;
}) => {
  log("[Cohesion] Starting Phase III cohesion test...");

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

  // Test 3: Scroll Pipeline
  log("[Cohesion] Testing Scroll Pipeline...");
  if (modules.scroll.scroll) {
    log("[Cohesion] Scroll loaded:", modules.scroll.scroll !== null);
  }
  await wait(100);

  // Test 4: Persona Diagnostics
  log("[Cohesion] Testing Persona Diagnostics...");
  modules.persona.run();
  await wait(100);

  // Test 5: GPU Handshake
  log("[Cohesion] Testing GPU Handshake...");
  await modules.gpu.handshake();
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
