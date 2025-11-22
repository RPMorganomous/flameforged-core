// --- Phase XIX — Real SHA-256 Hash Engine Implementation ---

import crypto from "crypto";
import fs from "fs";
import path from "path";

// --- Utility: Stable JSON Serialization ---
function stableJSONStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

// --- Compute SHA-256 of a Buffer ---
function sha256Buffer(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

// --- File Hashing ---
export function computeFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return {
      type: "file_hash",
      filePath,
      hash: sha256Buffer(fileBuffer),
      timestamp: Date.now()
    };
  } catch (err) {
    return {
      type: "file_hash_error",
      filePath,
      error: err.message,
      hash: null,
      timestamp: Date.now()
    };
  }
}

// --- Directory Hashing (Recursive) ---
export function computeDirectoryHash(dirPath) {
  try {
    let hashes = [];

    function traverse(directory) {
      const entries = fs.readdirSync(directory).sort();
      for (const entry of entries) {
        const fullPath = path.join(directory, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else {
          const fileBuf = fs.readFileSync(fullPath);
          hashes.push(sha256Buffer(fileBuf));
        }
      }
    }

    traverse(dirPath);

    // Combine sorted file hashes into one directory hash
    const combined = sha256Buffer(Buffer.from(hashes.sort().join("")));
    return {
      type: "directory_hash",
      dirPath,
      hash: combined,
      timestamp: Date.now()
    };
  } catch (err) {
    return {
      type: "directory_hash_error",
      dirPath,
      error: err.message,
      hash: null,
      timestamp: Date.now()
    };
  }
}

// --- Object Hashing ---
export function computeObjectHash(obj) {
  try {
    const serialized = stableJSONStringify(obj || {});
    return {
      type: "object_hash",
      hash: sha256Buffer(Buffer.from(serialized)),
      serialized,
      timestamp: Date.now()
    };
  } catch (err) {
    return {
      type: "object_hash_error",
      error: err.message,
      hash: null,
      timestamp: Date.now()
    };
  }
}

// --- Hash Verification (constant-time compare) ---
export function verifyHash(expected, actual) {
  try {
    const match =
      crypto.timingSafeEqual(
        Buffer.from(expected || "", "utf8"),
        Buffer.from(actual || "", "utf8")
      );

    return {
      expected,
      actual,
      match,
      timestamp: Date.now()
    };
  } catch {
    return {
      expected,
      actual,
      match: false,
      reason: "verification_error",
      timestamp: Date.now()
    };
  }
}
