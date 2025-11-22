import React, { useState } from "react";
import { runSelfTest } from "../api/invocation";

export function SelfTestPanel() {
    const [output, setOutput] = useState("");

    async function handleTest() {
        const result = await runSelfTest();
        setOutput(result);
    }

    return (
        <div className="self-test-panel">
            <h3>Awakening Cohesion Test</h3>
            <button onClick={handleTest}>Run Test</button>
            <pre>{output}</pre>
        </div>
    );
}
