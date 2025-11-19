# Temple Admin — Reset Cloud Memory (Phase XI — M42)

from lambda.memory.store import clear_memory, load_memory

def handler(event, context):
    clear_memory()
    return {
        "success": True,
        "message": "Cloud memory cleared.",
        "memory": load_memory()
    }
