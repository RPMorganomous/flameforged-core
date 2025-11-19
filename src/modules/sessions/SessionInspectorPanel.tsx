import { SessionState } from "./SessionArchiver";

export const SessionInspectorPanel = () => {
  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
      <h2>Session Invocation History</h2>
      <hr />

      {/* Cloud Metadata Section */}
      <div style={{ marginTop: "1rem", marginBottom: "2rem", padding: "0.5rem", borderTop: "1px solid #444", borderBottom: "1px solid #444" }}>
        <h4>Cloud Metadata (Last Invocation)</h4>
        <div><strong>Online:</strong> {SessionState.lastCloudOnline ? "Yes" : "No"}</div>
        <div><strong>Model:</strong> {SessionState.lastCloudModelName ?? "—"}</div>
        <div><strong>Latency:</strong> {SessionState.lastCloudLatencyMs ?? "—"} ms</div>
        <div><strong>Invocation ID:</strong> {SessionState.lastCloudInvocationId ?? "—"}</div>
        <div><strong>State Delta:</strong>
          <pre>{JSON.stringify(SessionState.lastCloudStateDelta, null, 2) || "—"}</pre>
        </div>
      </div>

      {SessionState.invocations.length === 0 && (
        <div>No invocations recorded yet.</div>
      )}
      {SessionState.invocations.map((rec) => (
        <div key={rec.id} style={{ marginBottom: "2rem" }}>
          <strong>Invocation ID:</strong> {rec.id}{"\n"}
          <strong>Timestamp:</strong> {new Date(rec.timestamp).toISOString()}{"\n"}
          <strong>Status:</strong> {rec.status}{"\n"}
          <strong>Latency:</strong> {rec.latencyMs}ms{"\n"}
          <strong>Tokens:</strong> {rec.tokens ?? "—"}{"\n"}
          {rec.cloudOnline !== undefined && (
            <>
              <strong>Cloud:</strong> {rec.cloudOnline ? "Online" : "Offline"}{"\n"}
              <strong>Model:</strong> {rec.modelName ?? "—"}{"\n"}
              <strong>Cloud Invocation ID:</strong> {rec.cloudInvocationId ?? "—"}{"\n"}
              <strong>Cloud Latency:</strong> {rec.cloudLatencyMs ?? "—"} ms{"\n"}
            </>
          )}
          <strong>Coherence:</strong> {rec.coherence ?? "—"}{"\n"}
          <strong>Drift Severity:</strong> {rec.driftSeverity ?? "—"}{"\n"}
          <strong>Adaptive Mode:</strong> {rec.adaptiveMode ?? "—"}{"\n"}
          <strong>Adaptive Intensity:</strong> {rec.adaptiveIntensity ?? "—"}{"\n"}
          {rec.driftRecommendations && rec.driftRecommendations.length > 0 && (
            <>
              <strong>Drift Recommendations:</strong>{"\n"}
              {rec.driftRecommendations.map((r) => `  • ${r}`).join("\n")}{"\n"}
            </>
          )}
          {rec.reinforcementRecommendations && rec.reinforcementRecommendations.length > 0 && (
            <>
              <strong>Reinforcement Recommendations:</strong>{"\n"}
              {rec.reinforcementRecommendations.map((r) => `  • ${r}`).join("\n")}{"\n"}
            </>
          )}
          {rec.adaptiveReinforcement && (
            <>
              <strong>Adaptive Reinforcement:</strong>{"\n"}{rec.adaptiveReinforcement}{"\n"}
            </>
          )}
          <strong>Prompt:</strong>{"\n"}{rec.prompt}{"\n"}
          <strong>Output:</strong>{"\n"}{rec.output ?? "—"}{"\n"}
          <hr />
        </div>
      ))}
    </div>
  );
};
