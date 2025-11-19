# Summary reducers for Codex and Scroll memory (Phase XI — M39)
# NOTE: These are placeholder reducers. Real LLM-based summarization
# will be implemented in a future phase.

from typing import List, Optional


def _truncate(text: str, max_chars: int) -> str:
    """Conservative truncation helper: keep the last max_chars characters."""
    if not text:
        return ""
    if len(text) <= max_chars:
        return text
    return text[-max_chars:]


def reduce_codex_memory(region_text: Optional[str], max_chars: int = 1000) -> str:
    """Returns a size-bounded codex summary string.

    For M39, this is a simple truncation-based reducer. Later phases may
    replace this with a true summarization model.
    """
    if not region_text:
        return ""
    return _truncate(region_text, max_chars)


def reduce_scroll_memory(scroll_texts: List[str], max_chars: int = 2000) -> str:
    """Reduces a list of scroll texts into a single bounded summary.

    For M39, this is implemented as a naive join + truncate.
    """
    if not scroll_texts:
        return ""

    combined = "\n\n".join([s for s in scroll_texts if s])
    return _truncate(combined, max_chars)
