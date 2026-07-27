"use client";

import { useEffect, useState } from "react";
import { useStatsStore } from "@/store/statsStore";
import { achievements } from "@/data/achievements";
import { Card } from "@/components/ui/Card";

export function AchievementsPageClient() {
  const { stats, loadStats } = useStatsStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadStats().then(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--ct-text)] mb-6">
        Achievements
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((ach) => {
          const unlocked = stats.achievements.includes(ach.id);
          return (
            <Card
              key={ach.id}
              className={`${unlocked ? "border-[var(--ct-accent)]/50" : "opacity-50"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    unlocked
                      ? "bg-[var(--ct-accent)]/10 text-[var(--ct-accent)]"
                      : "bg-[var(--ct-bg)] text-[var(--ct-text-secondary)]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        unlocked
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-5.364a9 9 0 11-12.728 0"
                      }
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--ct-text)]">
                    {ach.name}
                  </h3>
                  <p className="text-xs text-[var(--ct-text-secondary)]">
                    {ach.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
