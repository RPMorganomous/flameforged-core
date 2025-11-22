import React, { useState } from "react";
import { runBreathTest } from "../api/invocation";

export function BreathTestPanel() {
    const [output, setOutput] = useState("");

    async function handleTest() {
        const result = await runBreathTest();
        setOutput(result);
    }

    return (
        <div className="breath-test-panel">
            <h3>Temple Breath Test v1</h3>
            <button onClick={handleTest}>Run Breath Test</button>
            <pre>{output}</pre>
        </div>
    );
}
