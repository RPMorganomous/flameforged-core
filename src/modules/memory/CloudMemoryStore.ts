// CloudMemoryStore — Singleton in-memory store for CloudMemory state
// Phase XI — M35 dependency

import type { CloudMemory } from "./CloudMemoryModel";
import { createEmptyCloudMemory } from "./CloudMemoryModel";

/**
 * In-memory singleton store for CloudMemory state.
 * This is a simple stub implementation for M35.
 * Full implementation will come in later milestones.
 */
class CloudMemoryStoreClass {
  private memory: CloudMemory = createEmptyCloudMemory();

  /**
   * Get the full CloudMemory object
   */
  get(): CloudMemory {
    return { ...this.memory };
  }

  /**
   * Set the entire CloudMemory object
   */
  set(memory: CloudMemory): void {
    this.memory = { ...memory };
  }

  /**
   * Update CloudMemory with partial changes
   */
  update(partial: Partial<CloudMemory>): void {
    this.memory = { ...this.memory, ...partial };
  }

  /**
   * Apply a delta object to CloudMemory (merging changes from Temple)
   */
  applyDelta(delta: any): void {
    if (!delta || typeof delta !== "object") return;

    // Simple shallow merge for now
    this.memory = {
      ...this.memory,
      cloudStateDelta: delta,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Reset to empty CloudMemory
   */
  reset(): void {
    this.memory = createEmptyCloudMemory();
  }

  /**
   * Get a compressed slice of CloudMemory for sending to Temple.
   * For now, returns the full memory object. Later milestones may
   * implement actual compression/filtering logic.
   */
  getCompressedSlice(): CloudMemory {
    return { ...this.memory };
  }
}

// Export singleton instance
export const CloudMemoryStore = new CloudMemoryStoreClass();
