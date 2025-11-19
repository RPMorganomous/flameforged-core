# Temple Contracts (Phase XI — M36)
# Shared request/response schemas for Temple Lambda

class CloudMemory(dict):
    """Represents persisted cloud-side memory within the Temple."""
    pass

class InvokeRequest(dict):
    """Incoming invoke request with memory, messages, and meta."""
    pass

class InvokeResponse(dict):
    """Structured response including delta, metadata, and replyText."""
    pass

class SummaryRequest(dict):
    """Request for codex/scroll summary generation."""
    pass


class SummaryResponse(dict):
    """Response carrying summary text and related metadata."""
    pass
