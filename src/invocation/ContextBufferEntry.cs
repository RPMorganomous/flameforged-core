using System;

namespace FlameForged.Invocation
{
    public class ContextBufferEntry
    {
        public DateTime TimestampUtc { get; set; }
        public string Prompt { get; set; }
        public string Completion { get; set; }
    }
}
