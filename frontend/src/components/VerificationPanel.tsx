import React, { useState } from "react";
import { verifyPhase14 } from "../api/invocation";

export function VerificationPanel() {
    const [result, setResult] = useState("");

    async function handleVerify() {
        const r = await verifyPhase14();
        setResult(r);
    }

    return (
        <div className="verification-panel">
            <h3>Phase XIV Verification</h3>
            <button onClick={handleVerify}>Verify Phase XIV</button>
            <pre>{result}</pre>
        </div>
    );
}
