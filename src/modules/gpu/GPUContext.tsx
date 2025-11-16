import React, { createContext, useContext, useState } from "react";
import { performHandshake } from "./GPUService";
import type { GPUHandshakeResult } from "./gpuTypes";
import { lambdaGPUHandshake } from "../lambda/LambdaService";

interface GPUContextValue {
  handshake: () => Promise<void>;
  result: GPUHandshakeResult | null;
  lambdaHandshake: () => Promise<void>;
  lambdaGPUStatus: string | null;
}

const GPUContext = createContext<GPUContextValue | undefined>(undefined);

export const GPUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<GPUHandshakeResult | null>(null);
  const [lambdaGPUStatus, setLambdaGPUStatus] = useState<string | null>(null);

  const handshake = async (): Promise<void> => {
    const handshakeResult = await performHandshake();
    setResult(handshakeResult);
  };

  const lambdaHandshake = async (): Promise<void> => {
    const lambdaResult = await lambdaGPUHandshake();
    if (lambdaResult.ok && lambdaResult.data) {
      setLambdaGPUStatus(lambdaResult.data);
    }
  };

  return (
    <GPUContext.Provider value={{ handshake, result, lambdaHandshake, lambdaGPUStatus }}>
      {children}
    </GPUContext.Provider>
  );
};

export const useGPU = () => {
  const context = useContext(GPUContext);
  if (!context) {
    throw new Error("useGPU must be used within GPUProvider");
  }
  return context;
};
