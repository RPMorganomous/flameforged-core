import React, { useEffect, useState } from "react";
import { loadContextBuffer } from "../api/invocation";

export function ContextBufferPanel() {
    const [entries, setEntries] = useState<any[]>([]);

    useEffect(() => {
        loadContextBuffer().then(setEntries);
    }, []);

    return (
        <div className="context-buffer-panel">
            <h3>Context Buffer</h3>
            <ul>
                {entries.map((x, i) => (
                    <li key={i}>
                        <strong>{x.timestampUtc}</strong>: {x.prompt} → {x.completion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
