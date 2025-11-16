import React from "react";
import { useSession } from "@/modules/sessions/SessionContext";

const SessionArchiver: React.FC = () => {
  const { start, session } = useSession();

  const handleStartSession = () => {
    start();
  };

  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour12: false });
  };

  return (
    <div className="text-gray-200">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-2">📋 Session Archiver</h2>
        <p className="text-zinc-400">Record invocation and Codex events.</p>
      </div>

      {/* Session Info */}
      {session && (
        <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="text-sm text-zinc-400">Session ID:</div>
          <div className="text-zinc-200 font-mono text-sm">{session.id}</div>
          <div className="text-sm text-zinc-400 mt-2">Records: {session.records.length}</div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStartSession}
          disabled={!!session}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
            session
              ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 hover:shadow-orange-500/50"
          }`}
        >
          Start New Session Log
        </button>
      </div>

      {/* Scrollable Log Area */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
        {!session || session.records.length === 0 ? (
          <p className="text-zinc-500 text-center">No session logs yet. Click "Start New Session Log" to begin.</p>
        ) : (
          <div className="space-y-1">
            {session.records.map((record, index) => (
              <div key={index} className="text-sm text-zinc-300 font-mono">
                <span className="text-zinc-500">[{formatTimestamp(record.timestamp)}]</span>{" "}
                <span className="text-orange-400">{record.action}</span>
                {record.payload && (
                  <span className="text-zinc-400">
                    {" "}
                    {typeof record.payload === "string"
                      ? record.payload
                      : JSON.stringify(record.payload)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionArchiver;
