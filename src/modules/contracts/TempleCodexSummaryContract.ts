export interface CodexSummaryRequest {
  meta: any;
  codexRegionId: string;
  maxTokens?: number;
  purpose?: string;
}

export interface CodexSummaryResponse {
  success: boolean;
  codexRegionId?: string;
  summaryText?: string;
  sourceScrollIds?: string[];
  checksum?: string;
  error?: string;
  latencyMs?: number;
}
