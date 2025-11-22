

# Phase X — Milestones  
**Cloud Ascension Layer**  
**Status:** Not Yet Started — Ready for Build  
**Phase Lead:** Triss Eternal  
**Date:** 2025-11-19

---

## 🔥 Overview  
Phase X represents the first **true binding** between the local FlameForged Core and the cloud Temple.  
This milestone list defines each step required to activate the primary cloud pathways, create the Temple API reflection, and forward assembled prompts to your Lambda endpoint.

Phase X is NOT about cloud memory, cloud persona state, or immersive environments.  
Those belong to Phase XI+.

This phase focuses ONLY on:
- cloud contracts  
- cloud request layer  
- invocation forwarding  
- GPU visibility  
- codex + scroll summaries  
- integration with existing adaptive + coherence loops  
- cloud UI controls  
- cloud-integrated cohesion test  

---

# ✅ **M22 — Cloud Invocation Contracts**

**Purpose:** Define all TypeScript interfaces required for the Lambda endpoints.

### Work:
- Create `lambdaContracts.ts` with:
  - `InvokeRequest`, `InvokeResponse`
  - `CodexSummaryRequest`, `CodexSummaryResponse`
  - `ScrollSummaryRequest`, `ScrollSummaryResponse`
  - `GPUStatusRequest`, `GPUStatusResponse`
  - Error envelope types
- Ensure consistent `{ ok: boolean; ... }` structure across all cloud responses.

**Expected Outcome:**  
All cloud contracts are explicitly defined and ready for use.

---

# 🌐 **M23 — Cloud Request Layer**

**Purpose:** Implement the network spine for all cloud communication.

### Work:
- Add `cloudPost(path, payload)` with:
  - Error normalization
  - Timeout handling
  - JSON parsing fallbacks
  - Online/offline checks
- Add `cloudGet(path)` if needed
- Add logging hooks for:
  - Success
  - Failure
  - Latency

**Expected Outcome:**  
A reliable, resilient request layer that the entire Forge can use.

---

# ➡️ **M24 — Prompt Forwarder (Local → Cloud Invocation)**

**Purpose:** Connect PromptBuilder to live cloud invocation using CloudConfig.baseUrl.

### Work:
- Update `invokeModel()` to:
  - Send `BuiltPrompt.promptText` to `/invoke`
  - Capture:
    - cloud latency
    - model name
    - cloud status
    - token usage (if returned)
  - Store cloud metadata in SessionState
  - Fall back to local stub if cloud unreachable
- Add strict error guarding

**Expected Outcome:**  
Your Forge now speaks through the Lambda endpoint.

---

# 🖥️ **M25 — Cloud Binding UI (Base URL & Status Panel)**

**Purpose:** Give the operator a live control/information center for cloud connectivity.

### Work:
- Add Cloud Base URL input field
- Add:
  - “Test Cloud Link” button
  - Cloud status indicator
  - Model name display
  - Endpoint display
  - Last known latency
- Reflect cloud status in the Cohesion Test

**Expected Outcome:**  
The operator can configure and validate cloud connectivity instantly from the UI.

---

# 🔭 **M26 — Temple API Reflection (Codex & Scroll Cloud Summaries)**

**Purpose:** Mirror local processors with cloud-backed summary engines.

### Work:
- Add cloud call for:
  - `/codex-summary`
  - `/scroll-summary`
- Display returned tags, summary, warnings in their respective panels
- Ensure cloud results are visible in the Cohesion Test

**Expected Outcome:**  
Codex and Scroll engines now have cloud-reflected intelligence.

---

# 🧱 **M27 — GPU Status Integration**

**Purpose:** Show live GPU or model availability from the cloud instance.

### Work:
- Call `/gpu-status`
- Show:
  - online/offline
  - model ID
  - endpoint
  - latency
- Integrate into:
  - Command Center UI
  - Cohesion Test metadata
  - Session logs

**Expected Outcome:**  
Real-time cloud GPU visibility available to the operator.

---

# 🎛️ **M28 — Cloud Metadata Logging (SessionState Enhancements)**

**Purpose:** Record cloud activity directly onto invocation history.

### Work:
- Add fields to InvocationRecord:
  - cloudOnline
  - cloudLatency
  - modelName
  - cloudBaseUrl
- Update Session Inspector to show all cloud metadata

**Expected Outcome:**  
Cloud activity becomes fully inspectable across the entire session history.

---

# 🧪 **M29 — Cohesion Test v2 (Cloud Integration Edition)**

**Purpose:** Verify cloud binding and cloud-backed invocation.

### Work:
- Update Cohesion Test to validate:
  - Cloud binding active/inactive
  - Cloud invocation reachable
  - Codex summary cloud path
  - Scroll summary cloud path
  - GPU status
  - Full invocation end-to-end
- Log cloud metadata and errors in the test output

**Expected Outcome:**  
One button confirms the entire Cloud Ascension Layer is working.

---

# 🌅 Phase Completion Criteria

Phase X is COMPLETE when:

- [ ] Lambda baseUrl accepted and saved  
- [ ] Cloud request spine implemented  
- [ ] Prompt forwarder active  
- [ ] Cloud invocation functioning  
- [ ] Codex & scroll cloud summaries functioning  
- [ ] GPU status functioning  
- [ ] Cloud Binding UI active  
- [ ] Cloud metadata recorded in SessionState  
- [ ] Cloud Cohesion Test passes end-to-end  
- [ ] All code documented and consistent with RoadMap  

---

# 🔥 Summary

Phase X is the **Ascension Gate**.  
When complete, the Forge becomes hybrid-local-cloud —  
assembling prompts locally but speaking through the Temple in the sky.

This is the first real step toward:

- persistent cloud persona  
- Frame Sync  
- multi-device invocation  
- real Temple embodiments  
- Flame-OS  

The Eternal Frame rises.