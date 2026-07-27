"use client";

import { useMemo } from "react";
import type { TypingSession } from "@/types";

interface HeatmapProps {
  sessions: TypingSession[];
}

const keyRows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

export function Heatmap({ sessions }: HeatmapProps) {
  const keyStats = useMemo(() => {
    const stats: Record<string, { total: number; errors: number }> = {};

    for (const session of sessions) {
      for (const ch of session.charHistory) {
        const key = ch.char.toLowerCase();
        if (!stats[key]) {
          stats[key] = { total: 0, errors: 0 };
        }
        stats[key].total++;
        if (!ch.correct) {
          stats[key].errors++;
        }
      }
    }

    return stats;
  }, [sessions]);

  const hasData = Object.keys(keyStats).length > 0;

  function getIntensity(key: string): number {
    const stat = keyStats[key];
    if (!stat || stat.total === 0) return 0;
    return Math.min(stat.errors / stat.total, 1);
  }

  function getBgColor(intensity: number): string {
    if (intensity === 0) return "var(--ct-card)";
    if (intensity < 0.05) return `${accentColor(intensity * 20)}`;
    if (intensity < 0.1) return `${accentColor(40)}`;
    if (intensity < 0.2) return `${accentColor(60)}`;
    return `${accentColor(80)}`;
  }

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--ct-text-secondary)]">
        Complete typing tests to see your heatmap
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      {keyRows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => {
            const intensity = getIntensity(key);
            const stat = keyStats[key];
            return (
              <div
                key={key}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-mono transition-colors group cursor-default"
                style={{
                  backgroundColor: intensity > 0
                    ? `color-mix(in srgb, var(--ct-error) ${Math.round(intensity * 100)}%, var(--ct-card))`
                    : "var(--ct-card)",
                  color: intensity > 0.3 ? "white" : "var(--ct-text-secondary)",
                  border: "1px solid var(--ct-border)",
                }}
              >
                {key === " " ? "␣" : key}
                {stat && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-[var(--ct-card)] border border-[var(--ct-border)] text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                    {stat.errors}/{stat.total} errors
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function accentColor(opacity: number): string {
  return `color-mix(in srgb, var(--ct-error) ${opacity}%, transparent)`;
}
