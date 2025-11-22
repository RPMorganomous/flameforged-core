using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Threading.Tasks;
using FlameForged.Invocation;

namespace FlameForged.Controllers
{
    [ApiController]
    [Route("api/stream")]
    public class StreamController : ControllerBase
    {
        private readonly StreamInvocationService _service;

        public StreamController(StreamInvocationService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task Get([FromQuery] string prompt)
        {
            Response.Headers.Add("Content-Type", "text/event-stream");

            await foreach (var chunk in _service.StreamAsync(prompt))
            {
                var line = $"data: {chunk}\n\n";
                var bytes = Encoding.UTF8.GetBytes(line);
                await Response.Body.WriteAsync(bytes, 0, bytes.Length);
                await Response.Body.FlushAsync();
            }
        }
    }
}
