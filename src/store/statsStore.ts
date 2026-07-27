import { create } from "zustand";
import type { UserStats, TypingSession } from "@/types";
import { getDefaultStats } from "@/lib/db";
import { getTodayString } from "@/lib/utils";

interface StatsState {
  stats: UserStats;
  loaded: boolean;
  loadStats: () => Promise<void>;
  persistStats: () => Promise<void>;
  addSession: (session: TypingSession) => void;
  addAchievement: (id: string) => void;
  resetStats: () => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: getDefaultStats(),
  loaded: false,

  loadStats: async () => {
    const { getStats } = await import("@/lib/db");
    const stats = await getStats();
    set({ stats, loaded: true });
  },

  persistStats: async () => {
    const { saveStats } = await import("@/lib/db");
    await saveStats(get().stats);
  },

  addSession: (session) => {
    const s = get().stats;
    const today = getTodayString();
    const lastDate = s.lastSessionDate;
    const isConsecutiveDay = lastDate
      ? isNextDay(lastDate, today)
      : true;
    const newDayStreak = lastDate === today
      ? s.currentDayStreak
      : isConsecutiveDay
        ? s.currentDayStreak + 1
        : 1;
    const newLongestStreak = Math.max(s.longestStreak, newDayStreak);

    const updated: UserStats = {
      totalSessions: s.totalSessions + 1,
      totalTime: s.totalTime + session.duration,
      totalChars: s.totalChars + session.totalChars,
      totalCorrectChars: s.totalCorrectChars + session.correctChars,
      totalMistakes: s.totalMistakes + session.mistakes,
      currentStreak: newDayStreak,
      longestStreak: newLongestStreak,
      bestWpm: Math.max(s.bestWpm, session.wpm),
      bestAccuracy: Math.max(s.bestAccuracy, session.accuracy),
      totalWpm: s.totalWpm + session.wpm,
      sessions: [...s.sessions, session],
      achievements: s.achievements,
      lastSessionDate: today,
      currentDayStreak: newDayStreak,
    };

    set({ stats: updated });
    get().persistStats();
  },

  addAchievement: (id) => {
    const s = get().stats;
    if (s.achievements.includes(id)) return;
    const updated = { ...s, achievements: [...s.achievements, id] };
    set({ stats: updated });
    get().persistStats();
  },

  resetStats: async () => {
    const { resetAllData } = await import("@/lib/db");
    await resetAllData();
    set({ stats: getDefaultStats() });
  },
}));

function isNextDay(last: string, today: string): boolean {
  const lastDate = new Date(last);
  const todayDate = new Date(today);
  const diff = (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 1 && diff < 2;
}
