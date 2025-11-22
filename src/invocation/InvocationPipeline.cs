using System.Threading.Tasks;

namespace FlameForged.Invocation
{
    public class InvocationPipeline
    {
        private readonly CloudInvocationClient _client;
        private readonly InvocationSanitizer _sanitizer;
        private readonly ContextBufferService _buffer;

        public InvocationPipeline(CloudInvocationClient client, InvocationSanitizer sanitizer, ContextBufferService buffer)
        {
            _client = client;
            _sanitizer = sanitizer;
            _buffer = buffer;
        }

        public async Task<string> InvokeAsync(string prompt)
        {
            if (string.IsNullOrWhiteSpace(prompt))
                return string.Empty;

            var result = await _client.InvokeAsync(prompt);
            result = _sanitizer.Clean(result);
            _buffer.Add(prompt, result);
            return result;
        }
    }
}
