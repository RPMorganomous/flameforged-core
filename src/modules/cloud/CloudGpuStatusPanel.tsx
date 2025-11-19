import { useState } from "react";
import { getCloudGpuStatus } from "./CloudGpuStatusService";

export const CloudGpuStatusPanel: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const fetchStatus = async () => {
    setTesting(true);
    const r = await getCloudGpuStatus();
    setStatus(r);
    setTesting(false);
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #333", marginTop: "1rem" }}>
      <h3>Cloud GPU Status</h3>

      <button onClick={fetchStatus} disabled={testing}>
        {testing ? "Checking..." : "Check GPU Status"}
      </button>

      {status && (
        <div style={{ marginTop: "1rem" }}>
          <strong>GPU Available:</strong> {status.gpuAvailable ? "Yes" : "No"}<br />
          <strong>GPU Name:</strong> {status.gpuName || "—"}<br />
          <strong>Memory:</strong> {status.memoryFreeGb ?? "?"} / {status.memoryTotalGb ?? "?"} GB<br />
          <strong>Load:</strong> {status.loadPercent ?? "?"}%<br />
          <strong>Temperature:</strong> {status.temperatureC ?? "?"}°C<br />
          <strong>Notes:</strong> {status.notes || "—"}<br />
          <strong>Latency:</strong> {status.latencyMs ?? "?"} ms<br />
          {status.error && (
            <div style={{ marginTop: "0.5rem", color: "red" }}>
              <strong>Error:</strong> {status.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
