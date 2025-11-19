# Temple Memory Store Stub (Phase XI — M41)
# NOTE: This is an in-memory placeholder. Future phases may replace
# this with a persistent backing store (Redis, DynamoDB, S3, etc.).

from typing import Dict, Any


_memory_store: Dict[str, Any] = {}


def load_memory() -> Dict[str, Any]:
    """Return the current cloud memory snapshot.

    For M41, this is just the in-memory dict. A future implementation
    may load this from a persistent backing store.
    """
    # Return a shallow copy to avoid accidental external mutation
    return dict(_memory_store)


def save_memory(memory: Dict[str, Any]) -> None:
    """Persist the given cloud memory snapshot.

    For M41, this updates the in-memory dict in place.
    """
    if not isinstance(memory, dict):
        return

    _memory_store.clear()
    _memory_store.update(memory)


def clear_memory() -> None:
    """Clear all stored cloud memory."""
    _memory_store.clear()
