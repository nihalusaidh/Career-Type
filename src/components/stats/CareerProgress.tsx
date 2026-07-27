"use client";

import { useMemo } from "react";
import type { TypingSession } from "@/types";

interface CareerProgressProps {
  sessions: TypingSession[];
}

const skillTiers = [
  { label: "Beginner", minWpm: 0, color: "bg-gray-500" },
  { label: "Junior", minWpm: 30, color: "bg-blue-500" },
  { label: "Mid", minWpm: 50, color: "bg-green-500" },
  { label: "Senior", minWpm: 70, color: "bg-yellow-500" },
  { label: "Expert", minWpm: 90, color: "bg-purple-500" },
  { label: "Master", minWpm: 110, color: "bg-red-500" },
];

function getSkillTier(wpm: number) {
  let tier = skillTiers[0];
  for (const t of skillTiers) {
    if (wpm >= t.minWpm) tier = t;
  }
  return tier;
}

export function CareerProgress({ sessions }: CareerProgressProps) {
  const careerData = useMemo(() => {
    const map: Record<string, { sessions: TypingSession[]; wpmTotal: number; count: number }> = {};
    for (const s of sessions) {
      if (!map[s.career]) map[s.career] = { sessions: [], wpmTotal: 0, count: 0 };
      map[s.career].sessions.push(s);
      map[s.career].wpmTotal += s.wpm;
      map[s.career].count++;
    }
    return Object.entries(map)
      .map(([career, data]) => ({
        career,
        avgWpm: Math.round(data.wpmTotal / data.count),
        bestWpm: Math.max(...data.sessions.map((s) => s.wpm)),
        sessionCount: data.count,
        tier: getSkillTier(Math.round(data.wpmTotal / data.count)),
      }))
      .sort((a, b) => b.sessionCount - a.sessionCount);
  }, [sessions]);

  if (careerData.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--ct-text-secondary)]">
        Complete sessions in different careers to see progress
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {careerData.map((cd) => (
        <div key={cd.career} className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--ct-bg)]/50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[var(--ct-text)] capitalize">{cd.career}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white ${cd.tier.color}`}>
                  {cd.tier.label}
                </span>
                <span className="text-xs font-mono tabular-nums text-[var(--ct-accent)]">{cd.avgWpm} wpm</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--ct-bg)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--ct-accent)] transition-all"
                style={{ width: `${Math.min(100, (cd.avgWpm / 120) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-[var(--ct-text-secondary)]">{cd.sessionCount} sessions</span>
              <span className="text-[10px] text-[var(--ct-text-secondary)]">Best: {cd.bestWpm} wpm</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
