"use client";

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  totalChars: number;
  timeLeft: number | null;
  status: string;
}

export function StatsBar({ wpm, accuracy, mistakes, totalChars, timeLeft, status }: StatsBarProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isActive = status === "active";
  const isFinished = status === "finished";

  const stats = [
    {
      label: "WPM",
      value: wpm,
      highlight: wpm >= 100,
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      highlight: accuracy >= 95,
    },
    {
      label: "Mistakes",
      value: mistakes,
      highlight: false,
    },
    {
      label: "Chars",
      value: totalChars,
      highlight: false,
    },
    {
      label: "Time",
      value: timeLeft !== null ? formatTime(timeLeft) : "∞",
      highlight: false,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8 p-3.5 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]/60 backdrop-blur-sm">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ct-text-secondary)]">
            {stat.label}
          </span>
          <span
            className={`text-xl font-bold tabular-nums mt-0.5 transition-colors ${
              stat.highlight ? "text-[var(--ct-accent)]" : "text-[var(--ct-text)]"
            } ${isActive ? "" : isFinished ? "opacity-80" : "opacity-50"}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
