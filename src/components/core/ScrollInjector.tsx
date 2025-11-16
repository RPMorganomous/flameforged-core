import React, { useState } from "react";
import { useScroll } from "@/modules/scroll/ScrollContext";

const ScrollInjector: React.FC = () => {
  const [scrollContent, setScrollContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const { loadScroll, scroll, error, lambdaExtract, lambdaScrollStatus } = useScroll();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Load scroll through ScrollContext
    await loadScroll(file);

    // Also keep raw content for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setScrollContent(text);
    };
    reader.readAsText(file);
  };

  const handleClearScroll = () => {
    setScrollContent("");
    setFileName("");
    // Note: ScrollContext doesn't have a clear method yet, but local state is cleared
    // Reset file input
    const fileInput = document.getElementById("scroll-file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="text-gray-200">
      {/* Title and Subtitle */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-2">📜 Scroll Injector</h2>
        <p className="text-zinc-400">Load and preview ritual scrolls.</p>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <input
          id="scroll-file-input"
          type="file"
          accept=".md,.txt"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-300 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700"
        />
        {fileName && (
          <p className="mt-2 text-sm text-zinc-400">Loaded: {fileName}</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Scroll Metadata Display */}
      {scroll && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Scroll Metadata</h3>

          <div className="space-y-2">
            <div>
              <span className="text-zinc-400 text-sm">Title:</span>
              <p className="text-zinc-200 font-semibold">{scroll.metadata.title || "Untitled Scroll"}</p>
            </div>

            <div>
              <span className="text-zinc-400 text-sm">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {scroll.metadata.tags.length > 0 ? (
                  scroll.metadata.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-orange-600/20 border border-orange-600/40 rounded text-orange-400 text-xs">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-500 text-sm">No tags</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-zinc-400 text-sm">Sections:</span>
              <p className="text-zinc-200">{scroll.sections.length}</p>
            </div>

            {scroll.sections.length > 0 && (
              <div>
                <span className="text-zinc-400 text-sm">Section Headings:</span>
                <ul className="mt-2 ml-4 space-y-1">
                  {scroll.sections.map((section, i) => (
                    <li key={i} className="text-zinc-300 text-sm">
                      • {section.heading}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleClearScroll}
          disabled={!scrollContent}
          className={`px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
            scrollContent
              ? "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800"
              : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
          }`}
        >
          Clear Scroll
        </button>
        <button
          onClick={lambdaExtract}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
        >
          Test Lambda
        </button>
      </div>

      {lambdaScrollStatus && (
        <div className="mb-4 p-3 bg-gray-900 rounded border border-orange-600/40">
          <p className="text-orange-400 text-sm">Lambda Response: {lambdaScrollStatus}</p>
        </div>
      )}

      {/* Scrollable Preview Box */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
        {scrollContent ? (
          <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
            {scrollContent}
          </pre>
        ) : (
          <p className="text-zinc-500 text-center">
            No scroll loaded. Upload a .md or .txt scroll to preview.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScrollInjector;
