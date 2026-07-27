"use client";

interface TimerProps {
  timeLeft: number | null;
  isActive: boolean;
}

export function Timer({ timeLeft, isActive }: TimerProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="text-center">
      <span className={`font-mono text-4xl font-bold tabular-nums ${
        isActive ? "text-[var(--ct-text)]" : "text-[var(--ct-text-secondary)]"
      }`}>
        {timeLeft !== null ? formatTime(timeLeft) : "--:--.-"}
      </span>
    </div>
  );
}
