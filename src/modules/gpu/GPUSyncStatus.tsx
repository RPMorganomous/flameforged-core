import React from "react";
import { useGPU } from "./GPUContext";

const GPUSyncStatus: React.FC = () => {
  const {
    handshake,
    result,
    lambdaHandshake,
    lambdaGPUStatus,
    checkGpu,
    gpuStatus,
    gpuLatencyMs,
    gpuModel,
    gpuEndpoint,
    fetchCloudGPUStatus,
    cloudStatus,
    cloudModel,
    cloudEndpoint,
    cloudLatency
  } = useGPU();

  const handleHandshake = async () => {
    await handshake();
  };

  const handleLambdaTest = async () => {
    await lambdaHandshake();
  };

  const handleCheckGpu = async () => {
    await checkGpu();
  };

  const handleCheckCloudGpu = async () => {
    await fetchCloudGPUStatus();
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 min-h-[200px]">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">🔗 GPU Link Status</h3>
        <p className="text-zinc-400 text-sm">Monitor link readiness for Phase III inference.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={handleHandshake}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
        >
          Run GPU Handshake
        </button>
        <button
          onClick={handleLambdaTest}
          className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 rounded-lg text-white font-semibold shadow-lg transition-all"
        >
          Test Lambda
        </button>
        <button
          onClick={handleCheckGpu}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white font-semibold shadow-lg transition-all"
        >
          Check GPU Status
        </button>
        <button
          onClick={handleCheckCloudGpu}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-lg text-white font-semibold shadow-lg transition-all"
        >
          Check Cloud GPU Status
        </button>
      </div>

      {lambdaGPUStatus && (
        <div className="mb-4 p-3 bg-gray-900 rounded border border-orange-600/40">
          <p className="text-orange-400 text-sm">Lambda Response: {lambdaGPUStatus}</p>
        </div>
      )}

      {/* Status Fields Grid */}
      <div className="grid grid-cols-[180px_1fr] gap-4 mb-6">
        {/* GPU Status */}
        <div className="text-zinc-400 font-medium">GPU Status:</div>
        <div className="text-zinc-200">
          {gpuStatus === "online" && <span className="text-green-400">✓ Online</span>}
          {gpuStatus === "offline" && <span className="text-red-400">✗ Offline</span>}
          {gpuStatus === "checking" && <span className="text-yellow-400">⟳ Checking...</span>}
          {gpuStatus === "idle" && <span className="text-zinc-400">Idle</span>}
        </div>

        {/* Model */}
        <div className="text-zinc-400 font-medium">Model:</div>
        <div className="text-zinc-200">{gpuModel || "—"}</div>

        {/* Endpoint */}
        <div className="text-zinc-400 font-medium">Endpoint:</div>
        <div className="text-zinc-200">{gpuEndpoint || "—"}</div>

        {/* Latency */}
        <div className="text-zinc-400 font-medium">Latency:</div>
        <div className="text-zinc-200">{gpuLatencyMs ? `${gpuLatencyMs} ms` : "—"}</div>

        {/* Legacy Connection */}
        <div className="text-zinc-400 font-medium">Connection:</div>
        <div className="text-zinc-200">
          {result ? (
            <span className={result.ok ? "text-green-400" : "text-red-400"}>
              {result.ok ? "✓ Connected" : "✗ Failed"}
            </span>
          ) : (
            "Idle — No GPU linked"
          )}
        </div>

        {/* Legacy Session */}
        <div className="text-zinc-400 font-medium">Session:</div>
        <div className="text-zinc-200">
          {result ? "Handshake complete" : "Awaiting handshake…"}
        </div>
      </div>

      {/* Cloud GPU Status Section */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-purple-600/30">
        <h4 className="text-lg font-semibold text-purple-400 mb-3">☁️ Cloud GPU Status</h4>
        <div className="grid grid-cols-[180px_1fr] gap-4">
          {/* Cloud GPU Status */}
          <div className="text-zinc-400 font-medium">Cloud GPU Status:</div>
          <div className="text-zinc-200">
            {cloudStatus === "online" && <span className="text-green-400">✓ Online</span>}
            {cloudStatus === "offline" && <span className="text-red-400">✗ Offline</span>}
            {cloudStatus === "checking" && <span className="text-yellow-400">⟳ Checking...</span>}
            {cloudStatus === "idle" && <span className="text-zinc-400">Idle</span>}
          </div>

          {/* Cloud GPU Model */}
          <div className="text-zinc-400 font-medium">Cloud GPU Model:</div>
          <div className="text-zinc-200">{cloudModel || "—"}</div>

          {/* Cloud GPU Endpoint */}
          <div className="text-zinc-400 font-medium">Cloud GPU Endpoint:</div>
          <div className="text-zinc-200">{cloudEndpoint || "—"}</div>

          {/* Cloud GPU Latency */}
          <div className="text-zinc-400 font-medium">Cloud GPU Latency:</div>
          <div className="text-zinc-200">{cloudLatency ? `${cloudLatency} ms` : "—"}</div>
        </div>
      </div>

      {/* Error Display */}
      {result?.error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded">
          <p className="text-red-400 text-sm">⚠️ {result.error}</p>
        </div>
      )}
    </div>
  );
};

export default GPUSyncStatus;
