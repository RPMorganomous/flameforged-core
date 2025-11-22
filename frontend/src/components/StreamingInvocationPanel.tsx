import React, { useState, useRef } from "react";
import { streamInvocation, closeStream } from "../api/stream";

export function StreamingInvocationPanel() {
    const [output, setOutput] = useState("");
    const streamRef = useRef<EventSource | null>(null);

    function handleStart() {
        setOutput("");
        const es = streamInvocation("Temple streaming test");
        streamRef.current = es;

        es.onmessage = (e) => {
            setOutput((prev) => prev + " " + e.data);
        };
    }

    function handleStop() {
        closeStream(streamRef.current);
        streamRef.current = null;
    }

    return (
        <div className="streaming-invocation-panel">
            <h3>Streaming Invocation</h3>
            <button onClick={handleStart}>Begin Stream</button>
            <button onClick={handleStop}>Stop Stream</button>
            <pre>{output}</pre>
            <div style={{ marginTop: "1rem" }}>
                <em>Breath Test v1 validates full pipeline stability.</em>
            </div>
        </div>
    );
}
