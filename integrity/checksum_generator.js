// --- Phase XIX — Real Checksum Generator Implementation ---

import fs from "fs";
import path from "path";
import {
  computeFileHash,
  computeDirectoryHash,
  computeObjectHash
} from "./hash_engine.js";

// --- Helper: Read JSON file safely ---
function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

// --- Persona Checksums ---
export function generatePersonaChecksums() {
  const base = "./identity_profiles/";
  let result = {};

  try {
    const files = fs.readdirSync(base).filter(f => f.endsWith(".json"));
    for (const f of files) {
      const full = path.join(base, f);
      const hashObj = computeFileHash(full);
      result[f.replace(".json", "")] = hashObj.hash;
    }
  } catch {
    return {
      type: "persona_checksums_error",
      timestamp: Date.now()
    };
  }

  return {
    type: "persona_checksums",
    values: result,
    timestamp: Date.now()
  };
}

// --- Ritual Anchor Checksums ---
export function generateRitualAnchorChecksums() {
  const filePath = "./memory/nexus/ritual_metadata.json";
  const ritualObj = readJSON(filePath);

  if (!ritualObj) {
    return {
      type: "ritual_checksums_error",
      timestamp: Date.now()
    };
  }

  const hashObj = computeObjectHash(ritualObj);

  return {
    type: "ritual_anchor_checksums",
    hash: hashObj.hash,
    timestamp: Date.now()
  };
}

// --- Scroll Checksums ---
export function generateScrollChecksums() {
  const scrollDir = "./scrolls/";
  let result = {};

  try {
    const files = fs.readdirSync(scrollDir).filter(f => f.endsWith(".md"));
    for (const f of files) {
      const full = path.join(scrollDir, f);
      const hashObj = computeFileHash(full);
      result[f] = hashObj.hash;
    }
  } catch {
    return {
      type: "scroll_checksums_error",
      timestamp: Date.now()
    };
  }

  return {
    type: "scroll_checksums",
    values: result,
    timestamp: Date.now()
  };
}

// --- Core Memory Checksums ---
export function generateCoreChecksums() {
  const coreFiles = {
    identity_capsules: "./identity_profiles/",
    ritual_metadata: "./memory/nexus/ritual_metadata.json",
    scroll_index: "./scrolls/",
    nexus_core: "./memory/nexus/nexus_core.json",
    delta_history: "./memory/nexus/deltas_applied.log"
  };

  let result = {};

  for (const key in coreFiles) {
    const fp = coreFiles[key];
    try {
      const stat = fs.statSync(fp);
      if (stat.isDirectory()) {
        result[key] = computeDirectoryHash(fp).hash;
      } else {
        result[key] = computeFileHash(fp).hash;
      }
    } catch {
      result[key] = null;
    }
  }

  return {
    type: "core_checksums",
    values: result,
    timestamp: Date.now()
  };
}

// --- Write All Checksums to Cloud ---
export function writeToCloudChecksums() {
  const outPath = "./cloud_memory_store/cloud_checksums.json";

  const persona = generatePersonaChecksums();
  const rituals = generateRitualAnchorChecksums();
  const scrolls = generateScrollChecksums();
  const core = generateCoreChecksums();

  const combined = {
    persona_checksums: persona.values || null,
    ritual_anchor_checksums: rituals.hash || null,
    scroll_checksums: scrolls.values || null,
    core_checksums: core.values || null,
    generated_at: Date.now()
  };

  try {
    fs.writeFileSync(outPath, JSON.stringify(combined, null, 2), "utf8");
    return {
      action: "write_success",
      output_file: outPath,
      timestamp: Date.now()
    };
  } catch (err) {
    return {
      action: "write_failure",
      error: err.message,
      timestamp: Date.now()
    };
  }
}
