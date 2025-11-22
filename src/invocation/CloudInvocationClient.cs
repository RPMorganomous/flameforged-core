using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace FlameForged.Invocation
{
    public class CloudInvocationClient
    {
        private readonly HttpClient _http;
        private readonly InvocationLogger _logger;

        public CloudInvocationClient(HttpClient http, InvocationLogger logger)
        {
            _http = http;
            _logger = logger;

            var config = InvocationConfig.Load("config/InvocationConfig.json");

            if (!string.IsNullOrWhiteSpace(config.Endpoint))
                _http.BaseAddress = new Uri(config.Endpoint);

            if (!string.IsNullOrWhiteSpace(config.ApiKey))
                _http.DefaultRequestHeaders.Add("Authorization", $"Bearer {config.ApiKey}");
        }

        public async Task<string> InvokeAsync(string prompt)
        {
            try
            {
                var payload = new InvocationRequest
                {
                    Model = "gpt-5.1",
                    Prompt = prompt
                };

                // Real model invocation (Phase XIV)
                var response = await _http.PostAsJsonAsync("", payload);

                if (!response.IsSuccessStatusCode)
                {
                    return $"Invocation failed: {response.StatusCode}";
                }

                var content = await response.Content.ReadAsStringAsync();

                // Normalize result
                if (!string.IsNullOrWhiteSpace(content))
                    content = content.Trim();

                if (_logger != null)
                {
                    var entry = new InvocationLogEntry
                    {
                        TimestampUtc = DateTime.UtcNow,
                        Prompt = prompt,
                        Completion = content
                    };

                    await _logger.LogAsync(entry);
                }

                return content;
            }
            catch (Exception ex)
            {
                return $"Invocation error: {ex.Message}";
            }
        }
    }
}
