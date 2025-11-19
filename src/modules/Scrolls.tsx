import { useState } from "react";
import { getCloudScrollSummary } from "@/modules/cloud/CloudScrollSummaryService";

const buildClientMeta = () => ({
  timestamp: Date.now(),
  clientVersion: "1.0.0",
  platform: "web"
});

export default function Scrolls() {
    const [cloudSummary, setCloudSummary] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const fetchCloudScrollSummary = async () => {
        setLoading(true);
        const response = await getCloudScrollSummary({
            meta: buildClientMeta(),
            scrollIds: ["scroll-001", "scroll-002"],
            aggregate: true,
            maxTokensPerScroll: 150
        });
        setCloudSummary(response.aggregateSummaryText || "[No cloud scroll summary available]");
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-orange-400">📖 Scrolls</h3>
            <p className="text-zinc-400">Accessing scroll registry...</p>

            <button
                onClick={fetchCloudScrollSummary}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded"
            >
                {loading ? "Fetching..." : "Cloud Summary"}
            </button>

            {cloudSummary && (
                <div style={{ marginTop: "1rem" }} className="p-4 bg-gray-900 rounded border border-gray-700">
                    <h4 className="text-md font-semibold text-orange-400 mb-2">Cloud Scroll Summary</h4>
                    <pre className="text-zinc-300 whitespace-pre-wrap">{cloudSummary}</pre>
                </div>
            )}
        </div>
    );
}