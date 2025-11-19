# Temple Admin — Invocation Log Listing (Phase XII — M46)

from lambda.logs.logger import list_logs

def handler(event, context):
    return {
        "success": True,
        "logs": list_logs()
    }
