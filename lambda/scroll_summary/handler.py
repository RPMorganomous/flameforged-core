# Lambda Scroll Summary Handler (Phase XI — M39)

from lambda.memory.summary_reducers import reduce_scroll_memory
from lambda.memory.safety_filters import sanitize_incoming


def handler(event, context):
    scroll_texts = event.get("scrollTexts") or []

    if not isinstance(scroll_texts, list):
        scroll_texts = []

    # Sanitize scroll texts
    scroll_texts = sanitize_incoming({"t": "\n\n".join(scroll_texts)}).get("t", "").split("\n\n")

    summary_text = reduce_scroll_memory(scroll_texts)

    return {
        "success": True,
        "summaries": [],  # placeholder for per-scroll summaries in future phases
        "aggregateSummaryText": summary_text,
        "latencyMs": None
    }
