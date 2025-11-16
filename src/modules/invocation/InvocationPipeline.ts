import type { RitualAction } from "./InvocationActions";
import { wait } from "@/utils/wait";
import { log } from "@/utils/log";

export interface RitualStep {
  id: string;
  action: RitualAction;
}

const queue: RitualStep[] = [];
let isProcessing = false;

export const pushStep = (step: RitualStep) => {
  queue.push(step);
  processQueue();
};

const processQueue = async () => {
  if (isProcessing) return;
  if (queue.length === 0) return;

  isProcessing = true;

  const step = queue.shift()!;
  log("[Pipeline] Executing action:", step.action.type, step.action.payload);

  await wait(200); // simulate async

  log("[Pipeline] Action complete:", step.action.type);
  isProcessing = false;

  if (queue.length > 0) processQueue();
};
