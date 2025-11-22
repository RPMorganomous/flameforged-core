using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlameForged.Invocation
{
    public class InvocationLogger
    {
        private const string LogDirectory = "logs";
        private const string LogFileName = "invocation-log.jsonl";

        public async Task LogAsync(InvocationLogEntry entry)
        {
            if (entry == null) return;

            Directory.CreateDirectory(LogDirectory);

            var path = Path.Combine(LogDirectory, LogFileName);
            var json = JsonSerializer.Serialize(entry);
            await File.AppendAllTextAsync(path, json + Environment.NewLine);
        }
    }
}
