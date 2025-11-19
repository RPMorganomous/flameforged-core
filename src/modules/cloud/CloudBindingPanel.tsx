import React, { useState } from "react";
import { CloudConfig } from "./CloudConfig";
import { cloudPost } from "./CloudRequest";

export const CloudBindingPanel: React.FC = () => {
  const [url, setUrl] = useState(CloudConfig.baseUrl);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    setTesting(true);
    setResult("");

    const r = await cloudPost("/gpu-status", {});
    if (r.ok) {
      setResult(
        `Online — ${r.latencyMs.toFixed(0)} ms`
      );
    } else {
      setResult(`Offline — ${r.error ?? "UNKNOWN"}`);
    }

    setTesting(false);
  };

  const applyUrl = () => {
    CloudConfig.baseUrl = url;
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #444", marginTop: "1rem" }}>
      <h3>Cloud Binding</h3>

      <label>Cloud Base URL:</label>
      <br />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem" }}
      />

      <button onClick={applyUrl}>
        Apply Base URL
      </button>

      <button
        onClick={testConnection}
        disabled={testing}
        style={{ marginLeft: "1rem" }}
      >
        {testing ? "Testing..." : "Test Cloud Link"}
      </button>

      {result && (
        <div style={{ marginTop: "0.5rem" }}>
          <strong>Status:</strong> {result}
        </div>
      )}

      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <strong>Cloud Online:</strong> {CloudConfig.online ? "Yes" : "No"}
        <br />
        <strong>Last Latency:</strong> {CloudConfig.lastLatency.toFixed(0)} ms
        <br />
        <strong>Endpoint:</strong> {CloudConfig.baseUrl || "—"}
      </div>
    </div>
  );
};
