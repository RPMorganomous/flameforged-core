# Temple Admin — System Info (Phase XI — M42)

import time
from lambda.memory.store import load_memory

# Module-level timestamp initialized when Lambda container is created
START_TIME = time.time()

def handler(event, context):
    uptime = int(time.time() - START_TIME)
    memory_snapshot = load_memory()

    return {
        "success": True,
        "version": "temple-admin-v1",
        "uptimeSeconds": uptime,
        "memoryKeys": len(memory_snapshot),
        "lastInvocationTimestamp": context.aws_request_id if context else None
    }
