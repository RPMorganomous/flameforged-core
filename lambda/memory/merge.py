# Cloud Memory Merge Engine (Phase XI — M37)
# Performs a safe, shallow merge and produces a delta dict.

def merge_memory(existing, incoming):
    """
    existing: dict (current cloud memory)
    incoming: dict (incoming memory slice from Forge)

    Returns:
        delta: dict (only changed values)
    """

    if not isinstance(existing, dict):
        existing = {}

    if not isinstance(incoming, dict):
        return {}

    delta = {}

    # Compare incoming to existing
    for key, value in incoming.items():
        # Rule: Never delete memory
        if value is None:
            continue

        # If key not in existing → it's a new memory field
        if key not in existing:
            delta[key] = value
            continue

        # If changed → include in delta
        if existing.get(key) != value:
            delta[key] = value

    return delta
