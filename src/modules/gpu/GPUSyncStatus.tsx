import React from "react";
import { useGPU } from "./GPUContext";

const GPUSyncStatus: React.FC = () => {
  const { handshake, result, lambdaHandshake, lambdaGPUStatus } = useGPU();

  const handleHandshake = async () => {
    await handshake();
  };

  const handleLambdaTest = async () => {
    await lambdaHandshake();
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 min-h-[200px]">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">🔗 GPU Link Status</h3>
        <p className="text-zinc-400 text-sm">Monitor link readiness for Phase III inference.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
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
      </div>

      {lambdaGPUStatus && (
        <div className="mb-4 p-3 bg-gray-900 rounded border border-orange-600/40">
          <p className="text-orange-400 text-sm">Lambda Response: {lambdaGPUStatus}</p>
        </div>
      )}

      {/* Status Fields Grid */}
      <div className="grid grid-cols-[140px_1fr] gap-4">
        {/* Connection */}
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

        {/* Endpoint */}
        <div className="text-zinc-400 font-medium">Endpoint:</div>
        <div className="text-zinc-200">{result?.endpoint || "—"}</div>

        {/* Latency */}
        <div className="text-zinc-400 font-medium">Latency:</div>
        <div className="text-zinc-200">{result ? `${result.latencyMs} ms` : "—"}</div>

        {/* Session */}
        <div className="text-zinc-400 font-medium">Session:</div>
        <div className="text-zinc-200">
          {result ? "Handshake complete" : "Awaiting handshake…"}
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
