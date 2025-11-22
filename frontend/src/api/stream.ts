export function streamInvocation(prompt: string): EventSource {
    const encoded = encodeURIComponent(prompt);
    return new EventSource(`/api/stream?prompt=${encoded}`);
}

export function closeStream(es: EventSource | null) {
    if (es) es.close();
}
