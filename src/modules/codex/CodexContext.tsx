import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CodexEntry, CodexMetadata, CodexValidationResult } from './codexTypes';
import { validateCodex, extractCodexMetadata } from './CodexProcessor';
import { lambdaValidateCodex, lambdaSummarizeCodex } from '../lambda/LambdaService';

interface CodexContextValue {
  loadCodex: (file: File) => Promise<void>;
  validate: () => CodexValidationResult | null;
  metadata: CodexMetadata | null;
  entries: CodexEntry[] | null;
  validationResult: CodexValidationResult | null;
  lambdaValidate: () => Promise<void>;
  lambdaSummarize: () => Promise<void>;
  lambdaStatus: string | null;
  lambdaSummary: string | null;
}

const CodexContext = createContext<CodexContextValue | undefined>(undefined);

export const useCodex = () => {
  const context = useContext(CodexContext);
  if (!context) {
    throw new Error('useCodex must be used within CodexProvider');
  }
  return context;
};

interface CodexProviderProps {
  children: ReactNode;
}

export const CodexProvider: React.FC<CodexProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<CodexEntry[] | null>(null);
  const [metadata, setMetadata] = useState<CodexMetadata | null>(null);
  const [validationResult, setValidationResult] = useState<CodexValidationResult | null>(null);
  const [lambdaStatus, setLambdaStatus] = useState<string | null>(null);
  const [lambdaSummary, setLambdaSummary] = useState<string | null>(null);

  const loadCodex = async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      // Assume parsed is an array of entries or has an entries field
      const entriesArray: CodexEntry[] = Array.isArray(parsed) ? parsed : parsed.entries || [];

      // Store entries
      setEntries(entriesArray);

      // Validate
      const validation = validateCodex(entriesArray);
      setValidationResult(validation);

      // Extract metadata
      const meta = extractCodexMetadata(entriesArray);
      setMetadata(meta);

      console.log('[Codex] Loaded:', entriesArray.length, 'entries');
      console.log('[Codex] Validation:', validation.valid ? 'PASSED' : 'FAILED');
      console.log('[Codex] Metadata:', meta);
    } catch (error) {
      console.error('[Codex] Load error:', error);
      setValidationResult({
        valid: false,
        errors: [`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`]
      });
    }
  };

  const validate = (): CodexValidationResult | null => {
    return validationResult;
  };

  const lambdaValidate = async (): Promise<void> => {
    const result = await lambdaValidateCodex();
    if (result.ok && result.data) {
      setLambdaStatus(result.data);
    }
  };

  const lambdaSummarize = async (): Promise<void> => {
    const result = await lambdaSummarizeCodex();
    if (result.ok && result.data) {
      setLambdaSummary(result.data);
    }
  };

  const value: CodexContextValue = {
    loadCodex,
    validate,
    metadata,
    entries,
    validationResult,
    lambdaValidate,
    lambdaSummarize,
    lambdaStatus,
    lambdaSummary,
  };

  return (
    <CodexContext.Provider value={value}>
      {children}
    </CodexContext.Provider>
  );
};
