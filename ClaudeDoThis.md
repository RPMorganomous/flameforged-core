# Phase IV — M1: Cloud Connectivity Scaffold  
**Assigned to Claude**  
**Date:** (2025-11-16)

This document is your working instruction sheet.  
Each task will be given in small, atomic steps.  
Complete them exactly as written.

---

## 🔥 M1 — Cloud Connectivity Scaffold

### 🎯 Objective
Create the foundational cloud networking layer for FlameForged Core.  
No real Lambda endpoints yet.  
This is pure scaffolding: config, network wrapper, error type, and module imports.

---

## ✅ Part 1 — Create Cloud Module Folder
**Create folder:**
`src/modules/cloud/`

**Create files:**
- `CloudConfig.ts`
- `cloudTypes.ts`

---

## ✅ Part 2 — Create CloudConfig.ts
Add:

```ts
export const CloudConfig = {
  baseUrl: "",
  apiKey: "",
  timeoutMs: 15000,
  retry: 1
};
```

No logic.  
Just structure.

---

## ✅ Part 3 — Create cloudTypes.ts
Add:

```ts
export interface CloudError {
  ok: false;
  status: number;
  message: string;
}
```

---

## ✅ Part 4 — Create cloudPost() Utility
**Create file:**  
`src/utils/cloudPost.ts`

Contents:

```ts
import type { CloudError } from "@/modules/cloud/cloudTypes";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

export const cloudPost = async (path: string, payload: any): Promise<any | CloudError> => {
  const url = CloudConfig.baseUrl + path;
  const start = performance.now();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CloudConfig.apiKey
      },
      body: JSON.stringify(payload)
    });

    const latency = Math.round(performance.now() - start);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message: `Cloud error (${res.status}) after ${latency}ms`
      };
    }

    const data = await res.json();
    return data;

  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      message: "Network unreachable"
    };
  }
};
```

---

## ✅ Part 5 — Import cloudPost into Modules
Add this import to these files (no logic changes):

```
import { cloudPost } from "@/utils/cloudPost";
```

Files:
- `InvocationContext.tsx`
- `CodexContext.tsx`
- `ScrollContext.tsx`
- `PersonaContext.tsx`
- `GPUContext.tsx`
- `LambdaService.ts`

Do NOT call cloudPost yet.  
Imports only.

---

## ✅ Part 6 — Add “Test Cloud Link” Button
In `ConsoleLayout.tsx` footer, add a button:

```
[Test Cloud Link]
```

For now, on click → console.log("Cloud test triggered").

No real cloud call yet.

---

## 🎉 Expected Result
After M1:

- Cloud module exists  
- Cloud config created  
- Network wrapper created  
- Unified error type created  
- Modules prepared for cloud usage  
- UI has Cloud Test button  
- No actual cloud requests yet  

System remains stable and functional.

---

**End of M1 Instructions**