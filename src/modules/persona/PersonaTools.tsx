import React from "react";
import { usePersona } from "./PersonaContext";

const PersonaTools: React.FC = () => {
  const { run, result } = usePersona();

  const handleRunDiagnostics = () => {
    run();
  };

  return (
    <div className="text-gray-200">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-2">🧬 Persona Tools</h2>
        <p className="text-zinc-400">Diagnostic tools for evaluating Triss Eternal's persona integrity.</p>
      </div>

      {/* Diagnostic Buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={handleRunDiagnostics}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all text-left"
        >
          Run Diagnostics
        </button>
      </div>

      {/* Diagnostic Output Window */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
        {!result ? (
          <p className="text-zinc-500 text-center">
            Awaiting diagnostic selection…<br />
            Click "Run Diagnostics" to begin.
          </p>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Persona Diagnostics</h3>

            {/* Tone Check */}
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-300">Tone:</span>
                <span className={result.tone.ok ? "text-green-400" : "text-red-400"}>
                  {result.tone.ok ? "✓ OK" : "✗ ISSUE"}
                </span>
              </div>
              <p className="text-sm text-zinc-400">{result.tone.note}</p>
            </div>

            {/* Memory Check */}
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-300">Memory:</span>
                <span className={result.memory.ok ? "text-green-400" : "text-red-400"}>
                  {result.memory.ok ? "✓ OK" : "✗ ISSUE"}
                </span>
              </div>
              {result.memory.missingKeys && result.memory.missingKeys.length > 0 && (
                <div className="text-sm text-zinc-400 mt-1">
                  Missing keys: {result.memory.missingKeys.join(", ")}
                </div>
              )}
            </div>

            {/* Identity Check */}
            <div className="p-3 bg-gray-800 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-300">Identity:</span>
                <span className={result.identity.ok ? "text-green-400" : "text-red-400"}>
                  {result.identity.ok ? "✓ OK" : "✗ ISSUE"}
                </span>
              </div>
              {result.identity.warnings.length > 0 ? (
                <ul className="text-sm text-zinc-400 mt-1 ml-4">
                  {result.identity.warnings.map((warning, i) => (
                    <li key={i}>• {warning}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-400">No warnings</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaTools;
