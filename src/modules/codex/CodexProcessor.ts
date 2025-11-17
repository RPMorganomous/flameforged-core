import type { CodexEntry, CodexMetadata, CodexValidationResult } from "./codexTypes";
import { validateCodexEntry } from "./codexSchema";
import { cloudPost } from "@/utils/cloudPost";
import type { CodexSummaryRequest, CodexSummaryResponse } from "@/modules/cloud";
import { CloudConfig } from "@/modules/cloud/CloudConfig";

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

export const requestCloudCodexSummary = async (codex: any): Promise<CodexSummaryResponse> => {
  // Check if CloudConfig.baseUrl is set
  if (!CloudConfig.baseUrl) {
    return {
      ok: false,
      summary: "Cloud unreachable — baseUrl not set.",
      tags: [],
      warnings: []
    };
  }

  const path = "/codex-summary";

  const payload: CodexSummaryRequest = {
    codex
  };

  const res = await cloudPost(path, payload);

  // Cloud unreachable → return offline summary shape
  if (!res || res.ok === false) {
    return {
      ok: false,
      summary: "Cloud unreachable — running offline.",
      tags: [],
      warnings: []
    };
  }

  return res as CodexSummaryResponse;
};
