using System;
using System.Collections.Generic;

namespace FlameForged.Invocation
{
    public class ContextBufferService
    {
        private readonly Queue<ContextBufferEntry> _buffer = new Queue<ContextBufferEntry>();
        private const int MaxEntries = 10;

        public void Add(string prompt, string completion)
        {
            var entry = new ContextBufferEntry
            {
                TimestampUtc = DateTime.UtcNow,
                Prompt = prompt,
                Completion = completion
            };

            _buffer.Enqueue(entry);

            while (_buffer.Count > MaxEntries)
                _buffer.Dequeue();
        }

        public IEnumerable<ContextBufferEntry> GetAll()
        {
            return _buffer.ToArray();
        }
    }
}
