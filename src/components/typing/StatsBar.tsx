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

  const stats = [
    { label: "WPM", value: wpm },
    { label: "Accuracy", value: `${accuracy}%` },
    { label: "Mistakes", value: mistakes },
    { label: "Chars", value: totalChars },
    { label: "Time", value: timeLeft !== null ? formatTime(timeLeft) : "∞" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)]">
            {stat.label}
          </span>
          <span className="text-2xl font-bold text-[var(--ct-text)] tabular-nums">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
