using System.Threading.Tasks;

namespace FlameForged.Invocation
{
    public class InvocationBinding
    {
        private readonly InvocationPipeline _pipeline;

        public InvocationBinding(InvocationPipeline pipeline)
        {
            _pipeline = pipeline;
        }

        public async Task<string> ExecuteAsync(string prompt)
        {
            return await _pipeline.InvokeAsync(prompt);
        }
    }
}
