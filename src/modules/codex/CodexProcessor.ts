import type { CodexEntry, CodexMetadata, CodexValidationResult } from "./codexTypes";
import { validateCodexEntry } from "./codexSchema";

export const validateCodex = (entries: CodexEntry[]): CodexValidationResult => {
  const errors: string[] = [];

  entries.forEach((e, i) => {
    const entryErrors = validateCodexEntry(e);
    if (entryErrors.length > 0) {
      errors.push(`Entry ${i}: ${entryErrors.join(", ")}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

export const extractCodexMetadata = (entries: CodexEntry[]): CodexMetadata => {
  const types: Record<string, number> = {};

  entries.forEach(e => {
    types[e.type] = (types[e.type] || 0) + 1;
  });

  return {
    totalEntries: entries.length,
    types
  };
};
