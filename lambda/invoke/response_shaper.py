# Cloud Response Shaper (Phase XII — M47)
# Prepares model output for safe consumption by the Forge.

from typing import Dict, Any
from lambda.memory.safety_filters import sanitize_delta

MAX_REPLY_CHARS = 2000


def _truncate_reply(reply: str) -> str:
    if not isinstance(reply, str):
        return ""
    if len(reply) <= MAX_REPLY_CHARS:
        return reply
    return reply[-MAX_REPLY_CHARS:]


def shape_response(
    model_output: Dict[str, Any],
    cloud_delta: Dict[str, Any],
    diagnostics: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Returns:
        {
            "replyText": str,
            "cloudStateDelta": dict,
            "metadata": dict
        }
    """

    raw_reply = model_output.get("replyText") or ""
    safe_reply = _truncate_reply(raw_reply)

    safe_delta = sanitize_delta(cloud_delta or {})

    metadata = {
        "shaperDiagnostics": diagnostics or {},
        "replyLength": len(safe_reply)
    }

    return {
        "replyText": safe_reply,
        "cloudStateDelta": safe_delta,
        "metadata": metadata
    }
