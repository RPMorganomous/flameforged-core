import React, { createContext, useContext, useState } from "react";
import { performHandshake, performGpuHandshake } from "./GPUService";
import type { GPUHandshakeResult } from "./gpuTypes";
import { lambdaGPUHandshake } from "../lambda/LambdaService";
import { cloudPost } from "@/utils/cloudPost";
import { requestCloudGPUStatus } from "./GPUCloudProcessor";

interface GPUContextValue {
  handshake: () => Promise<void>;
  result: GPUHandshakeResult | null;
  lambdaHandshake: () => Promise<void>;
  lambdaGPUStatus: string | null;
  checkGpu: () => Promise<void>;
  gpuStatus: "idle" | "checking" | "online" | "offline";
  gpuLatencyMs: number | null;
  gpuModel: string | null;
  gpuEndpoint: string | null;
  fetchCloudGPUStatus: () => Promise<void>;
  cloudStatus: "idle" | "checking" | "online" | "offline";
  cloudModel: string | null;
  cloudEndpoint: string | null;
  cloudLatency: number | null;
}

const GPUContext = createContext<GPUContextValue | undefined>(undefined);

export const GPUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<GPUHandshakeResult | null>(null);
  const [lambdaGPUStatus, setLambdaGPUStatus] = useState<string | null>(null);
  const [gpuStatus, setGpuStatus] = useState<"idle" | "checking" | "online" | "offline">("idle");
  const [gpuLatencyMs, setGpuLatencyMs] = useState<number | null>(null);
  const [gpuModel, setGpuModel] = useState<string | null>(null);
  const [gpuEndpoint, setGpuEndpoint] = useState<string | null>(null);
  const [cloudStatus, setCloudStatus] = useState<"idle" | "checking" | "online" | "offline">("idle");
  const [cloudModel, setCloudModel] = useState<string | null>(null);
  const [cloudEndpoint, setCloudEndpoint] = useState<string | null>(null);
  const [cloudLatency, setCloudLatency] = useState<number | null>(null);

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

  const checkGpu = async (): Promise<void> => {
    setGpuStatus("checking");

    const res = await performGpuHandshake();

    if (!res.ok) {
      setGpuStatus("offline");
      setGpuLatencyMs(null);
      setGpuModel(null);
      setGpuEndpoint(null);
      return;
    }

    setGpuStatus("online");
    setGpuLatencyMs(res.latencyMs);
    setGpuModel(res.model);
    setGpuEndpoint(res.endpoint);
  };

  const fetchCloudGPUStatus = async (): Promise<void> => {
    setCloudStatus("checking");

    const res = await requestCloudGPUStatus();

    if (!res.ok) {
      setCloudStatus("offline");
      setCloudModel(null);
      setCloudEndpoint(null);
      setCloudLatency(null);
      return;
    }

    setCloudStatus("online");
    setCloudModel(res.model);
    setCloudEndpoint(res.endpoint);
    setCloudLatency(res.latency);
  };

  return (
    <GPUContext.Provider value={{
      handshake,
      result,
      lambdaHandshake,
      lambdaGPUStatus,
      checkGpu,
      gpuStatus,
      gpuLatencyMs,
      gpuModel,
      gpuEndpoint,
      fetchCloudGPUStatus,
      cloudStatus,
      cloudModel,
      cloudEndpoint,
      cloudLatency
    }}>
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
