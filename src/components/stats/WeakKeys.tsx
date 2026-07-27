"use client";

import { useMemo } from "react";
import type { TypingSession } from "@/types";

interface WeakKeysProps {
  sessions: TypingSession[];
}

export function WeakKeys({ sessions }: WeakKeysProps) {
  const keyErrors = useMemo(() => {
    const stats: Record<string, { total: number; errors: number }> = {};

    for (const session of sessions) {
      for (const ch of session.charHistory) {
        const key = ch.char.toLowerCase();
        if (!stats[key]) stats[key] = { total: 0, errors: 0 };
        stats[key].total++;
        if (!ch.correct) stats[key].errors++;
      }
    }

    return Object.entries(stats)
      .filter(([, s]) => s.total >= 3)
      .map(([key, s]) => ({
        key,
        total: s.total,
        errors: s.errors,
        errorRate: Math.round((s.errors / s.total) * 100),
      }))
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 10);
  }, [sessions]);

  const fingerStats = useMemo(() => {
    const fingerMap: Record<string, string[]> = {
      "Left Pinky": ["q", "a", "z", "1", "`"],
      "Left Ring": ["w", "s", "x", "2"],
      "Left Middle": ["e", "d", "c", "3"],
      "Left Index": ["r", "t", "f", "g", "v", "b", "4", "5"],
      "Right Index": ["y", "u", "h", "j", "n", "m", "6", "7"],
      "Right Middle": ["i", "k", ",", "8"],
      "Right Ring": ["o", "l", ".", "9"],
      "Right Pinky": ["p", ";", "/", "0", "-", "=", "[", "]", "'", "\\"],
    };

    const fingers: Record<string, { total: number; errors: number }> = {};
    for (const session of sessions) {
      for (const ch of session.charHistory) {
        const key = ch.char.toLowerCase();
        for (const [finger, keys] of Object.entries(fingerMap)) {
          if (keys.includes(key)) {
            if (!fingers[finger]) fingers[finger] = { total: 0, errors: 0 };
            fingers[finger].total++;
            if (!ch.correct) fingers[finger].errors++;
            break;
          }
        }
      }
    }

    return Object.entries(fingers)
      .map(([finger, s]) => ({
        finger,
        total: s.total,
        errors: s.errors,
        errorRate: Math.round((s.errors / s.total) * 100),
      }))
      .sort((a, b) => b.errorRate - a.errorRate);
  }, [sessions]);

  if (keyErrors.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--ct-text-secondary)]">
        Complete typing tests to see weak key analysis
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)] mb-3">
          Most Mistyped Characters
        </h3>
        <div className="space-y-1.5">
          {keyErrors.map((k) => (
            <div key={k.key} className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--ct-bg)] border border-[var(--ct-border)] font-mono text-sm text-[var(--ct-text)]">
                {k.key === " " ? "␣" : k.key}
              </span>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-[var(--ct-bg)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--ct-error)] transition-all"
                    style={{ width: `${k.errorRate}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-[var(--ct-text-secondary)] font-mono w-12 text-right">
                {k.errorRate}%
              </span>
              <span className="text-xs text-[var(--ct-text-secondary)] w-16 text-right">
                {k.errors}/{k.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)] mb-3">
          Weak Fingers
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {fingerStats.map((f) => {
            const intensity = f.errorRate / 100;
            return (
              <div
                key={f.finger}
                className="p-3 rounded-xl border border-[var(--ct-border)] bg-[var(--ct-bg)]"
                style={{
                  borderColor: intensity > 0.1 ? `var(--ct-error)` : `var(--ct-border)`,
                }}
              >
                <div className="text-xs font-medium text-[var(--ct-text)]">{f.finger}</div>
                <div className="text-lg font-bold font-mono tabular-nums text-[var(--ct-error)]">
                  {f.errorRate}%
                </div>
                <div className="text-[10px] text-[var(--ct-text-secondary)]">
                  {f.errors} errors in {f.total} keystrokes
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
