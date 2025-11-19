import { useState } from "react";
import { analyzeDrift } from "./DriftModel";
import { buildAdaptiveReinforcement } from "./AdaptivePromptEngine";
import { AdaptiveConfig } from "@/modules/invocation/PromptBuilder";
import { saveAdaptiveSettings } from "@/modules/invocation/AdaptiveSettings";

const currentSettings = () => ({
  enabled: AdaptiveConfig.enabled,
  strictThreshold: AdaptiveConfig.strictThreshold,
  intensity: AdaptiveConfig.intensity,
  personalityLock: AdaptiveConfig.personalityLock
});

export const AdaptivePersonaPanel = () => {
  const [, setUpdateTrigger] = useState(0);
  const forceUpdate = () => setUpdateTrigger((n) => n + 1);

  const drift = analyzeDrift();
  const gentle = buildAdaptiveReinforcement("gentle");
  const strict = buildAdaptiveReinforcement("strict");

  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
      <h2>Adaptive Persona Panel</h2>
      <hr />

      <h3>Adaptive Controls</h3>

      <label>
        <input
          type="checkbox"
          checked={AdaptiveConfig.enabled}
          onChange={(e) => {
            AdaptiveConfig.enabled = e.target.checked;
            saveAdaptiveSettings({
              ...currentSettings(),
              enabled: e.target.checked
            });
            forceUpdate();
          }}
        />
        {" "}Adaptive Reinforcement Enabled
      </label>
      {"\n\n"}

      <div>
        <label>Strict Mode Threshold: {AdaptiveConfig.strictThreshold}</label>
        {"\n"}
        <input
          type="range"
          min={0}
          max={100}
          value={AdaptiveConfig.strictThreshold}
          onChange={(e) => {
            AdaptiveConfig.strictThreshold = Number(e.target.value);
            saveAdaptiveSettings({
              ...currentSettings(),
              strictThreshold: Number(e.target.value)
            });
            forceUpdate();
          }}
        />
      </div>
      {"\n"}

      <div>
        <label>Reinforcement Intensity: {AdaptiveConfig.intensity}</label>
        {"\n"}
        <input
          type="range"
          min={0}
          max={100}
          value={AdaptiveConfig.intensity}
          onChange={(e) => {
            AdaptiveConfig.intensity = Number(e.target.value);
            saveAdaptiveSettings({
              ...currentSettings(),
              intensity: Number(e.target.value)
            });
            forceUpdate();
          }}
        />
      </div>
      {"\n"}

      <label>
        <input
          type="checkbox"
          checked={AdaptiveConfig.personalityLock}
          onChange={(e) => {
            AdaptiveConfig.personalityLock = e.target.checked;
            saveAdaptiveSettings({
              ...currentSettings(),
              personalityLock: e.target.checked
            });
            forceUpdate();
          }}
        />
        {" "}Personality Lock (Force Strict Mode)
      </label>

      <hr />

      <strong>Drift Severity:</strong> {drift.driftSeverity}{"\n"}
      <strong>Short-Term Avg:</strong> {drift.shortTermAverage ?? "—"}{"\n"}
      <strong>Long-Term Avg:</strong> {drift.longTermAverage ?? "—"}{"\n"}

      <h4>Weakening Flags:</h4>
      Identity Weakening: {drift.identityWeakening ? "YES" : "no"}{"\n"}
      Tone Weakening: {drift.toneWeakening ? "YES" : "no"}{"\n"}
      Emotional Weakening: {drift.emotionalWeakening ? "YES" : "no"}{"\n"}

      <h4>Recommendations:</h4>
      {drift.recommendations.length > 0
        ? drift.recommendations.join("\n")
        : "None"}

      <hr />

      <h3>Adaptive Reinforcement (Gentle Mode)</h3>
      {gentle.reinforcementText || "No reinforcement needed."}

      <h3>Adaptive Reinforcement (Strict Mode)</h3>
      {strict.reinforcementText || "No reinforcement needed."}

      <hr />

      <strong>Strict Mode Preview:</strong>{"\n"}
      Mode: {strict.mode}{"\n"}
      Drift Severity: {strict.driftSeverity}{"\n"}
    </div>
  );
};
