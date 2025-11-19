import type { BuiltPrompt } from "./PromptBuilder";

export const PromptDebugPanel = ({ prompt }: { prompt: BuiltPrompt | null }) => {
  if (!prompt) return <div>No prompt built yet.</div>;

  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
      <h2>Prompt Debug View</h2>
      <hr />
      {prompt.promptText}
    </div>
  );
};
