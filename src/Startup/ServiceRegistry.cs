using Microsoft.Extensions.DependencyInjection;
using FlameForged.Invocation;

namespace FlameForged.Startup
{
    public static class ServiceRegistry
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<InvocationLogger>();
            services.AddSingleton<InvocationHistoryService>();
            services.AddSingleton<InvocationSanitizer>();
            services.AddSingleton<ContextBufferService>();
            services.AddHttpClient<CloudInvocationClient>();
            services.AddHttpClient<StreamInvocationService>();
            services.AddTransient<InvocationPipeline>();
            services.AddTransient<InvocationBinding>();
            services.AddTransient<StreamInvocationService>();
        }
    }
}
