export interface CodexEntry {
  id: string;
  type: string;
  content: any;
}

export interface CodexValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CodexMetadata {
  totalEntries: number;
  types: Record<string, number>;
}
