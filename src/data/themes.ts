import { Theme } from "@/types";

export const themes: Theme[] = [
  {
    id: "dark",
    name: "Dark+",
    type: "dark",
    colors: {
      background: "#1e1e1e",
      backgroundSecondary: "#252526",
      text: "#d4d4d4",
      textSecondary: "#969696",
      accent: "#007acc",
      error: "#f44747",
      correct: "#d4d4d4",
      incorrect: "#f44747",
      extra: "#ce9178",
      caret: "#aeafad",
      sub: "#6a6a6a",
      card: "#2d2d2d",
      border: "#3c3c3c",
    },
  },
  {
    id: "light",
    name: "Light+",
    type: "light",
    colors: {
      background: "#ffffff",
      backgroundSecondary: "#f3f3f3",
      text: "#333333",
      textSecondary: "#717171",
      accent: "#007acc",
      error: "#e51400",
      correct: "#333333",
      incorrect: "#e51400",
      extra: "#ce9178",
      caret: "#333333",
      sub: "#a0a0a0",
      card: "#ffffff",
      border: "#e0e0e0",
    },
  },
];
