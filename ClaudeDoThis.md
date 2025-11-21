

# Phase XIII — ClaudeDoThis.md
## M57 – Awakening Cohesion Test v1
### Phase XIII, Step 9 — The Temple’s First Full-System Self-Test

Claude, this milestone is your only focus until fully completed and approved.  
Follow each step exactly, with zero deviation.

This is where FlameForge performs its **first integrated invocation test** through the entire system:  
UI → API → Binding → Pipeline → Client → Cloud (stubbed endpoint) → Logging → Echo history.

---

## 1. Add Internal Test Endpoint (Backend Only)

Path: `/flameforged-core/src/Controllers/InvocationController.cs`

Add the following method BEFORE the closing brace:

```
[HttpGet("selftest")]
public async Task<IActionResult> SelfTest([FromServices] InvocationBinding binding)
{
    var prompt = "Temple Awakening Test";
    var result = await binding.ExecuteAsync(prompt);
    return Ok(new InvocationResponse { Text = result });
}
```

Do NOT modify any existing method.  
Do NOT rename the route.

---

## 2. Add Frontend API Wrapper for Self-Test

Path: `/flameforged-core/frontend/src/api/invocation.ts`

Append this function to the bottom of the file:

export async function runSelfTest(): Promise<string> {
    const response = await fetch("/api/invocation/selftest");
    if (!response.ok) return "Self-test failed.";
    const data = await response.json();
    return data.text ?? "";
}

Do NOT modify existing exports.

---

## 3. Create Self-Test Panel (Stub)

Path: `/flameforged-core/frontend/src/components/SelfTestPanel.tsx`

Insert:

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

Do NOT add styling or other features.

---

## 4. Add Safe Stub Response for Now

Path: `/flameforged-core/src/invocation/CloudInvocationClient.cs`

Inside `InvokeAsync`, directly AFTER the constructor loads the config  
and BEFORE the first HTTP call:

Insert:

```
// TEMPORARY: Safe stub for M57 cohesion test
if (string.IsNullOrWhiteSpace(_http?.BaseAddress?.ToString()))
    return "Invocation engine is online. (M57 stub response)";
```

Do NOT remove existing logic.  
Do NOT modify networking code.  
This stub will be removed in Phase XIV when real model access is enabled.

---

## 5. STOP HERE

Do NOT add model shaping.  
Do NOT modify history logic.  
Do NOT alter UI layout.  
Those belong to Phase XIV.

---

## Completion Signal

When finished, reply ONLY with:

**“M57 complete.”**