# Phase X — M23: Cloud Request Layer (Skeleton + Safety + Logging)
**Assigned to Claude Sonnet**
**Date:** 2025-11-19  
**Status:** 🚧 IN PROGRESS  
**Phase:** Cloud Ascension Layer — Step 2 of Phase X

This milestone creates the **Cloud Request Layer**, the network spine the FlameForged Core will use to communicate with the Temple (Lambda endpoint).

Modify ONLY the files listed below.  
Report ALL changes when finished.  
Do NOT add additional files unless explicitly requested.

---

# 🎯 Objective  
Create a resilient, typed, fault-tolerant Cloud Request Layer with:

- `cloudPost(path, payload)`
- Optional `cloudGet(path)`
- Online/offline detection
- Timeout handling
- JSON parse fallback
- Error normalization
- Structured logging hooks
- Zero coupling to persona logic

This is the **transport layer only** — no invocation forwarding yet.

---

# 📁 Part 1 — Create CloudRequest.ts
**File:** `src/modules/cloud/CloudRequest.ts` (NEW FILE)

Create this exact file:

```ts
import { CloudConfig } from "./CloudConfig";

export interface CloudRequestResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  latencyMs: number;
}

const TIMEOUT_MS = 20000;

export async function cloudPost<T>(
  path: string,
  payload: any
): Promise<CloudRequestResult<T>> {
  const start = performance.now();

  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      status: 0,
      error: "NO_BASE_URL",
      latencyMs: 0
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${CloudConfig.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const latencyMs = performance.now() - start;

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      /* ignore bad JSON */
    }

    return {
      ok: res.ok,
      status: res.status,
      data: data ?? undefined,
      error: res.ok ? undefined : `HTTP_${res.status}`,
      latencyMs
    };
  } catch (err: any) {
    clearTimeout(timeout);

    return {
      ok: false,
      status: 0,
      error: err?.name === "AbortError" ? "TIMEOUT" : "NETWORK_ERROR",
      latencyMs: performance.now() - start
    };
  }
}
```

---

# 📁 Part 2 — Create CloudConfig.ts
**File:** `src/modules/cloud/CloudConfig.ts` (NEW FILE)

Create this exact file:

```ts
export const CloudConfig = {
  baseUrl: "",        // Set by UI
  online: false,      // Updated after every call
  lastLatency: 0      // ms
};
```

---

# 📁 Part 3 — Add index barrel
**File:** `src/modules/cloud/index.ts` (NEW FILE)

Create this exact file:

```ts
export * from "./CloudRequest";
export * from "./CloudConfig";
```

---

# 📁 Part 4 — Add Logging Hook
**File:** `src/modules/logging/CloudLog.ts` (NEW FILE)

Create this exact file:

```ts
export const CloudLog = {
  events: [] as any[],

  record(event: any) {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
  }
};
```

---

# 📁 Part 5 — Integrate Logging into CloudRequest
Return to `src/modules/cloud/CloudRequest.ts` and modify the return blocks to add:

```ts
import { CloudLog } from "@/modules/logging/CloudLog";
import { CloudConfig } from "./CloudConfig";
```

Before each return statement add:

```ts
CloudLog.record({
  path,
  ok: <computed ok>,
  status: <computed status>,
  latencyMs,
  error: <computed error or undefined>
});
```

Also update CloudConfig after each call:

```ts
CloudConfig.online = result.ok;
CloudConfig.lastLatency = result.latencyMs;
```

---

# 📁 Part 6 — Cloud Module Wiring Check
**File:** `src/main.ts` (or equivalent bootstrap entry)

Add:

```ts
import "@/modules/cloud";
```

Place this with other module bootstraps.

---

# 📋 Validation Checklist  
M23 is COMPLETE when:

- CloudRequest.ts exists and compiles
- CloudConfig.ts exists and compiles
- Barrel file exports both modules
- Logging hook captures all cloud traffic
- Online/offline state updates after each request
- Timeout logic works
- JSON parse fallback works
- Network and timeout errors normalized
- No persona or invocation logic included
- System builds with zero new TypeScript errors

---

# 📝 M23 Execution Report  
Claude: Append your execution report BELOW this section.  
Do NOT modify any content above this line.