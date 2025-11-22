using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace FlameForged.Invocation
{
    public class InvocationHistoryService
    {
        private const string LogDirectory = "logs";
        private const string LogFileName = "invocation-log.jsonl";

        public List<InvocationLogEntry> LoadHistory()
        {
            var list = new List<InvocationLogEntry>();
            var path = Path.Combine(LogDirectory, LogFileName);

            if (!File.Exists(path))
                return list;

            foreach (var line in File.ReadLines(path))
            {
                try
                {
                    var entry = JsonSerializer.Deserialize<InvocationLogEntry>(line);
                    if (entry != null)
                        list.Add(entry);
                }
                catch { /* Ignore malformed lines */ }
            }

            return list;
        }
    }
}
