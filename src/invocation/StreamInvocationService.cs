using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlameForged.Invocation
{
    public class StreamInvocationService
    {
        private readonly HttpClient _http;

        public StreamInvocationService(HttpClient http)
        {
            _http = http;
        }

        public async IAsyncEnumerable<string> StreamAsync(string prompt)
        {
            // Phase XIV v1: simple chunk simulation from real POST
            var payload = new { prompt };

            var response = await _http.PostAsJsonAsync("", payload);
            var text = await response.Content.ReadAsStringAsync();

            // Fake splitting for now; true streaming arrives in Phase XV.
            var chunks = text.Split(' ');

            foreach (var c in chunks)
            {
                yield return c;
                await Task.Delay(20);
            }
        }
    }
}
