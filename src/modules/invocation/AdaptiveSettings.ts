import { AdaptiveConfig } from "./PromptBuilder";

export interface SavedAdaptiveSettings {
  enabled: boolean;
  strictThreshold: number;
  intensity: number;
  personalityLock: boolean;
}

const KEY = "adaptive-settings";

export const loadAdaptiveSettings = (): SavedAdaptiveSettings | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveAdaptiveSettings = (settings: SavedAdaptiveSettings) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
};

export const applyAdaptiveSettings = (settings: SavedAdaptiveSettings) => {
  // Apply live to AdaptiveConfig
  AdaptiveConfig.enabled = settings.enabled;
  AdaptiveConfig.strictThreshold = settings.strictThreshold;
  AdaptiveConfig.intensity = settings.intensity;
  AdaptiveConfig.personalityLock = settings.personalityLock;
};
