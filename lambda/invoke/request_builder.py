# Cloud Request Builder (Phase XII — M45)
# Constructs the model invocation payload using shaped messages + memory.

from typing import Dict, Any, List


DEFAULT_SETTINGS = {
    "model": "temple-model-stub",
    "temperature": 0.4,
    "max_tokens": 512,
    "top_p": 0.95
}

MAX_PAYLOAD_CHARS = 20000


def _truncate_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Truncates oversized payload fields to prevent runaway memory usage.
    Conservative: truncates ONLY large string values.
    """
    trimmed = {}

    for k, v in payload.items():
        if isinstance(v, str) and len(v) > MAX_PAYLOAD_CHARS:
            trimmed[k] = v[-MAX_PAYLOAD_CHARS:]
        else:
            trimmed[k] = v

    return trimmed


def build_payload(
    shaped_messages: Dict[str, Any],
    cloud_memory: Dict[str, Any],
    invocation_context: Dict[str, Any],
    invocation_settings: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Build the LLM-ready payload used in Phase XIII.
    Returns:
        {
            "payload": {...},
            "diagnostics": {...}
        }
    """

    if invocation_settings is None:
        invocation_settings = DEFAULT_SETTINGS.copy()

    diagnostics = {
        "messageCount": len(shaped_messages.get("messages", [])),
        "truncatedMessages": shaped_messages.get("diagnostics", {}).get("truncatedMessages", 0),
        "droppedMessages": shaped_messages.get("diagnostics", {}).get("droppedMessages", 0),
        "hasMemory": bool(cloud_memory),
        "settingsUsed": invocation_settings
    }

    payload = {
        "messages": shaped_messages.get("messages", []),
        "memory": cloud_memory,
        "context": invocation_context,
        "settings": invocation_settings
    }

    payload = _truncate_payload(payload)

    return {
        "payload": payload,
        "diagnostics": diagnostics
    }
