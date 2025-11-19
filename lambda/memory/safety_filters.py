# Cloud Memory Safety Filters (Phase XI — M40)
# Ensures incoming memory and outgoing deltas remain safe and bounded.

from typing import Dict, Any

# Maximum safe sizes (temporary defaults)
MAX_VALUE_CHARS = 5000
MAX_KEYS = 200

# Keys NOT allowed in cloud memory (forbidden for security or size)
FORBIDDEN_KEYS = {
    "debugRawPrompt",
    "rawPrompt",
    "fullContext",
    "llmTrace",
    "conversationHistory",
}

def sanitize_incoming(memory: Dict[str, Any]) -> Dict[str, Any]:
    """Sanitize incoming CloudMemory before merge."""
    if not isinstance(memory, dict):
        return {}

    cleaned = {}

    for key, value in memory.items():
        if key in FORBIDDEN_KEYS:
            continue

        # Limit number of keys
        if len(cleaned) >= MAX_KEYS:
            break

        # Null values ignored
        if value is None:
            continue

        # Restrict value size
        if isinstance(value, str):
            if len(value) > MAX_VALUE_CHARS:
                value = value[-MAX_VALUE_CHARS:]

        cleaned[key] = value

    return cleaned


def sanitize_delta(delta: Dict[str, Any]) -> Dict[str, Any]:
    """Sanitize outgoing cloudStateDelta after merge."""
    if not isinstance(delta, dict):
        return {}

    cleaned = {}

    for key, value in delta.items():
        if key in FORBIDDEN_KEYS:
            continue

        if value is None:
            continue

        if isinstance(value, str):
            if len(value) > MAX_VALUE_CHARS:
                value = value[-MAX_VALUE_CHARS:]

        cleaned[key] = value

    return cleaned
