import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CodexSyncStatus = "idle" | "loading" | "active" | "error" | "saving";

interface CodexSyncIndicatorProps {
  status?: CodexSyncStatus;
}

const statusConfig = {
  idle: {
    gradient: "from-gray-400 to-gray-500",
    shadow: "0 0 8px 2px rgba(156, 163, 175, 0.3)",
    shadowAnimation: [
      "0 0 6px 2px rgba(156, 163, 175, 0.25)",
      "0 0 10px 3px rgba(156, 163, 175, 0.35)",
      "0 0 6px 2px rgba(156, 163, 175, 0.25)",
    ],
    scale: [1, 1.03, 1],
    duration: 2,
    opacity: 0.4,
    showText: false,
  },
  loading: {
    gradient: "from-orange-400 to-orange-500",
    shadow: "0 0 15px 4px rgba(251, 146, 60, 0.6)",
    shadowAnimation: [
      "0 0 12px 3px rgba(251, 146, 60, 0.5)",
      "0 0 18px 5px rgba(251, 146, 60, 0.7)",
      "0 0 12px 3px rgba(251, 146, 60, 0.5)",
    ],
    scale: [1, 1.15, 1],
    duration: 0.8,
    opacity: 1,
    showText: false,
  },
  active: {
    gradient: "from-orange-400 to-red-500",
    shadow: "0 0 30px 10px rgba(251, 146, 60, 1)",
    shadowAnimation: [
      "0 0 25px 8px rgba(251, 146, 60, 0.95)",
      "0 0 35px 12px rgba(251, 146, 60, 1)",
      "0 0 25px 8px rgba(251, 146, 60, 0.95)",
    ],
    scale: [1, 1.1, 1],
    duration: 2,
    opacity: 1,
    showText: true,
  },
  error: {
    gradient: "from-red-500 to-red-700",
    shadow: "0 0 15px 4px rgba(239, 68, 68, 0.8)",
    shadowAnimation: [
      "0 0 8px 2px rgba(239, 68, 68, 0.4)",
      "0 0 15px 4px rgba(239, 68, 68, 0.8)",
      "0 0 8px 2px rgba(239, 68, 68, 0.4)",
      "0 0 15px 4px rgba(239, 68, 68, 0.8)",
    ],
    scale: [1, 0.95, 1, 0.95, 1],
    duration: 0.4,
    opacity: 1,
    showText: false,
  },
  saving: {
    gradient: "from-blue-400 to-blue-600",
    shadow: "0 0 18px 5px rgba(59, 130, 246, 0.7)",
    shadowAnimation: [
      "0 0 15px 4px rgba(59, 130, 246, 0.6)",
      "0 0 20px 6px rgba(59, 130, 246, 0.8)",
      "0 0 15px 4px rgba(59, 130, 246, 0.6)",
    ],
    scale: [1, 1.12, 1],
    duration: 1.2,
    opacity: 1,
    showText: true,
  },
};

const CodexSyncIndicator: React.FC<CodexSyncIndicatorProps> = ({ status = "idle" }) => {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-5 h-5 rounded-full bg-gradient-to-br ${config.gradient}`}
        style={{
          boxShadow: config.shadow,
          opacity: config.opacity,
        }}
        animate={{
          boxShadow: config.shadowAnimation,
          scale: config.scale,
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        title={`Codex ${status}`}
      />
      <AnimatePresence>
        {config.showText && (
          <motion.span
            className="text-sm text-orange-400 font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {status === "saving" ? "Saving..." : "Codex Active"}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodexSyncIndicator;
