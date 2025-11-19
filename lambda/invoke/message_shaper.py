# Cloud Message Shaper (Phase XII — M44)
# Normalizes, filters, and bounds message chains before payload building.

from typing import List, Dict, Any
from lambda.memory.safety_filters import sanitize_incoming

MAX_MESSAGES = 30
MAX_MESSAGE_CHARS = 2000

VALID_ROLES = {"user", "assistant", "system"}


def _normalize_role(role: str) -> str:
    if not isinstance(role, str):
        return "user"
    role = role.lower().strip()
    return role if role in VALID_ROLES else "user"


def _truncate_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    if len(text) <= MAX_MESSAGE_CHARS:
        return text
    return text[-MAX_MESSAGE_CHARS:]


def shape_messages(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Returns:
        {
            "messages": [...],  # shaped list
            "diagnostics": {
                "inputCount": int,
                "outputCount": int,
                "truncatedMessages": int,
                "droppedMessages": int
            }
        }
    """
    if not isinstance(messages, list):
        return {"messages": [], "diagnostics": {}}

    shaped = []
    truncated = 0
    dropped = 0

    for msg in messages:
        if not isinstance(msg, dict):
            dropped += 1
            continue

        role = _normalize_role(msg.get("role"))
        content = msg.get("content")

        if not content:
            dropped += 1
            continue

        safe = sanitize_incoming({"t": content}).get("t", "")
        safe = _truncate_text(safe)

        if len(safe) < len(content):
            truncated += 1

        shaped.append({"role": role, "content": safe})

        if len(shaped) >= MAX_MESSAGES:
            break

    return {
        "messages": shaped,
        "diagnostics": {
            "inputCount": len(messages),
            "outputCount": len(shaped),
            "truncatedMessages": truncated,
            "droppedMessages": dropped
        }
    }
