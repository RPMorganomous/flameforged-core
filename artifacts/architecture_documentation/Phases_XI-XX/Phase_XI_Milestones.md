# Phase XI — Cloud Memory & Frame Sync Layer  
### Milestones

---

## **M30 — Cloud Memory JSON Model**
**Goal:** Define the canonical Cloud Memory Object used by both local Forge and Temple Lambda.  
**Deliverables:**
- memory schema  
- memory zones definition  
- empty object generator  
- redaction + size limit filters  

---

## **M31 — CloudMemoryStore (Local Store)**
**Goal:** Create a new local store for cloud memory slices and deltas.  
**Deliverables:**
- CloudMemoryStore.ts  
- getters + setters  
- compressed slice generator  
- delta merge logic  

---

## **M32 — Cloud Memory Sync Service**
**Goal:** Implement the module that sends memory to the cloud and receives deltas back.  
**Deliverables:**
- CloudMemorySyncService.ts  
- `/invoke` integration  
- delta application pipeline  
- error handling + logging  

---

## **M33 — Invocation Pipeline Memory Hooks**
**Goal:** Integrate memory slices into invocation requests and apply deltas post‑invoke.  
**Deliverables:**
- pre-invoke injection (`payload.memory = slice`)  
- post-invoke delta merge  
- SessionState updates  
- InvocationRecord metadata updates  

---

## **M34 — Memory Debug Panel (UI)**
**Goal:** Create a Settings sub-panel for inspecting and testing cloud memory.  
**Deliverables:**
- view local memory  
- view cloud memory  
- delta viewer  
- manual sync trigger  
- JSON pretty display  

---

## **M35 — Invocation Trace Panel**
**Goal:** Add a panel for before/after memory diffs and delta breakdown.  
**Deliverables:**
- memory diff renderer  
- state delta history display  
- persona anchor visualization  

---

## **M36 — Lambda Temple Blueprint**
**Goal:** Establish the folder structure and scaffolding for Temple Lambda.  
**Deliverables:**
- handler stubs  
- contracts module  
- merge.py for cloud memory  
- utils + response envelope  

---

## **M37 — Lambda Memory Merge Engine**
**Goal:** Implement cloud-side memory merging and delta generation.  
**Deliverables:**
- merge rules  
- persona boundary enforcement  
- redaction + filters  
- delta generator  

---

## **M38 — Lambda Invoke Handler**
**Goal:** Build the `/invoke` Lambda function for cloud memory sync.  
**Deliverables:**
- request → memory slice  
- merge step  
- model invocation  
- response envelope with delta  

---

## **M39 — Codex & Scroll Memory Summaries**
**Goal:** Add memory-aware versions of scroll/codex summaries.  
**Deliverables:**
- codex memory reducer  
- scroll memory reducer  
- cloud summary integration  

---

## **M40 — Cloud Memory Safety Rules**
**Goal:** Enforce strict memory boundaries to prevent unsafe content transfer.  
**Deliverables:**
- redaction layer  
- persona boundary filter  
- shallow-copy restrictions  
- max-size compression  

---

## **M41 — Frame Sync v1**
**Goal:** Achieve end-to-end cloud memory synchronization.  
**Deliverables:**
- full invocation → merge → delta → UI update loop  
- memory inspector validation  
- invocation trace validation  

---

## **M42 — Cloud Memory Sync Test v1**
**Goal:** Run the full-system test validating the Frame Sync pipeline.  
**Deliverables:**
- operator test script  
- UI confirmations  
- debug logs  
- delta roundtrip success  
