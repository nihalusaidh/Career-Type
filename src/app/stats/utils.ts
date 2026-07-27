import type { UserStats, TypingSession } from "@/types";

export function getAverageWpm(stats: UserStats): number {
  if (stats.totalSessions === 0) return 0;
  return Math.round(stats.totalWpm / stats.totalSessions);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getConsistency(sessions: TypingSession[]): number {
  if (sessions.length < 3) return 0;
  const recent = sessions.slice(-10);
  const wpms = recent.map((s) => s.wpm);
  const avg = wpms.reduce((a, b) => a + b, 0) / wpms.length;
  const variance = wpms.reduce((sum, w) => sum + Math.pow(w - avg, 2), 0) / wpms.length;
  const stdDev = Math.sqrt(variance);
  const consistency = Math.max(0, 100 - (stdDev / avg) * 100);
  return Math.round(consistency);
}
