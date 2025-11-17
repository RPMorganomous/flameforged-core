import React from "react";
import GPUSyncStatus from "./gpu/GPUSyncStatus";

export default function GpuConnect() {
    return (
        <div className="text-gray-200">
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-orange-400 mb-2">💻 GPU Connect</h2>
                <p className="text-zinc-400">Connect to GPU nodes and monitor system performance.</p>
            </div>

            {/* GPU Sync Status Panel */}
            <GPUSyncStatus />
        </div>
    );
}