# Temple Contracts (Phase XI — M36)
# Shared request/response schemas for Temple Lambda

class CloudMemory(dict):
    """Represents persisted cloud-side memory within the Temple."""
    pass

class InvokeRequest(dict):
    """
    Represents an incoming invocation request from the Forge.

    Expected fields (all optional for M43, validated in later phases):
        - memory: dict
        - messages: list
        - meta: dict
        - invocationContext: {
              "sessionId": str,
              "threadId": str,
              "timestampMs": int
          }
        - cloudMemorySnapshot: dict
        - shapingFlags: {
              "debug": bool,
              "safeMode": bool,
              "trace": bool
          }
    """
    pass

class InvokeResponse(dict):
    """
    Represents the full Temple response envelope.

    Additional fields added in M43 (populated in later milestones):
        - builderDiagnostics: dict
        - shaperDiagnostics: dict
        - payloadPreview: dict
    """
    pass

class SummaryRequest(dict):
    """Request for codex/scroll summary generation."""
    pass


class SummaryResponse(dict):
    """Response carrying summary text and related metadata."""
    pass


def validate_invoke_request(req: dict) -> bool:
    """
    Sanity validator stub for InvokeRequest.
    Future phases will implement full validation.
    """
    return isinstance(req, dict)
