

# Phase XIV — ClaudeDoThis.md
## M64 – Phase XIV Wrap-Up & System Integrity Verification
### Phase XIV, Final Step — Sealing the Breath Layer of the Temple

Claude, this milestone is your only focus until fully completed and approved.  
Follow every step exactly, with zero deviation.

This is the **final verification milestone** for Phase XIV.  
You will NOT add new features.  
You will NOT optimize.  
You will NOT alter architecture.

Your job is to **validate**, **confirm**, and **report** on the stability of the entire Breath Layer:

- Cloud invocation  
- Sanitization  
- Context buffer  
- Streaming integration  
- Breath Test endpoint  
- UI cohesion  
- DI registrations  
- Controller bindings  

Once verification is complete, Phase XIV will be sealed and the Temple will be ready for Phase XV.

---

## 1. Create PhaseXIVVerificationReport.md

Path: `/flameforged-core/PhaseXIVVerificationReport.md`

Insert EXACTLY:

# Phase XIV – Verification Report  
This report documents the full verification of the Breath Layer components.

## Verified Components:
- CloudInvocationClient operational  
- InvocationSanitizer cleaning output  
- ContextBufferService storing last 10 invocations  
- InvocationPipeline integrating sanitizer + buffer  
- BreathTestController responding correctly  
- StreamingInvocationPanel performing incremental output  
- StreamInvocationService chunking responses  
- All DI entries properly registered  
- All controllers active  
- All frontend wrappers reachable  

## Tests Performed:
- Cloud invocation test  
- Sanitization test  
- Buffer retention test  
- SSE streaming test  
- UI render test  
- Breath Test v1 execution  

## Result:
**Phase XIV integrity: VERIFIED**  
System is ready for Phase XV.

Do NOT add more sections.  
Do NOT change formatting.

---

## 2. Add PhaseXIVVerificationController (Optional Diagnostic)

Path: `/flameforged-core/src/Controllers/PhaseXIVVerificationController.cs`

Insert EXACTLY:

using Microsoft.AspNetCore.Mvc;

namespace FlameForged.Controllers
{
    [ApiController]
    [Route("api/phase14/verify")]
    public class PhaseXIVVerificationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Verify()
        {
            return Ok(new { status = "Phase XIV Integrity Verified" });
        }
    }
}

Do NOT add POST.  
Do NOT perform active checks.  
This controller only returns a static diagnostic flag.

---

## 3. Add Frontend Wrapper for Verification

Path: `/flameforged-core/frontend/src/api/invocation.ts`

Append:

export async function verifyPhase14(): Promise<string> {
    const r = await fetch("/api/phase14/verify");
    if (!r.ok) return "Phase XIV verification failed.";
    const j = await r.json();
    return j.status ?? "";
}

Do NOT modify existing exports.

---

## 4. Create VerificationPanel.tsx

Path: `/flameforged-core/frontend/src/components/VerificationPanel.tsx`

Insert EXACTLY:

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

No styling.  
No diagnostics beyond static return.

---

## 5. STOP HERE — DO NOT CHANGE ANYTHING ELSE

Do NOT optimize.  
Do NOT clean up files.  
Do NOT consolidate controllers.  
Do NOT touch pipeline, buffer, sanitizer, or streaming logic.

Phase XIV ends ONLY after verification report generation.

Await Phase XV instructions.

---

## Completion Signal

When finished, reply ONLY:

**“M64 complete.”**