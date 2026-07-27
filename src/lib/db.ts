import { get, set, del, keys } from "idb-keyval";
import type { UserStats, Settings } from "@/types";
import { generateId } from "./utils";

const STATS_KEY = "careertype-stats";
const SETTINGS_KEY = "careertype-settings";

export function getDefaultStats(): UserStats {
  return {
    totalSessions: 0,
    totalTime: 0,
    totalChars: 0,
    totalCorrectChars: 0,
    totalMistakes: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    totalWpm: 0,
    sessions: [],
    achievements: [],
    lastSessionDate: null,
    currentDayStreak: 0,
  };
}

export function getDefaultSettings(): Settings {
  return {
    theme: "dark",
    sound: "mechanical",
    soundVolume: 50,
    countdown: true,
    cursorStyle: "block",
    fontSize: 18,
    language: "en",
  };
}

export async function getStats(): Promise<UserStats> {
  try {
    const stats = await get(STATS_KEY);
    return stats ?? getDefaultStats();
  } catch {
    return getDefaultStats();
  }
}

export async function saveStats(stats: UserStats): Promise<void> {
  await set(STATS_KEY, stats);
}

export async function getSettings(): Promise<Settings> {
  try {
    const settings = await get(SETTINGS_KEY);
    return settings ?? getDefaultSettings();
  } catch {
    return getDefaultSettings();
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await set(SETTINGS_KEY, settings);
}

export async function resetAllData(): Promise<void> {
  const allKeys = await keys();
  for (const key of allKeys) {
    await del(key);
  }
}

export function getSessionKey(id: string): string {
  return `session-${id}`;
}
