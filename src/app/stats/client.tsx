"use client";

import { useEffect, useState } from "react";
import { useStatsStore } from "@/store/statsStore";
import { useThemeStore } from "@/store/themeStore";
import { Card } from "@/components/ui/Card";
import { WPMChart } from "@/components/stats/WPMChart";
import { AccuracyChart } from "@/components/stats/AccuracyChart";
import { Heatmap } from "@/components/stats/Heatmap";
import { WeakKeys } from "@/components/stats/WeakKeys";
import { ErrorDistribution } from "@/components/stats/ErrorDistribution";
import { DailyPracticeChart } from "@/components/stats/DailyPracticeChart";
import { formatDuration, getAverageWpm, getConsistency } from "./utils";

export function StatsPageClient() {
  const { stats, loadStats } = useStatsStore();
  const { currentTheme } = useThemeStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadStats().then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[var(--ct-text-secondary)]">Loading stats...</p>
      </div>
    );
  }

  const c = currentTheme.colors;
  const recent = stats.sessions.slice(-30);
  const hasData = stats.sessions.length > 0;

  const statCards = [
    { label: "Total Sessions", value: stats.totalSessions },
    { label: "Best WPM", value: stats.bestWpm, highlight: true },
    { label: "Average WPM", value: getAverageWpm(stats) },
    { label: "Best Accuracy", value: `${stats.bestAccuracy}%` },
    { label: "Total Time", value: formatDuration(stats.totalTime) },
    { label: "Current Streak", value: `${stats.currentDayStreak}d` },
    { label: "Longest Streak", value: `${stats.longestStreak}d` },
    { label: "Consistency", value: hasData ? `${getConsistency(stats.sessions)}%` : "0%" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--ct-text)] mb-6">
        Your Statistics
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((s) => (
          <Card key={s.label}>
            <div className="text-center">
              <div className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)]">
                {s.label}
              </div>
              <div className={`text-2xl font-bold mt-1 ${s.highlight ? "text-[var(--ct-accent)]" : "text-[var(--ct-text)]"}`}>
                {s.value}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!hasData ? (
        <Card>
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto mb-4 text-[var(--ct-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <p className="text-[var(--ct-text-secondary)]">
              No typing sessions yet. Start a test to see your stats!
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* WPM + Accuracy charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">WPM Over Time</h2>
              <WPMChart sessions={recent} accentColor={c.accent} textSecondary={c.textSecondary} />
            </Card>
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Accuracy Over Time</h2>
              <AccuracyChart sessions={recent} accentColor={c.accent} errorColor={c.error} textSecondary={c.textSecondary} />
            </Card>
          </div>

          {/* Daily Practice */}
          <Card className="mb-4">
            <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Daily Practice</h2>
            <DailyPracticeChart sessions={stats.sessions} accentColor={c.accent} textSecondary={c.textSecondary} />
          </Card>

          {/* Heatmap + Weak Keys */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Keyboard Heatmap</h2>
              <p className="text-xs text-[var(--ct-text-secondary)] mb-3">Hover a key to see error count. Darker = more errors.</p>
              <Heatmap sessions={stats.sessions} />
            </Card>
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Weak Keys &amp; Fingers</h2>
              <WeakKeys sessions={stats.sessions} />
            </Card>
          </div>

          {/* Error Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Error Distribution</h2>
              <ErrorDistribution sessions={stats.sessions} accentColor={c.accent} textSecondary={c.textSecondary} />
            </Card>
            <Card>
              <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-sm">Career Breakdown</h2>
              <CareerBreakdown sessions={stats.sessions} />
            </Card>
          </div>

          {/* Recent Sessions */}
          <Card>
            <h2 className="font-semibold text-[var(--ct-text)] mb-4 text-sm">Recent Sessions</h2>
            <div className="space-y-1">
              {[...stats.sessions].reverse().slice(0, 15).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-[var(--ct-bg)] text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--ct-accent)]/10 text-[var(--ct-accent)] font-medium capitalize text-[10px]">
                      {session.career}
                    </span>
                    <span className="text-[var(--ct-text-secondary)] truncate">
                      {session.subCategory}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[var(--ct-text)]">
                    <span className="tabular-nums">{session.wpm} wpm</span>
                    <span className={`tabular-nums ${session.accuracy >= 95 ? "text-green-500" : session.accuracy >= 80 ? "text-yellow-500" : "text-red-500"}`}>
                      {session.accuracy}%
                    </span>
                    <span className="text-[var(--ct-text-secondary)]">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function CareerBreakdown({ sessions }: { sessions: any[] }) {
  const counts: Record<string, number> = {};
  for (const s of sessions) {
    counts[s.career] = (counts[s.career] || 0) + 1;
  }
  const total = sessions.length;
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--ct-text-secondary)]">
        No session data
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map(([career, count]) => (
        <div key={career} className="flex items-center gap-3">
          <span className="w-20 text-xs text-[var(--ct-text)] capitalize font-medium">{career}</span>
          <div className="flex-1 h-3 rounded-full bg-[var(--ct-bg)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--ct-accent)] transition-all"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[var(--ct-text-secondary)] font-mono w-10 text-right tabular-nums">
            {Math.round((count / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
}
