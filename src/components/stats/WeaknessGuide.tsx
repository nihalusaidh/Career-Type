"use client";

import { useMemo } from "react";
import type { TypingSession } from "@/types";

interface WeaknessGuideProps {
  sessions: TypingSession[];
}

interface KeyData {
  correct: number;
  total: number;
  accuracy: number;
}

const fingerMap: Record<string, string> = {
  q: "pinky", a: "pinky", z: "pinky",
  w: "ring", s: "ring", x: "ring",
  e: "middle", d: "middle", c: "middle",
  r: "index", t: "index", f: "index", g: "index", v: "index", b: "index",
  y: "index", u: "index", h: "index", j: "index", n: "index", m: "index",
  i: "middle", k: "middle", ",": "middle",
  o: "ring", l: "ring", ".": "ring",
  p: "pinky", ";": "pinky", "/": "pinky",
};

const fingerNames: Record<string, string> = {
  pinky: "Pinky fingers",
  ring: "Ring fingers",
  middle: "Middle fingers",
  index: "Index fingers",
};

export function WeaknessGuide({ sessions }: WeaknessGuideProps) {
  const analysis = useMemo(() => {
    const keyMap: Record<string, KeyData> = {};
    const fingerMap_: Record<string, { correct: number; total: number }> = {};
    let totalCorrect = 0;
    let totalAll = 0;

    for (const session of sessions) {
      for (const c of session.charHistory || []) {
        const char = c.char.toLowerCase();
        if (!keyMap[char]) keyMap[char] = { correct: 0, total: 0, accuracy: 0 };
        keyMap[char].total++;
        if (c.correct) keyMap[char].correct++;
        totalAll++;
        if (c.correct) totalCorrect++;

        const finger = fingerMap[char];
        if (finger) {
          if (!fingerMap_[finger]) fingerMap_[finger] = { correct: 0, total: 0 };
          fingerMap_[finger].total++;
          if (c.correct) fingerMap_[finger].correct++;
        }
      }
    }

    // Calculate accuracies
    for (const char of Object.keys(keyMap)) {
      keyMap[char].accuracy = Math.round((keyMap[char].correct / keyMap[char].total) * 100);
    }

    const worstKeys = Object.entries(keyMap)
      .filter(([, d]) => d.total >= 3)
      .sort(([, a], [, b]) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const fingerAccuracies = Object.entries(fingerMap_)
      .map(([finger, data]) => ({
        finger,
        label: fingerNames[finger] || finger,
        accuracy: Math.round((data.correct / data.total) * 100),
        total: data.total,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    const overallAccuracy = totalAll > 0 ? Math.round((totalCorrect / totalAll) * 100) : 100;

    // Common mistake categories
    const categories = [
      { key: "same-hand", label: "Same-hand sequences", info: "Practice alternating hands for faster typing" },
      { key: "top-row", label: "Top row (q-p)", info: "Reach and return to home row consistently" },
      { key: "bottom-row", label: "Bottom row (z-m)", info: "curl fingers down and back without looking" },
      { key: "symbols", label: "Symbols (!@#$%^&*)", info: "Shift key timing — press shift with opposite hand" },
      { key: "capital", label: "Capital letters", info: "Use opposite hand for Shift + letter" },
    ];

    let tip = "";
    if (worstKeys.length > 0) {
      const worst = worstKeys[0];
      tip = `Focus on "${worst[0] === " " ? "space" : worst[0]}" — ${worst[1].accuracy}% accuracy. ${worst[0] === " " ? "Use either thumb, keep others still." : "Use the correct finger and maintain home row."}`;

      // finger tip
      const worstFinger = fingerAccuracies[0];
      if (worstFinger && worstFinger.accuracy < 85) {
        tip += ` Your ${worstFinger.label.toLowerCase()} need practice (${worstFinger.accuracy}%).`;
      }
    }

    return { worstKeys, fingerAccuracies, overallAccuracy, tip, categories };
  }, [sessions]);

  if (analysis.worstKeys.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--ct-text-secondary)]">
        More data needed for personalized guidance
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tip */}
      <div className="p-3 rounded-lg border border-[var(--ct-accent)]/20 bg-[var(--ct-accent)]/5">
        <div className="text-[10px] uppercase tracking-wider text-[var(--ct-accent)] font-semibold mb-1">
          Practice Tip
        </div>
        <p className="text-xs text-[var(--ct-text)] leading-relaxed">{analysis.tip}</p>
      </div>

      {/* Problem keys */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)] mb-2">
          Keys to improve
        </div>
        <div className="flex flex-wrap gap-1.5">
          {analysis.worstKeys.map(([char, data]) => (
            <div
              key={char}
              className="px-2 py-1 rounded-lg border border-red-500/20 bg-red-500/5 text-xs"
            >
              <span className="font-mono font-semibold text-[var(--ct-text)]">
                {char === " " ? "␣ space" : char}
              </span>
              <span className="text-[var(--ct-text-secondary)] ml-1">{data.accuracy}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Finger accuracy */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)] mb-2">
          Finger accuracy
        </div>
        <div className="space-y-1.5">
          {analysis.fingerAccuracies.map((fa) => (
            <div key={fa.finger} className="flex items-center gap-2">
              <span className="w-20 text-[10px] text-[var(--ct-text)]">{fa.label}</span>
              <div className="flex-1 h-2 rounded-full bg-[var(--ct-bg)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    fa.accuracy >= 95 ? "bg-green-500" : fa.accuracy >= 80 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${fa.accuracy}%` }}
                />
              </div>
              <span className="w-10 text-right text-[10px] font-mono tabular-nums text-[var(--ct-text-secondary)]">
                {fa.accuracy}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* General tips */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)] mb-2">
          Technique tips
        </div>
        <div className="space-y-1">
          {analysis.categories.slice(0, 3).map((cat) => (
            <div key={cat.key} className="text-xs text-[var(--ct-text-secondary)] flex items-start gap-2">
              <span className="text-[var(--ct-accent)] mt-0.5">•</span>
              <span>{cat.info}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
