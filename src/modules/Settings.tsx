import React, { useState } from "react";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

export default function Settings() {
    const [baseUrl, setBaseUrl] = useState<string>(CloudConfig.baseUrl || "");

    const handleBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBaseUrl(value);
        CloudConfig.baseUrl = value || null;
    };

    const isActive = CloudConfig.baseUrl !== null && CloudConfig.baseUrl !== "";

    return (
        <div className="text-gray-200">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-orange-400 mb-2">⚙️ Settings</h2>
                <p className="text-zinc-400">Configure FlameForged Core system settings.</p>
            </div>

            {/* Cloud Configuration Section */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">☁️ Cloud Configuration</h3>

                <div className="mb-4">
                    <label htmlFor="cloud-base-url" className="block text-zinc-400 text-sm mb-2">
                        Cloud Endpoint Base URL:
                    </label>
                    <input
                        id="cloud-base-url"
                        type="text"
                        value={baseUrl}
                        onChange={handleBaseUrlChange}
                        placeholder="https://your-cloud-endpoint.com"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-zinc-400 text-sm">Cloud Binding:</span>
                    <span className={`text-sm font-semibold ${isActive ? "text-green-400" : "text-red-400"}`}>
                        {isActive ? "✓ Active" : "✗ Inactive"}
                    </span>
                </div>
            </div>
        </div>
    );
}