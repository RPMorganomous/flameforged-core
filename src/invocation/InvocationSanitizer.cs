using System.Text.RegularExpressions;

namespace FlameForged.Invocation
{
    public class InvocationSanitizer
    {
        public string Clean(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return string.Empty;

            // Remove null chars
            input = input.Replace("\0", "");

            // Collapse excessive whitespace
            input = Regex.Replace(input, @"\s{2,}", " ");

            // Remove malformed/unicode anomalies
            input = Regex.Replace(input, @"[^\u0009\u000A\u000D\u0020-\u007E]", "");

            // Trim outer whitespace
            return input.Trim();
        }
    }
}
