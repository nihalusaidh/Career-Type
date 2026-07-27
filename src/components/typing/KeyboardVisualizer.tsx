"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyboardVisualizerProps {
  pressedKey: string | null;
}

const keyRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export function KeyboardVisualizer({ pressedKey }: KeyboardVisualizerProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!pressedKey) return;
    setActiveKey(pressedKey);
    const timer = setTimeout(() => setActiveKey(null), 100);
    return () => clearTimeout(timer);
  }, [pressedKey]);

  return (
    <div className="hidden sm:flex flex-col items-center gap-1 mt-4">
      {keyRows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <div
              key={key}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-mono transition-all duration-75 ${
                activeKey === key
                  ? "bg-[var(--ct-accent)] text-white scale-95"
                  : "bg-[var(--ct-card)] text-[var(--ct-text-secondary)] border border-[var(--ct-border)]"
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
