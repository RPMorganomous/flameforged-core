import { useState } from "react";
import { CloudMemoryStore } from "./CloudMemoryStore";
import { syncCloudMemory } from "../cloud/CloudMemorySyncService";

export const InvocationTracePanel: React.FC = () => {
  const [beforeSlice, setBeforeSlice] = useState<any>(null);
  const [afterMemory, setAfterMemory] = useState<any>(null);
  const [delta, setDelta] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTrace = async () => {
    setLoading(true);

    // 1. Capture memory BEFORE invocation
    const before = CloudMemoryStore.getCompressedSlice();
    setBeforeSlice(before);

    // 2. Perform sync call
    const result = await syncCloudMemory();

    // 3. Capture delta & metadata
    setDelta(result.cloudStateDelta ?? null);
    setMeta({
      success: result.success,
      error: result.error,
      latencyMs: result.latencyMs,
      applied: result.applied
    });

    // 4. Capture memory AFTER merge
    const after = CloudMemoryStore.get();
    setAfterMemory(after);

    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #444", marginTop: "2rem" }}>
      <h3>Invocation Trace Panel</h3>

      <button onClick={runTrace} disabled={loading}>
        {loading ? "Running..." : "Run Invocation Trace"}
      </button>

      {meta && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Invocation Metadata:</strong>
          <pre>{JSON.stringify(meta, null, 2)}</pre>
        </div>
      )}

      {beforeSlice && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Before Slice:</strong>
          <pre>{JSON.stringify(beforeSlice, null, 2)}</pre>
        </div>
      )}

      {delta && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Cloud Delta:</strong>
          <pre>{JSON.stringify(delta, null, 2)}</pre>
        </div>
      )}

      {afterMemory && (
        <div style={{ marginTop: "1rem" }}>
          <strong>After Memory:</strong>
          <pre>{JSON.stringify(afterMemory, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
