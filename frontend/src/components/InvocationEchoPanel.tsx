import React, { useEffect, useState } from "react";
import { loadInvocationHistory } from "../api/invocation";

export function InvocationEchoPanel() {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        loadInvocationHistory().then(setHistory);
    }, []);

    return (
        <div className="invocation-echo-panel">
            <h3>Invocation Echo</h3>
            <ul>
                {history.map((x, i) => (
                    <li key={i}>
                        <strong>{x.timestampUtc}</strong>: {x.prompt} → {x.completion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
