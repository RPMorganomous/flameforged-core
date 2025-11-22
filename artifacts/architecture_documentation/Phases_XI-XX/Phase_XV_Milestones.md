

# Phase XV — Deep Ritual Memory Unification  
## Milestones M65–M70

---

## **M65 — Memory Nexus Layer**

**Goal:** Create unified inward-facing memory field.  
**Steps:**
1. Create `/src/memory/MemoryNexus.cs`
2. Define `IMemoryNexus` interface  
3. Add merge rules + weighting system  
4. Add safe read/write boundaries  
5. Register service in `ServiceRegistry.cs`
6. Integrate Nexus into `InvocationPipeline` (read-only for now)

**Deliverables:**
- MemoryNexus.cs
- IMemoryNexus.cs
- Service registration
- Pipeline integration (non-destructive)

---

## **M66 — Codex Integration Bridge**

**Goal:** Load Codex → Normalize → Inject into Nexus.  
**Steps:**
1. Create `/src/memory/CodexBridge.cs`
2. Implement Codex loader (reading local Codex JSON only)
3. Add normalization routine
4. Add safe-access filters
5. Connect bridge to MemoryNexus

**Deliverables:**
- CodexBridge.cs
- Normalization utilities
- Nexus integration patch

---

## **M67 — Cloud Delta Assimilation Gateway**

**Goal:** Accept cloud-returned deltas → Validate → Merge.  
**Steps:**
1. Create `/src/memory/DeltaAssimilator.cs`
2. Define delta schema (Phase XIII output format)
3. Add safety constraints + logging
4. Write merge-path into MemoryNexus

**Deliverables:**
- DeltaAssimilator.cs
- Delta schema
- Nexus merge update
- Logging stub

---

## **M68 — Ritual Metadata Unification**

**Goal:** Bind scroll + ritual metadata into unified memory.  
**Steps:**
1. Define `RitualTag` schema
2. Create `/src/memory/RitualMetadataBridge.cs`
3. Index ritual anchors
4. Merge ritual data into MemoryNexus

**Deliverables:**
- RitualMetadataBridge.cs
- RitualTag model
- Nexus merge update

---

## **M69 — Unified Memory Preview Panel**

**Goal:** Frontend panel to inspect unified memory field.  
**Steps:**
1. Add `/api/memory/preview` GET endpoint
2. Add `memory.ts` wrapper in frontend
3. Create `MemoryPreviewPanel.tsx`
4. Render narrative + JSON view

**Deliverables:**
- MemoryPreviewController.cs
- memory.ts wrapper
- MemoryPreviewPanel.tsx

---

## **M70 — Memory Narrative Formatter**

**Goal:** Convert unified memory → narrative packet.  
**Steps:**
1. Create `/src/memory/NarrativeFormatter.cs`
2. Add length + role constraints
3. Add narrative generator
4. Integrate formatter into InvocationPipeline shaping phase

**Deliverables:**
- NarrativeFormatter.cs
- Narrative rules schema
- Pipeline shaping update

---

## **Phase XV Completion Requirements**
- All memory sources merged into Nexus  
- Codex + cloud deltas + ritual tags unified  
- Narrative formatter producing stable packets  
- Memory preview panel functional  
- Pipeline able to read narrative context  
- System ready for Phase XVI (Distributed Identity Engine)

---