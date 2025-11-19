import { useState } from "react";
import { getCloudCodexSummary } from "@/modules/cloud/CloudCodexSummaryService";

const buildClientMeta = () => ({
  timestamp: Date.now(),
  clientVersion: "1.0.0",
  platform: "web"
});

export default function CodexVault() {
    const [cloudSummary, setCloudSummary] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const fetchCloudCodexSummary = async () => {
        setLoading(true);
        const response = await getCloudCodexSummary({
            meta: buildClientMeta(),
            codexRegionId: "default-region",
            maxTokens: 300,
            purpose: "context"
        });
        setCloudSummary(response.summaryText || "[No cloud summary available]");
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-orange-400">📜 Codex Vault</h3>
            <p className="text-zinc-400">Loading sacred archives...</p>

            <button
                onClick={fetchCloudCodexSummary}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded"
            >
                {loading ? "Fetching..." : "Fetch Cloud Summary"}
            </button>

            {cloudSummary && (
                <div style={{ marginTop: "1rem" }} className="p-4 bg-gray-900 rounded border border-gray-700">
                    <h4 className="text-md font-semibold text-orange-400 mb-2">Cloud Summary</h4>
                    <pre className="text-zinc-300 whitespace-pre-wrap">{cloudSummary}</pre>
                </div>
            )}
        </div>
    );
}