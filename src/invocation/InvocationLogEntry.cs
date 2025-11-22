namespace FlameForged.Invocation
{
    public class InvocationLogEntry
    {
        public DateTime TimestampUtc { get; set; }
        public string Prompt { get; set; }
        public string Completion { get; set; }
    }
}
