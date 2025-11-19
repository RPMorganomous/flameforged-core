# Lambda Invoke Handler (Phase XII — M48)
# Full invocation pipeline with message shaping, payload building, and response shaping.

import time
import uuid
from lambda.memory.merge import merge_memory
from lambda.memory.safety_filters import sanitize_incoming, sanitize_delta
from lambda.memory.store import load_memory, save_memory
from lambda.invoke.message_shaper import shape_messages
from lambda.invoke.request_builder import build_payload
from lambda.logs.logger import log_invocation_start, log_invocation_payload, log_invocation_response
from lambda.invoke.response_shaper import shape_response

def handler(event, context):
    """
    event: {
        "memory": { ... incoming CloudMemory ... },
        "messages": [...],   # message packet from Forge
        "meta": {...},       # metadata (session, user, etc.)
        "invocationContext": {...}  # session/thread IDs, timestamp
    }
    """

    start = time.time()

    # 1. Extract request
    req = event or {}

    # 2. Extract fields safely
    incoming_memory = req.get("memory") or {}
    messages = req.get("messages") or []
    meta = req.get("meta") or {}

    # 3. Sanitize incoming memory
    incoming_memory = sanitize_incoming(incoming_memory)

    # 4. Load existing cloud memory from store
    existing_memory = load_memory()

    # 5. Compute delta
    delta = merge_memory(existing_memory, incoming_memory)

    # 6. Sanitize delta
    delta = sanitize_delta(delta)

    # 7. Apply delta to existing memory to derive next cloud memory state
    next_memory = dict(existing_memory)
    next_memory.update(delta)

    # 8. Persist updated memory snapshot
    save_memory(next_memory)

    # 9. Shape incoming messages
    shaped_messages = shape_messages(messages)

    # 10. Build payload
    payload_bundle = build_payload(
        shaped_messages=shaped_messages,
        cloud_memory=existing_memory,
        invocation_context=req.get("invocationContext", {}),
        invocation_settings=meta.get("settings")
    )

    # 11. Log start + payload
    log_invocation_start(req.get("invocationContext", {}))
    log_invocation_payload(payload_bundle.get("payload", {}))

    # 12. Simulate model output (placeholder for Phase XIII)
    model_output = {
        "replyText": "Temple acknowledges invocation (Phase XII — simulated)."
    }

    # 13. Shape final response
    final_response = shape_response(
        model_output=model_output,
        cloud_delta=delta,
        diagnostics=payload_bundle.get("diagnostics", {})
    )

    # 14. Log final response
    log_invocation_response(final_response)

    # 15. Invocation metadata
    invocation_id = str(uuid.uuid4())
    model_name = "temple-stub-model-v1"
    latency_ms = int((time.time() - start) * 1000)
    timestamp_ms = int(time.time() * 1000)

    # 16. Return structured response
    return {
        "success": True,
        "replyText": final_response.get("replyText"),
        "invocationId": invocation_id,
        "modelName": model_name,
        "latencyMs": latency_ms,
        "cloudStateDelta": final_response.get("cloudStateDelta"),
        "metadata": final_response.get("metadata"),
        "timestampMs": timestamp_ms
    }
