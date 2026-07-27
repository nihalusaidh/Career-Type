"use client";

import { useEffect, useState } from "react";

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
    const timer = setTimeout(() => setActiveKey(null), 120);
    return () => clearTimeout(timer);
  }, [pressedKey]);

  return (
    <div className="flex flex-col items-center gap-1">
      {keyRows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => {
            const isActive = activeKey === key;
            return (
              <div
                key={key}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-[10px] font-mono transition-all duration-75 ${
                  isActive
                    ? "bg-[var(--ct-accent)] text-white scale-95"
                    : "bg-[var(--ct-card)]/50 text-[var(--ct-text-secondary)] border border-[var(--ct-border)]"
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
