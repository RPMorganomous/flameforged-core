import { routeMemoryEvent } from "../../memory/nexus/nexus_router.js";

export function onTempleBoot() {
  routeMemoryEvent("frame_boot", { status: "temple_initialized" });
}
