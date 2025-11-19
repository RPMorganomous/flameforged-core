export interface ScrollSummaryRequest {
  meta: any;
  scrollIds: string[];
  maxTokensPerScroll?: number;
  aggregate?: boolean;
}

export interface ScrollSummaryItem {
  scrollId: string;
  summaryText: string;
}

export interface ScrollSummaryResponse {
  success: boolean;
  aggregate?: boolean;
  summaries?: ScrollSummaryItem[];
  aggregateSummaryText?: string;
  error?: string;
  latencyMs?: number;
}
