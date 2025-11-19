export interface GpuStatusResponse {
  success: boolean;
  gpuAvailable: boolean;
  gpuName?: string;
  memoryTotalGb?: number;
  memoryFreeGb?: number;
  temperatureC?: number;
  loadPercent?: number;
  notes?: string;
  error?: string;
  latencyMs?: number;
}
