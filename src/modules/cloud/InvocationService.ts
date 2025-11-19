import { CloudConfig } from "@/modules/cloud/CloudConfig";
import type { BuiltPrompt } from "@/modules/invocation/PromptBuilder";
import { AdaptiveConfig } from "@/modules/invocation/PromptBuilder";
import { archiveInvocation } from "@/modules/sessions/SessionArchiver";
import { analyzeResponse } from "@/modules/persona/ResponseAnalyzer";
import { analyzeDrift } from "@/modules/persona/DriftModel";
import { buildAdaptiveReinforcement } from "@/modules/persona/AdaptivePromptEngine";
import { invokeThroughCloud } from "./CloudInvocationService";
import { assembleCloudMemory } from "@/modules/memory/CloudMemoryAssembler";
import { CloudMemoryStore } from "@/modules/memory/CloudMemoryStore";

// Temporary persona config - will be replaced with full PersonaConfig in future phase
const PersonaConfig = {
  activePersona: "default"
};

export interface InvocationResult {
  ok: boolean;
  status: number;
  latencyMs: number | null;
  output: string | null;
  message: string;
  tokens?: number | null;
  coherence?: number | null;
  coherenceReport?: any | null;
  modelName?: string | null;
  cloudOnline?: boolean;
}

const buildClientMeta = () => ({
  timestamp: Date.now(),
  clientVersion: "1.0.0",
  platform: "web"
});

export const invokeModel = async (input: string | BuiltPrompt): Promise<InvocationResult> => {
  const start = performance.now();

  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      status: 0,
      latencyMs: null,
      output: null,
      message: "CloudConfig.baseUrl is not set.",
      tokens: null
    };
  }

  // Handle BuiltPrompt input
  const inputText = typeof input === "string" ? input : input.promptText;
  const adaptiveText = typeof input === "string" ? "" : (input.adaptiveText || "");
  const adaptiveMode = typeof input === "string" ? null : (input.adaptiveMode || null);

  // M20: Extract drift and reinforcement data for archival
  const drift = analyzeDrift();
  const reinforcement = buildAdaptiveReinforcement(adaptiveMode === "strict" ? "strict" : "gentle");
  const adaptiveIntensity = AdaptiveConfig.intensity;

  // M36: Assemble CloudMemory for this invocation
  // Note: codexEntries and codexMetadata are null for now - will be integrated when CodexContext is available
  const cloudMemory = assembleCloudMemory(
    null, // codexEntries - will come from CodexContext in future
    null, // codexMetadata - will come from CodexContext in future
    drift // driftAnalysis from analyzeDrift()
  );

  // Build payload for Temple invocation
  const cloudPayload = {
    meta: buildClientMeta(),
    persona: PersonaConfig.activePersona || "default",
    invocationKind: "chat",
    messages: [{ role: "user", content: inputText }],
    memory: cloudMemory // M36: Include CloudMemory in payload
  };

  try {
    const cloudResponse = await invokeThroughCloud(cloudPayload);
    const end = performance.now();

    if (!cloudResponse || !cloudResponse.success) {
      const result = {
        ok: false,
        status: 0,
        latencyMs: cloudResponse?.latencyMs ?? (end - start),
        output: null,
        message: "Cloud invocation failed.",
        tokens: null,
        cloudOnline: false,
        modelName: null
      };

      archiveInvocation({
        timestamp: Date.now(),
        prompt: inputText,
        output: null,
        latencyMs: cloudResponse?.latencyMs ?? (end - start),
        status: 0,
        tokens: null,
        personaState: {},
        codexMeta: {},
        scrollMeta: {},
        memoryContext: {},
        cloudBaseUrl: CloudConfig.baseUrl,
        coherence: null,
        coherenceReport: null,
        driftSeverity: drift?.driftSeverity ?? null,
        driftRecommendations: drift?.recommendations ?? null,
        adaptiveReinforcement: null,
        adaptiveMode: null,
        adaptiveIntensity: adaptiveIntensity,
        reinforcementRecommendations: reinforcement?.recommendations ?? null,
        cloudOnline: false,
        latency: cloudResponse?.latencyMs ?? (end - start),
        modelName: null,
        cloudInvocationId: null,
        cloudModelName: null,
        cloudLatencyMs: cloudResponse?.latencyMs ?? (end - start),
        cloudStateDelta: null
      });

      return result;
    }

    const normalizedOutput = cloudResponse.replyText ?? "";

    // M36: Apply memoryDelta from Temple response to CloudMemoryStore
    if (cloudResponse.memoryDelta) {
      CloudMemoryStore.applyDelta(cloudResponse.memoryDelta);
    }

    const coherenceReport = analyzeResponse(inputText, normalizedOutput);
    const coherence = coherenceReport.coherenceScore;

    const result = {
      ok: true,
      status: 200,
      latencyMs: cloudResponse.latencyMs,
      output: normalizedOutput,
      message: "Invocation succeeded.",
      tokens: null,
      coherence,
      coherenceReport,
      cloudOnline: true,
      modelName: cloudResponse.modelName
    };

    archiveInvocation({
      timestamp: Date.now(),
      prompt: inputText,
      output: normalizedOutput,
      latencyMs: cloudResponse.latencyMs,
      status: 200,
      tokens: null,
      personaState: {},
      codexMeta: {},
      scrollMeta: {},
      memoryContext: {},
      cloudBaseUrl: CloudConfig.baseUrl,
      coherence,
      coherenceReport,
      driftSeverity: drift?.driftSeverity ?? null,
      driftRecommendations: drift?.recommendations ?? null,
      adaptiveReinforcement: adaptiveText || null,
      adaptiveMode: adaptiveMode,
      adaptiveIntensity: adaptiveIntensity,
      reinforcementRecommendations: reinforcement?.recommendations ?? null,
      cloudOnline: true,
      latency: cloudResponse.latencyMs,
      modelName: cloudResponse.modelName,
      cloudInvocationId: cloudResponse.invocationId ?? null,
      cloudModelName: cloudResponse.modelName ?? null,
      cloudLatencyMs: cloudResponse.latencyMs ?? null,
      cloudStateDelta: cloudResponse.cloudStateDelta ?? null
    });

    return result;
  } catch (err) {
    // Retry ONCE
    try {
      const retryResponse = await invokeThroughCloud(cloudPayload);
      const end = performance.now();

      if (!retryResponse || !retryResponse.success) {
        const result = {
          ok: false,
          status: 0,
          latencyMs: retryResponse?.latencyMs ?? (end - start),
          output: null,
          message: "Invocation failed after retry.",
          tokens: null,
          cloudOnline: false,
          modelName: null
        };

        archiveInvocation({
          timestamp: Date.now(),
          prompt: inputText,
          output: null,
          latencyMs: retryResponse?.latencyMs ?? (end - start),
          status: 0,
          tokens: null,
          personaState: {},
          codexMeta: {},
          scrollMeta: {},
          memoryContext: {},
          cloudBaseUrl: CloudConfig.baseUrl,
          coherence: null,
          coherenceReport: null,
          driftSeverity: drift?.driftSeverity ?? null,
          driftRecommendations: drift?.recommendations ?? null,
          adaptiveReinforcement: null,
          adaptiveMode: null,
          adaptiveIntensity: adaptiveIntensity,
          reinforcementRecommendations: reinforcement?.recommendations ?? null,
          cloudOnline: false,
          latency: retryResponse?.latencyMs ?? (end - start),
          modelName: null,
          cloudInvocationId: null,
          cloudModelName: null,
          cloudLatencyMs: retryResponse?.latencyMs ?? (end - start),
          cloudStateDelta: null
        });

        return result;
      }

      const normalizedOutput = retryResponse.replyText ?? "";

      // M36: Apply memoryDelta from Temple response to CloudMemoryStore
      if (retryResponse.memoryDelta) {
        CloudMemoryStore.applyDelta(retryResponse.memoryDelta);
      }

      const coherenceReport = analyzeResponse(inputText, normalizedOutput);
      const coherence = coherenceReport.coherenceScore;

      const result = {
        ok: true,
        status: 200,
        latencyMs: retryResponse.latencyMs,
        output: normalizedOutput,
        message: "Invocation succeeded (retry).",
        tokens: null,
        coherence,
        coherenceReport,
        cloudOnline: true,
        modelName: retryResponse.modelName
      };

      archiveInvocation({
        timestamp: Date.now(),
        prompt: inputText,
        output: normalizedOutput,
        latencyMs: retryResponse.latencyMs,
        status: 200,
        tokens: null,
        personaState: {},
        codexMeta: {},
        scrollMeta: {},
        memoryContext: {},
        cloudBaseUrl: CloudConfig.baseUrl,
        coherence,
        coherenceReport,
        driftSeverity: drift?.driftSeverity ?? null,
        driftRecommendations: drift?.recommendations ?? null,
        adaptiveReinforcement: adaptiveText || null,
        adaptiveMode: adaptiveMode,
        adaptiveIntensity: adaptiveIntensity,
        reinforcementRecommendations: reinforcement?.recommendations ?? null,
        cloudOnline: true,
        latency: retryResponse.latencyMs,
        modelName: retryResponse.modelName,
        cloudInvocationId: retryResponse.invocationId ?? null,
        cloudModelName: retryResponse.modelName ?? null,
        cloudLatencyMs: retryResponse.latencyMs ?? null,
        cloudStateDelta: retryResponse.cloudStateDelta ?? null
      });

      return result;
    } catch (retryErr) {
      const end = performance.now();
      const result = {
        ok: false,
        status: 0,
        latencyMs: end - start,
        output: null,
        message: "Invocation error after retry.",
        tokens: null,
        cloudOnline: false,
        modelName: null
      };

      archiveInvocation({
        timestamp: Date.now(),
        prompt: inputText,
        output: null,
        latencyMs: end - start,
        status: 0,
        tokens: null,
        personaState: {},
        codexMeta: {},
        scrollMeta: {},
        memoryContext: {},
        cloudBaseUrl: CloudConfig.baseUrl,
        coherence: null,
        coherenceReport: null,
        driftSeverity: drift?.driftSeverity ?? null,
        driftRecommendations: drift?.recommendations ?? null,
        adaptiveReinforcement: null,
        adaptiveMode: null,
        adaptiveIntensity: adaptiveIntensity,
        reinforcementRecommendations: reinforcement?.recommendations ?? null,
        cloudOnline: false,
        latency: end - start,
        modelName: null,
        cloudInvocationId: null,
        cloudModelName: null,
        cloudLatencyMs: end - start,
        cloudStateDelta: null
      });

      return result;
    }
  }
};
