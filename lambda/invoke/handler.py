# Lambda Invoke Handler (Phase XI — M38)
# Produces structured invocation responses and cloudStateDelta.

import time
import uuid
from lambda.memory.merge import merge_memory
from lambda.memory.safety_filters import sanitize_incoming, sanitize_delta
from lambda.memory.store import load_memory, save_memory

def handler(event, context):
    """
    event: {
        "memory": { ... incoming CloudMemory ... },
        "messages": [...],   # message packet from Forge
        "meta": {...}        # metadata (session, user, etc.)
    }
    """

    start = time.time()

    # Extract fields safely
    incoming_memory = event.get("memory") or {}
    messages = event.get("messages") or []
    meta = event.get("meta") or {}

    # Sanitize incoming memory
    incoming_memory = sanitize_incoming(incoming_memory)

    # Load existing cloud memory from store
    existing_memory = load_memory()

    # Compute delta
    delta = merge_memory(existing_memory, incoming_memory)

    # Sanitize delta
    delta = sanitize_delta(delta)

    # Apply delta to existing memory to derive next cloud memory state
    next_memory = dict(existing_memory)
    next_memory.update(delta)

    # Persist updated memory snapshot
    save_memory(next_memory)

    # Stub reply (actual model invocation in Phase XIII)
    reply_text = "Temple received your invocation (stub)."

    # Invocation metadata
    invocation_id = str(uuid.uuid4())
    model_name = "temple-stub-model-v1"
    latency_ms = int((time.time() - start) * 1000)

    # Optional: timestamp future admin panels may use
    timestamp_ms = int(time.time() * 1000)

    return {
        "success": True,
        "replyText": reply_text,
        "invocationId": invocation_id,
        "modelName": model_name,
        "latencyMs": latency_ms,
        "cloudStateDelta": delta,
        "messagesEcho": messages,
        "metaEcho": meta,
        "timestampMs": timestamp_ms
    }
