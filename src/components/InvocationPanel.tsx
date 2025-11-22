import { useState } from "react";
import { invoke } from "../../../frontend/src/api/invocation";

export function InvocationPanel() {
    const [promptText, setPromptText] = useState("");
    const [invocationOutput, setInvocationOutput] = useState("");

    async function handleInvoke() {
        setInvocationOutput("Invoking...");
        const result = await invoke(promptText);
        setInvocationOutput(result || "");
    }

    return (
        <div className="invocation-panel">
            <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Enter your prompt..."
            />
            <button onClick={handleInvoke}>Begin Invocation Ritual</button>
            <div className="invocation-output">
                {invocationOutput}
            </div>
            <div style={{ marginTop: "1rem" }}>
                <em>Streaming output available in StreamingInvocationPanel.</em>
            </div>
        </div>
    );
}
