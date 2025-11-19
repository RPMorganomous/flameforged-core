# Lambda Codex Summary Handler (Phase XI — M39)

from lambda.memory.summary_reducers import reduce_codex_memory
from lambda.memory.safety_filters import sanitize_incoming


def handler(event, context):
    region_id = event.get("codexRegionId")
    region_text = event.get("regionText") or ""

    # Sanitize region text
    region_text = sanitize_incoming({"t": region_text}).get("t", "")

    summary_text = reduce_codex_memory(region_text)

    return {
        "success": True,
        "codexRegionId": region_id,
        "summaryText": summary_text,
        "sourceScrollIds": event.get("sourceScrollIds") or [],
        "checksum": None,
        "latencyMs": None
    }
