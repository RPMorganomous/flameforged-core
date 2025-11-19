import { SessionState } from "@/modules/sessions/SessionArchiver";

export const PersonaDashboard = () => {
  const records = SessionState.invocations;

  if (!records || records.length === 0) {
    return <div>No persona data available yet.</div>;
  }

  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
      <h2>Persona Coherence Dashboard</h2>
      <hr />

      {records.map((rec) => (
        <div key={rec.id} style={{ marginBottom: "2rem" }}>
          <strong>Invocation ID:</strong> {rec.id}{"\n"}
          <strong>Timestamp:</strong> {new Date(rec.timestamp).toISOString()}{"\n"}
          <strong>Coherence Score:</strong> {rec.coherence ?? "—"}{"\n"}
          <strong>Drift Flags:</strong> {rec.coherenceReport?.driftFlags?.join(", ") ?? "—"}{"\n"}

          <h4>Breakdown:</h4>
          {rec.coherenceReport?.breakdown ? (
            <>
              Tone: {rec.coherenceReport.breakdown.tone}{"\n"}
              Vocabulary: {rec.coherenceReport.breakdown.vocabulary}{"\n"}
              Emotional: {rec.coherenceReport.breakdown.emotional}{"\n"}
              Identity: {rec.coherenceReport.breakdown.identity}{"\n"}
              Memory: {rec.coherenceReport.breakdown.memory}{"\n"}
            </>
          ) : (
            <div>No breakdown available.</div>
          )}

          <h4>Fingerprint:</h4>
          {rec.coherenceReport?.fingerprint ? (
            <>
              Vocabulary Markers: {rec.coherenceReport.fingerprint.vocabulary.join(", ")}{"\n"}
              Tone Markers: {rec.coherenceReport.fingerprint.toneMarkers.join(", ")}{"\n"}
              Identity Markers: {rec.coherenceReport.fingerprint.identityMarkers.join(", ")}{"\n"}
            </>
          ) : (
            <div>No fingerprint data.</div>
          )}

          <hr />
        </div>
      ))}

      <button
        onClick={() => {
          const data = JSON.stringify(records, null, 2);
          const blob = new Blob([data], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "persona_coherence_report.json";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export Persona Report (JSON)
      </button>
    </div>
  );
};
