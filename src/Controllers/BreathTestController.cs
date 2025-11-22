using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FlameForged.Invocation;

namespace FlameForged.Controllers
{
    [ApiController]
    [Route("api/breathtest")]
    public class BreathTestController : ControllerBase
    {
        private readonly InvocationPipeline _pipeline;

        public BreathTestController(InvocationPipeline pipeline)
        {
            _pipeline = pipeline;
        }

        [HttpGet]
        public async Task<IActionResult> Run()
        {
            var prompt = "Temple Breath Test v1";
            var result = await _pipeline.InvokeAsync(prompt);
            return Ok(new InvocationResponse { Text = result });
        }
    }
}
