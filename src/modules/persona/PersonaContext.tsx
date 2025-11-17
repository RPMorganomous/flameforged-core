import React, { createContext, useContext, useState } from "react";
import { runDiagnostics } from "./PersonaDiagnostics";
import type { DiagnosticResult } from "./personaTypes";
import { cloudPost } from "@/utils/cloudPost";

interface PersonaContextValue {
  run: () => DiagnosticResult;
  result: DiagnosticResult | null;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const run = (): DiagnosticResult => {
    const diagnosticResult = runDiagnostics();
    setResult(diagnosticResult);
    return diagnosticResult;
  };

  return (
    <PersonaContext.Provider value={{ run, result }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used within PersonaProvider");
  }
  return context;
};
