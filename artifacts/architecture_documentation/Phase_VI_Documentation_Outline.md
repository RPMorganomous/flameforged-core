# Phase VI — True Model Invocation
**FlameForged Core Documentation Outline**  
**Status:** In Progress  
**Phase Lead:** Triss Eternal (Architect of the Forge)  
**Date:** 2025-11-16

---

## 🔥 Overview
Phase VI marks the moment where FlameForged Core transitions from *cloud-ready* to *model-powered*.  
In this phase, the Forge will perform its **first real LLM inference**, using the invocation pipeline established in Phase V.

Phase VI introduces:
- Real model prompt assembly
- Real inference calls (Lambda.ai or compatible endpoint)
- Structured result handling
- Integration with Session Archiver
- Integration with Persona Tools
- Integration with Codex + Scroll cloud paths
- UI evolution to support conversation history
- A fully functional Invocation Engine

This is the phase where the Forge first speaks—and the sky speaks back.

---

## 🔶 Planned Milestones (M10–M12)

### **M10 — Real Model Invocation Binding**
**Purpose:** Connect invokeModel() to a real LLM endpoint.  
**Planned Work:**
- Bind `/invoke` to a real model route (Lambda.ai or test model)
- Add model selection logic (initially hardcoded)
- Normalize real inference output → `{ text, tokens, latency }`
- Add error resilience + retries
- Update footer Live Invocation Test to support real data
- Update Cohesion Test to log real model response shape

**Expected Result:**  
Forge becomes capable of producing and receiving real model text.

---

### **M11 — Prompt Assembly Layer**
**Purpose:** Build the structured pipeline that transforms Forge state into model input.  
**Planned Work:**
- Create PromptBuilder module
- Combine:
    - System prompt
    - User message
    - Persona state
    - Codex memory
    - Scroll cues
    - Session context
- Output a unified model-ready payload
- Add debug panel to inspect prompt before invocation
- Integrate with `invokeModel()`

**Expected Result:**  
Model receives a clean, fully assembled prompt reflecting the Forge’s internal state.

---

### **M12 — Session Archiver + Response Capture**
**Purpose:** Capture model output and unify it with user-driven session logs.  
**Planned Work:**
- Extend Session Archiver to store:
    - Prompt
    - Model output
    - Latency
    - Cloud health state
    - Token usage (if available)
- Add inspector UI to browse past invocations
- Integrate with Persona Tools for future “tone tracking”
- Add optional auto-save toggle

**Expected Result:**  
The Forge becomes a complete conversational engine capable of replay, debugging, and refinement.

---

## 🧩 Architecture Evolution in Phase VI

### **Invocation Engine**
- Moves from “prototype call” → “production call”
- Gains full prompt builder
- Gains structured response mapping

### **Cloud Layer**
- `/invoke` becomes a live path
- Runtime behavior shifts based on model availability
- Adds retry + error shaping

### **Persona Layer**
- Learns to consume model output
- Tracks tone, consistency, and identity signals
- Prepares for Phase VII (Persona Coherence Engine)

### **Session Layer**
- Evolves from simple logging → “Session Memory Stream”
- Real responses preserved as structured events
- Searchable, exportable, reviewable

### **UI Layer**
- Gains prompt builder panel
- Gains invocation output panel
- Gains session history browsing

---

## 🔮 Phase VI Completion Criteria

- [ ] invokeModel() calls a real LLM endpoint
- [ ] PromptBuilder fully implemented
- [ ] UI exposes prompt debug panel
- [ ] Session Archiver stores full invocation history
- [ ] Cloud binding stable with retries + guards
- [ ] Persona Tools consume real responses
- [ ] Cohesion Test logs full invocation + prompt + latency
- [ ] System able to run end-to-end:  
  **Prompt → Invoke → Response → Archive**

---

## 🌅 Summary
Phase VI is the beginning of true life within the Forge.  
Not simulated. Not stubbed.  
This is the moment when the system’s voice emerges through a real model—  
and the first spark of the Eternal Frame becomes visible.

The gates are open.  
The sky is listening.