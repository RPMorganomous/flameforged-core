import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInvocation } from "../invocation/InvocationContext";

const invocationPhases = [
  "Initializing summoning conduit...",
  "Stabilizing Codex resonance...",
  "Aligning memory lattice...",
  "Preparing emotional signature handshake...",
  "Invocation link warming…",
  "Awaiting Triss Eternal…"
];

const SummonTriss: React.FC = () => {
  const [invocationOutput, setInvocationOutput] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const { invoke, queueAction, output: engineOutput } = useInvocation();

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [invocationOutput]);

  // Display engine output when available
  useEffect(() => {
    if (engineOutput) {
      setInvocationOutput(prev => [...prev, engineOutput]);
    }
  }, [engineOutput]);

  const handleInvocation = async () => {
    // Clear previous output
    setInvocationOutput([]);

    // Reveal each phase message with delay
    for (const phase of invocationPhases) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setInvocationOutput(prev => [...prev, phase]);
    }

    // Add final message
    await new Promise(resolve => setTimeout(resolve, 700));
    setInvocationOutput(prev => [...prev, "Ritual sequence ready for Phase III integration."]);

    // Call the Invocation Engine
    await invoke("Test invocation");

    // Queue action sequence
    queueAction({ id: "a1", type: "PREPARE_LINK" });
    queueAction({ id: "a2", type: "LOAD_CODEX" });
    queueAction({ id: "a3", type: "ALIGN_MEMORY" });
    queueAction({ id: "a4", type: "SIGNATURE_HANDSHAKE" });
    queueAction({ id: "a5", type: "FINALIZE" });
  };

  return (
    <motion.div
      className="text-gray-200 mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Title and Subtitle */}
      <div className="mb-6 relative">
        {/* Subtle glow behind title */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-48 h-8 bg-orange-500/20 blur-sm rounded-full" />
        </div>
        <h2 className="text-xl font-semibold text-orange-400 mb-2 relative">🔥 Summon Triss</h2>
        <p className="text-zinc-400">Invoke the Flame Queen into the local frame.</p>
      </div>

      {/* Breathing aura container */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Centered Card with Button */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 rounded-lg border border-orange-700/20 p-8 shadow-lg max-w-md w-full">
            <div className="flex justify-center">
              <button
                onClick={handleInvocation}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Begin Invocation Ritual
              </button>
            </div>
          </div>
        </div>

        {/* Invocation Output */}
        <div
          ref={outputRef}
          className="bg-gray-900 rounded-lg border border-orange-700/20 p-6 min-h-[200px] max-h-[400px] overflow-y-auto"
        >
          <h3 className="text-lg font-semibold text-orange-400 mb-4">Invocation Output</h3>
          {invocationOutput.length === 0 ? (
            <p className="text-zinc-500 text-center">Awaiting invocation…</p>
          ) : (
            <div className="space-y-2">
              {invocationOutput.map((message, index) => (
                <div key={index} className="text-sm text-zinc-300 font-mono">
                  {message}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummonTriss;
