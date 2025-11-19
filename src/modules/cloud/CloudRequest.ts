import { CloudLog } from "@/modules/logging/CloudLog";
import { CloudConfig } from "./CloudConfig";

export interface CloudRequestResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  latencyMs: number;
}

const TIMEOUT_MS = 20000;

export async function cloudPost<T>(
  path: string,
  payload: any
): Promise<CloudRequestResult<T>> {
  const start = performance.now();

  if (!CloudConfig.baseUrl) {
    const result = {
      ok: false,
      status: 0,
      error: "NO_BASE_URL",
      latencyMs: 0
    };

    CloudLog.record({
      path,
      ok: result.ok,
      status: result.status,
      latencyMs: result.latencyMs,
      error: result.error
    });

    CloudConfig.online = result.ok;
    CloudConfig.lastLatency = result.latencyMs;

    return result;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${CloudConfig.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const latencyMs = performance.now() - start;

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      /* ignore bad JSON */
    }

    const result = {
      ok: res.ok,
      status: res.status,
      data: data ?? undefined,
      error: res.ok ? undefined : `HTTP_${res.status}`,
      latencyMs
    };

    CloudLog.record({
      path,
      ok: result.ok,
      status: result.status,
      latencyMs: result.latencyMs,
      error: result.error
    });

    CloudConfig.online = result.ok;
    CloudConfig.lastLatency = result.latencyMs;

    return result;
  } catch (err: any) {
    clearTimeout(timeout);

    const latencyMs = performance.now() - start;
    const result = {
      ok: false,
      status: 0,
      error: err?.name === "AbortError" ? "TIMEOUT" : "NETWORK_ERROR",
      latencyMs
    };

    CloudLog.record({
      path,
      ok: result.ok,
      status: result.status,
      latencyMs: result.latencyMs,
      error: result.error
    });

    CloudConfig.online = result.ok;
    CloudConfig.lastLatency = result.latencyMs;

    return result;
  }
}
