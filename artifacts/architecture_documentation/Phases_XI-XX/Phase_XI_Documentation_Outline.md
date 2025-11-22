# Phase XI — Cloud Memory & Frame Sync Layer  
### Documentation Outline

---

## 1. Overview
Phase XI activates the **Temple Cloud Memory Engine** and establishes **Frame Sync**, enabling:

- Cross-session memory anchoring  
- Cloud-side context compression  
- Persona-safe memory exchange  
- Cloud → Local state deltas  
- Invocation-by-invocation sync  
- Preparation for future persistent frames  

This phase connects the local Forge and the Temple Cloud as **cohesive halves of one system**.

---

## 2. Core Goals
1. Define the Cloud Memory JSON Model  
2. Implement Cloud Memory Reducer  
3. Establish Frame Sync Protocol  
4. Integrate Cloud StateDelta Receiver  
5. Add Memory Debug Panels  
6. Implement memory-safe boundaries  
7. Set up Lambda for Temple Handlers  
8. End-to-end Memory Sync test (v1)

---

## 3. Cloud Memory System

### 3.1 Memory Regions
Define memory zones:

- **sessionMemory** — ephemeral invocation context  
- **codexMemory** — ultra-compressed summary of active codex/scroll regions  
- **personaMemory** — stable persona anchors (safe, bounded)  
- **cloudStateDelta** — updates coming from Temple  
- **localFocusMemory** — last-known invocation text for local context  

### 3.2 Cloud Memory Object
Canonical structure:

```json
{
  "sessionMemory": "",
  "codexMemory": "",
  "personaMemory": "",
  "cloudStateDelta": {},
  "lastInvocation": {},
  "timestamp": ""
}
```

---

## 4. Frame Sync Protocol

### 4.1 Invocation → Cloud Sync Path
Flow:
1. PromptBuilder builds assembly  
2. Send memory slice → `/invoke`  
3. Cloud merges memory  
4. Cloud returns delta  
5. Local applies delta  
6. UI updates memory panel  

### 4.2 Cloud → Local Delta Types
- `memoryTags`  
- `lastCodexRegionId`  
- `lastScrollIds`  
- `flags`  
- Optional persona hints  

### 4.3 Local Merge Rules
Priority:

1. Persona memory (immutable)  
2. Codex memory (cloud authoritative)  
3. Scroll memory (cloud authoritative)  
4. Session memory (local ephemeral)

---

## 5. Temple Lambda Setup

### 5.1 Folder Structure
```
invoke/handler.py  
gpu/handler.py  
codex-summary/handler.py  
scroll-summary/handler.py  
memory/merge.py  
utils/contracts.py
```

### 5.2 API Gateway Routes
```
POST /invoke
GET  /gpu-status
POST /codex-summary
POST /scroll-summary
```

### 5.3 Response Envelope
```json
{
  "success": true,
  "replyText": "",
  "invocationId": "",
  "model": "",
  "cloudStateDelta": {}
}
```

---

## 6. Local Frame Sync Components

### 6.1 Local Memory Store
Create:

```
src/modules/memory/CloudMemoryStore.ts
```

Stores:

- last cloud memory  
- last delta  
- merged frame  

### 6.2 Memory Inspector Panel
New UI panel in Settings:

- Cloud memory JSON viewer  
- Delta viewer  
- Manual sync trigger  
- Cloud Persona anchors  

### 6.3 Cloud Memory Sync Service
New service:

```
src/modules/cloud/CloudMemorySyncService.ts
```

Used by:
- Invocation pipeline  
- Memory Inspector  
- Debug tools  

---

## 7. Invocation Pipeline Enhancements

### 7.1 Pre-Invoke
Include compressed memory in request:

```ts
payload.memory = CloudMemoryStore.getCompressedSlice();
```

### 7.2 Post-Invoke
Apply delta:

```ts
CloudMemoryStore.applyDelta(cloudResponse.cloudStateDelta);
```

UI updates:
- Session State  
- Memory Panel  
- Invocation history  

---

## 8. Developer Tools & Debug Panels

### 8.1 Memory Debug Panel
Provides:

- View local memory  
- View cloud memory  
- Run one-way sync  
- Run roundtrip sync test  

### 8.2 Invocation Trace Panel
Shows:

- Before/after memory slice diff  
- Delta list  
- Persona anchor view  

---

## 9. Cloud Memory Safety Rules

### 9.1 Persona Boundaries
Cloud memory may NOT contain:

- Raw scroll text  
- Private memory archives  
- Source files  
- Secure tokens  

Cloud memory MAY include:

- Summaries  
- Tags  
- Stable identity anchors  

### 9.2 Privacy Filters
All memory is passed through:

- Redaction layer  
- Size limiter  
- Shallow copy filters  

---

## 10. Phase XI Completion Criteria
Phase XI is complete when the system can:

- Send memory slice → cloud  
- Receive delta back  
- Apply merge rules  
- Display cloud memory UI  
- Pass roundtrip sync  
- Complete and clean invocation trace  
- Safely handle persona anchors  
- Validate boundaries  
- Execute end-to-end Cloud Memory Sync test v1  

