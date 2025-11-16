import React, { createContext, useContext, useState } from "react";
import { runCohesionTest } from "./CohesionTest";
import { useInvocation } from "../invocation/InvocationContext";
import { useCodex } from "../codex/CodexContext";
import { useScroll } from "../scroll/ScrollContext";
import { usePersona } from "../persona/PersonaContext";
import { useGPU } from "../gpu/GPUContext";

interface CohesionContextValue {
  runTest: () => Promise<void>;
  result: string | null;
}

const CohesionContext = createContext<CohesionContextValue | undefined>(undefined);

export const CohesionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<string | null>(null);

  const invocation = useInvocation();
  const codex = useCodex();
  const scroll = useScroll();
  const persona = usePersona();
  const gpu = useGPU();

  const runTest = async (): Promise<void> => {
    const testResult = await runCohesionTest({
      invocation,
      codex,
      scroll,
      persona,
      gpu
    });
    setResult(testResult.message);
  };

  return (
    <CohesionContext.Provider value={{ runTest, result }}>
      {children}
    </CohesionContext.Provider>
  );
};

export const useCohesion = () => {
  const context = useContext(CohesionContext);
  if (!context) {
    throw new Error("useCohesion must be used within CohesionProvider");
  }
  return context;
};
