export interface ToneCheck {
  ok: boolean;
  note: string;
}

export interface MemorySignatureCheck {
  ok: boolean;
  missingKeys?: string[];
}

export interface IdentityIntegrity {
  ok: boolean;
  warnings: string[];
}

export interface DiagnosticResult {
  tone: ToneCheck;
  memory: MemorySignatureCheck;
  identity: IdentityIntegrity;
}
