using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FlameForged.Invocation;

namespace FlameForged.Controllers
{
    [ApiController]
    [Route("api/invocation")]
    public class InvocationController : ControllerBase
    {
        private readonly InvocationBinding _binding;

        public InvocationController(InvocationBinding binding)
        {
            _binding = binding;
        }

        [HttpPost]
        public async Task<IActionResult> Invoke([FromBody] InvocationRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Prompt))
                return BadRequest("Invalid request.");

            var result = await _binding.ExecuteAsync(request.Prompt);
            return Ok(new InvocationResponse { Text = result });
        }

        [HttpGet("history")]
        public IActionResult History([FromServices] InvocationHistoryService history)
        {
            var entries = history.LoadHistory();
            return Ok(entries);
        }

        [HttpGet("selftest")]
        public async Task<IActionResult> SelfTest([FromServices] InvocationBinding binding)
        {
            var prompt = "Temple Awakening Test";
            var result = await binding.ExecuteAsync(prompt);
            return Ok(new InvocationResponse { Text = result });
        }

        [HttpGet("context")]
        public IActionResult Context([FromServices] ContextBufferService buffer)
        {
            return Ok(buffer.GetAll());
        }
    }
}
