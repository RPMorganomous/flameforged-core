export async function invoke(prompt: string): Promise<string> {
    const response = await fetch("/api/invocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        return "Invocation failed.";
    }

    const data = await response.json();
    return data.text ?? "";
}

export async function loadInvocationHistory(): Promise<any[]> {
    const response = await fetch("/api/invocation/history");
    if (!response.ok) return [];
    return await response.json();
}

export async function runSelfTest(): Promise<string> {
    const response = await fetch("/api/invocation/selftest");
    if (!response.ok) return "Self-test failed.";
    const data = await response.json();
    return data.text ?? "";
}

export async function loadContextBuffer(): Promise<any[]> {
    const response = await fetch("/api/invocation/context");
    if (!response.ok) return [];
    return await response.json();
}

export async function runBreathTest(): Promise<string> {
    const response = await fetch("/api/breathtest");
    if (!response.ok) return "Breath Test failed.";
    const data = await response.json();
    return data.text ?? "";
}

export async function verifyPhase14(): Promise<string> {
    const r = await fetch("/api/phase14/verify");
    if (!r.ok) return "Phase XIV verification failed.";
    const j = await r.json();
    return j.status ?? "";
}
