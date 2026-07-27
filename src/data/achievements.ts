import { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "100-wpm",
    name: "Speed Demon",
    description: "Reach 100 WPM in any test",
    icon: "zap",
    condition: (stats) => stats.bestWpm >= 100,
  },
  {
    id: "150-wpm",
    name: "Speed Monster",
    description: "Reach 150 WPM in any test",
    icon: "flame",
    condition: (stats) => stats.bestWpm >= 150,
  },
  {
    id: "perfect-accuracy",
    name: "Perfect",
    description: "Complete a test with 100% accuracy",
    icon: "target",
    condition: (stats) => stats.bestAccuracy === 100,
  },
  {
    id: "100-sessions",
    name: "Dedicated",
    description: "Complete 100 typing sessions",
    icon: "award",
    condition: (stats) => stats.totalSessions >= 100,
  },
  {
    id: "500-sessions",
    name: "Committed",
    description: "Complete 500 typing sessions",
    icon: "star",
    condition: (stats) => stats.totalSessions >= 500,
  },
  {
    id: "1000-sessions",
    name: "Typing Legend",
    description: "Complete 1000 typing sessions",
    icon: "crown",
    condition: (stats) => stats.totalSessions >= 1000,
  },
  {
    id: "7-day-streak",
    name: "Consistent",
    description: "Practice for 7 days in a row",
    icon: "calendar",
    condition: (stats) => stats.currentDayStreak >= 7,
  },
  {
    id: "30-day-streak",
    name: "Unstoppable",
    description: "Practice for 30 days in a row",
    icon: "calendar-check",
    condition: (stats) => stats.currentDayStreak >= 30,
  },
  {
    id: "developer-master",
    name: "Developer Master",
    description: "Complete 50 developer typing sessions",
    icon: "code",
    condition: (stats) =>
      stats.sessions.filter((s) => s.career === "developer").length >= 50,
  },
  {
    id: "office-expert",
    name: "Office Expert",
    description: "Complete 50 office typing sessions",
    icon: "briefcase",
    condition: (stats) =>
      stats.sessions.filter((s) => s.career === "office").length >= 50,
  },
  {
    id: "typing-champion",
    name: "Typing Champion",
    description: "Achieve a top 3 rank in a multiplayer race",
    icon: "trophy",
    condition: () => false,
  },
];
