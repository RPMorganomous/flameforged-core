# Temple Admin — Memory Snapshot (Phase XI — M42)

from lambda.memory.store import load_memory

def handler(event, context):
    return {
        "success": True,
        "snapshot": load_memory()
    }
