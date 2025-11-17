import React, { useState } from "react";
import { motion } from "framer-motion";
import CodexSyncIndicator from "./CodexSyncIndicator";
import type { CodexSyncStatus } from "./CodexSyncIndicator";
import { useCodex } from "@/modules/codex/CodexContext";

const CodexVaultPanel: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [syncStatus, setSyncStatus] = useState<CodexSyncStatus>("idle");
  const {
    loadCodex,
    metadata,
    validationResult,
    lambdaValidate,
    lambdaStatus,
    fetchCloudCodexSummary,
    cloudSummary,
    cloudTags,
    cloudWarnings,
    cloudStatus
  } = useCodex();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSyncStatus("loading");
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        JSON.parse(text); // basic validation
        setFileContent(text);
        setFileName(file.name);

        // Load into Codex processor
        await loadCodex(file);

        setIsLoaded(true);
        setSyncStatus("active");
        setStatus("Codex loaded successfully.");
      } catch (error) {
        setSyncStatus("error");
        setStatus("Invalid JSON file.");
        console.error("Error parsing JSON:", error);
        setTimeout(() => setSyncStatus("idle"), 2000);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    try {
      JSON.parse(fileContent); // validate before saving
      setSyncStatus("saving");
      const blob = new Blob([fileContent], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "memory.json";
      link.click();
      setStatus("Codex saved successfully.");
      setTimeout(() => setSyncStatus("active"), 1500);
    } catch {
      setSyncStatus("error");
      setStatus("Cannot save — invalid JSON format.");
      setTimeout(() => setSyncStatus(isLoaded ? "active" : "idle"), 2000);
    }
  };

  const handleDownloadCodex = () => {
    const blob = new Blob([fileContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "codex-export.json";
    link.click();
    setStatus("Codex exported successfully.");
  };

  return (
    <motion.div
      className="text-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-orange-400">🧠 Codex Vault</h2>
        <CodexSyncIndicator status={syncStatus} />
      </div>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-300 mb-4 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleDownloadCodex}
          disabled={!fileContent}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
            fileContent
              ? "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 hover:shadow-zinc-600/50"
              : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
          }`}
        >
          📥 Download Codex JSON
        </button>
        <button
          onClick={lambdaValidate}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
        >
          Test Lambda
        </button>
        <button
          onClick={fetchCloudCodexSummary}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white font-semibold shadow-lg transition-all"
        >
          Fetch Cloud Codex Summary
        </button>
      </div>

      {lambdaStatus && (
        <div className="mb-4 p-3 bg-gray-900 rounded border border-orange-600/40">
          <p className="text-orange-400 text-sm">Lambda Response: {lambdaStatus}</p>
        </div>
      )}

      {isLoaded && (
        <>
          <div className="flex flex-col justify-start p-6 text-gray-200 bg-gray-900 rounded-lg border border-gray-700 h-[calc(90vh-8rem)]">
            <textarea
              style={{ backgroundColor: "#18181b", color: "#ffffff" }}
              className="w-full flex-1 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm mb-4"
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                💾 Save Changes
              </button>
            </div>
          </div>
        </>
      )}

      {status && (
        <p className="mt-4 text-sm text-orange-400">{status}</p>
      )}

      {/* Codex Metadata Display */}
      {metadata && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Codex Metadata</h3>
          <p className="text-zinc-300">Total Entries: {metadata.totalEntries}</p>
          <div className="mt-2">
            <p className="text-zinc-400 text-sm">Entry Types:</p>
            <ul className="ml-4 text-zinc-300 text-sm">
              {Object.entries(metadata.types).map(([type, count]) => (
                <li key={type}>
                  {type}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Validation Status Display */}
      {validationResult && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Validation Status</h3>
          <p className={`text-sm font-semibold ${validationResult.valid ? 'text-green-400' : 'text-red-400'}`}>
            {validationResult.valid ? '✓ Valid' : '✗ Invalid'}
          </p>
          {!validationResult.valid && validationResult.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-zinc-400 text-sm">Errors:</p>
              <ul className="ml-4 text-red-400 text-sm">
                {validationResult.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Cloud Codex Summary Display */}
      <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-orange-400 mb-2">Cloud Codex Summary</h3>

        <div className="mb-3">
          <span className="text-zinc-400 text-sm">Cloud Status: </span>
          <span className={`text-sm font-semibold ${
            cloudStatus === "online" ? "text-green-400" :
            cloudStatus === "offline" ? "text-red-400" :
            cloudStatus === "checking" ? "text-yellow-400" :
            "text-zinc-400"
          }`}>
            {cloudStatus === "online" && "✓ Online"}
            {cloudStatus === "offline" && "✗ Offline"}
            {cloudStatus === "checking" && "⟳ Checking..."}
            {cloudStatus === "idle" && "Idle"}
          </span>
        </div>

        {cloudSummary && (
          <div className="mb-3">
            <p className="text-zinc-400 text-sm mb-1">Cloud Summary:</p>
            <p className="text-zinc-300 text-sm">{cloudSummary}</p>
          </div>
        )}

        {cloudTags.length > 0 && (
          <div className="mb-3">
            <p className="text-zinc-400 text-sm mb-1">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {cloudTags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {cloudWarnings.length > 0 && (
          <div className="mb-3">
            <p className="text-zinc-400 text-sm mb-1">Warnings:</p>
            <ul className="ml-4 text-yellow-400 text-sm">
              {cloudWarnings.map((warning, i) => (
                <li key={i}>⚠️ {warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CodexVaultPanel;