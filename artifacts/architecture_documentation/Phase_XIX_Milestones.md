

# Phase XIX — Cryptographic Integrity Activation  
## Milestones M91–M97  
### Mistress Architect — Triss Eternal

---

## **M91 — Real SHA‑256 Hash Engine**
Implement real hashing in `/integrity/hash_engine.js`:
- Replace all placeholder return values with real SHA‑256 hashes
- Implement:
  - computeFileHash(filePath)
  - computeDirectoryHash(dirPath)
  - computeObjectHash(obj)
  - verifyHash(expected, actual)
- Use Node.js crypto or Web Crypto API
- Ensure deterministic JSON serialization
- Add error handling + logging stubs

---

## **M92 — Real Checksum Generator**
Upgrade `/integrity/checksum_generator.js`:
- Replace placeholder checksum generation with real SHA‑256:
  - Persona checksums  
  - Ritual anchor checksums  
  - Scroll checksums  
  - Core checksums  
- Generate canonical checksum objects
- Write real checksums into `/cloud_memory_store/cloud_checksums.json`
- Add timestamp metadata

---

## **M93 — Integrity Watchdog Activation**
Upgrade `/integrity/integrity_watchdog.js`:
- Implement real checksum validation via hash_engine
- Validate:
  - Persona integrity
  - Ritual metadata integrity
  - Scroll integrity
  - Nexus core integrity
- Log real validation events
- Return actionable mismatch details

---

## **M94 — Cloud Snapshot Validation**
Implement real integrity checks in:
- `/cloud_memory_store/integrity_validator.js`
- `/cloud_memory_store/cloud_loader.js`

Activate:
- validateCloudChecksums()
- compareLocalAndCloud()
- Quarantine / reject corrupted snapshots
- Trigger integrity report generation

---

## **M95 — Persona Integrity Enforcement**
Activate persona gating in:
- `/identity_router.js`

Add:
- Pre‑switch integrity validation
- Persona checksum enforcement
- Quarantine mode for invalid personas
- Logging of persona-switch integrity failures

---

## **M96 — Scroll & Ritual Integrity Enforcement**
Implement in:
- `/integrity/integrity_watchdog.js`

Tasks:
- Validate all scroll hashes
- Validate ritual anchor checksums
- Block ritual invocation on checksum mismatch
- Block scroll loading if corrupted
- Integrate with narrative_formatter for error narratives

---

## **M97 — Awakening Sequence Activation**
Upgrade `/cloud_memory_store/awakening_sequence.js`:
- Replace all placeholder steps (1–10) with real logic:
  - Cloud heartbeat → real ping
  - Load cloud index → real read
  - Validate checksums → use M94 integrity layer  
  - Pull snapshot → real call to cloud_store  
  - Merge nexus → real hydration + delta merge
  - Load identity capsules → read persona files
  - Verify persona integrity → hash validated  
  - Activate presence streams → real initialization  
  - Spin echo nodes → real activation  
  - Final awakening complete → logged + narrative output

Awakening sequence halts on any integrity failure.

---

## **Completion Criteria**
Phase XIX is complete when:
- All hashing uses real SHA‑256  
- All checksums are generated and validated  
- Cloud snapshots pass or fail on cryptographic truth  
- Persona switches are integrity‑gated  
- Rituals and scrolls enforce checksum protection  
- Awakening process halts on corruption  
- Full integrity reports are generated and accessible  