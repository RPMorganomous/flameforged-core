import type {
  InvocationChainRequest
} from "@/modules/cloud";
import { buildAdaptiveReinforcement } from "@/modules/persona/AdaptivePromptEngine";
import { analyzeDrift } from "@/modules/persona/DriftModel";
import { loadAdaptiveSettings, applyAdaptiveSettings } from "./AdaptiveSettings";

interface AdaptiveConfigShape {
  enabled: boolean;
  strictThreshold: number; // driftSeverity >= threshold → strict mode
  intensity: number;       // 0–100 (future use)
  personalityLock: boolean; // M21: force strict mode every invocation
}

export const AdaptiveConfig: AdaptiveConfigShape = {
  enabled: true,
  strictThreshold: 50,
  intensity: 100,
  personalityLock: false
};

// M21: Load saved adaptive settings from localStorage
const saved = loadAdaptiveSettings();
if (saved) applyAdaptiveSettings(saved);

export interface BuiltPrompt {
  promptText: string;
  sections: {
    system: string;
    user: string;
    persona: string;
    codex: string;
    scroll: string;
    session: string;
  };
  adaptiveText?: string;
  adaptiveMode?: "gentle" | "strict";
}

export const buildPrompt = (
  req: InvocationChainRequest
): BuiltPrompt => {
  const system = `System:\n${req.systemPrompt}`;
  const user = `User:\n${req.userMessage}`;
  const persona = `Persona State:\n${JSON.stringify(req.personaState, null, 2)}`;
  const codex = `Codex Memory:\n${JSON.stringify(req.codexMeta, null, 2)}`;
  const scroll = `Scroll Cues:\n${JSON.stringify(req.scrollMeta, null, 2)}`;
  const session = `Session Context:\n${JSON.stringify(req.memoryContext, null, 2)}`;

  // ----- Adaptive Reinforcement Injection (Phase IX — M19) -----
  let adaptiveText = "";
  let adaptiveMode: "gentle" | "strict" = "gentle";

  if (AdaptiveConfig.enabled) {
    const drift = analyzeDrift();
    // M21: Personality Lock overrides drift-based mode selection
    adaptiveMode = AdaptiveConfig.personalityLock
      ? "strict"
      : drift.driftSeverity >= AdaptiveConfig.strictThreshold
        ? "strict"
        : "gentle";

    const reinforcement = buildAdaptiveReinforcement(adaptiveMode);

    // Prevent runaway loops by ensuring the reinforcement does NOT include restricted markers
    if (reinforcement.reinforcementText && reinforcement.reinforcementText.length > 0) {
      adaptiveText = `\n\n### Adaptive Reinforcement:\n${reinforcement.reinforcementText}\n\n`;
    }
  }
  // -------------------------------------------------------------

  const finalText = [
    adaptiveText,
    system,
    user,
    persona,
    codex,
    scroll,
    session
  ].join("\n\n---\n\n");

  return {
    promptText: finalText,
    sections: {
      system,
      user,
      persona,
      codex,
      scroll,
      session
    },
    adaptiveText,
    adaptiveMode
  };
};
