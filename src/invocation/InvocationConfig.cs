using System.Text.Json;

namespace FlameForged.Invocation
{
    public class InvocationConfig
    {
        public string Endpoint { get; set; }
        public string ApiKey { get; set; }
        public string Model { get; set; }

        public static InvocationConfig Load(string path)
        {
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<InvocationConfig>(json);
        }
    }
}
