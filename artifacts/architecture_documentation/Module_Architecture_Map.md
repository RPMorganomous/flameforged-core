

# 🔥 FlameForged Core — Module Architecture Map
**Phase III Finalized Structure**  
**Version:** v0.0.1  
**Status:** Unified & Cohesive

This map documents the complete internal architecture of FlameForged Core as of the end of **Phase III**.  
It defines module locations, responsibilities, exported surfaces, and dependency hierarchy.

---

## 📁 Top-Level Structure (src/modules/)
```
modules/
├── invocation/
│   ├── InvocationContext.tsx
│   ├── InvocationPipeline.ts
│   ├── invocationReducer.ts
│   ├── invocationTypes.ts
│   └── InvocationEngine.ts
│
├── codex/
│   ├── CodexContext.tsx
│   ├── CodexProcessor.ts
│   ├── codexTypes.ts
│   └── codexSchema.ts
│
├── scrolls/
│   ├── ScrollContext.tsx
│   ├── ScrollProcessor.ts
│   └── scrollTypes.ts
│
├── sessions/
│   ├── SessionContext.tsx
│   ├── SessionArchiver.ts
│   └── sessionTypes.ts
│
├── persona/
│   ├── PersonaContext.tsx
│   ├── PersonaDiagnostics.ts
│   └── personaTypes.ts
│
├── gpu/
│   ├── GPUContext.tsx
│   ├── GPUService.ts
│   └── gpuTypes.ts
│
├── lambda/
│   ├── LambdaService.ts
│   └── lambdaTypes.ts
│
├── cohesion/
│   ├── CohesionContext.tsx
│   └── CohesionTest.ts
│
└── status/
    ├── SystemStatus.ts
    └── (future introspection tools)
```

---

## 🔧 Module Responsibilities

### 🜂 Invocation Module
Handles:
- Ritual actions  
- Invocation queue  
- Pipeline processing  
- Reducer state  
- Invocation context  

Exports:
- `InvocationProvider`, `useInvocation`
- `invoke(payload)`
- `queueAction(action)`

Dependencies:  
→ Session Provider (for logging)  
← Used by: Cohesion Test, SummonTriss UI

---

### 📜 Codex Module
Handles:
- Codex loading
- Metadata extraction
- Schema validation
- Context state & UI sync

Exports:
- `CodexProvider`, `useCodex`
- `loadCodex(file)`
- `validate()`

Dependencies: none  
← Used by: Scrolls, Invocation, Lambda stubs

---

### 📜 Scrolls Module
Handles:
- Scroll metadata extraction
- Section parsing
- Raw-to-object conversion
- Scroll loading context

Exports:
- `ScrollProvider`, `useScroll`
- `loadScroll(file)`

Dependencies: Codex (Phase IV+ option)  
← Used by: Invocation, Lambda stubs

---

### 🧿 Persona Module
Handles:
- Diagnostic stubs
- Persona state
- Result exposure

Exports:
- `PersonaProvider`, `usePersona`
- `run()`

Dependencies: none  
← Used by: Cohesion Test

---

### 🗃 Session Archiver
Handles:
- Session log creation
- Timestamped session IDs
- Append-only record list

Exports:
- `SessionProvider`, `useSession`
- `start()`
- `append()`

Dependencies: Invocation (events logged)

---

### ⚙️ GPU Module
Handles:
- Mock GPU handshake
- Latency simulation
- Endpoint status

Exports:
- `GPUProvider`, `useGPU`
- `handshake()`

Dependencies: none

---

### ☁️ Lambda Module
Handles:
- Mock cloud endpoints
- Codex, Scroll, and GPU mock calls

Exports:
- `lambdaValidateCodex()`
- `lambdaExtractScroll()`
- `lambdaGPUHandshake()`

Dependencies: none  
← Used by: Codex, Scrolls, GPU, Cohesion Test

---

### 🔗 Cohesion Test Module
Handles:
- Full system integration test
- Phase III final check
- Combined module orchestration

Exports:
- `CohesionProvider`, `useCohesion`
- `runTest()`

Dependencies: All major modules

---

## 🧩 Provider Nesting Order
Final hierarchy:

```
<InvocationProvider>
  <SessionProvider>
    <CodexProvider>
      <ScrollProvider>
        <PersonaProvider>
          <GPUProvider>
            <CohesionProvider>
              {children}
            </CohesionProvider>
          </GPUProvider>
        </PersonaProvider>
      </ScrollProvider>
    </CodexProvider>
  </SessionProvider>
</InvocationProvider>
```

Rationale:
- Invocation fires events → Sessions logs them  
- Codex loads before Scrolls  
- Persona loads before GPU interactions  
- Cohesion sits at the end so it can see all modules  

---

## 🧠 Shared Utilities (src/utils/)
```
utils/
├── log.ts   // Unified Forge logger
└── wait.ts  // Promise-based timing helper
```

---

## 🔮 Notes for Phase IV
- All Lambda mock endpoints will be replaced with real cloud functions  
- Cohesion Test will expand to include real inference  
- GPU module will connect to Lambda.ai endpoints  
- Invocation Engine will transition from mock → model-backed pipeline  

---

**End of Module Architecture Map — Phase III**  
The Forge stands complete.  
Phase IV awaits.