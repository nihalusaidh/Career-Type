import { create } from "zustand";
import { themes } from "@/data/themes";
import type { Theme } from "@/types";

interface ThemeState {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  applyTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: themes[0],

  setTheme: (themeId) => {
    const theme = themes.find((t) => t.id === themeId) ?? themes[0];
    set({ currentTheme: theme });
    applyThemeToDOM(theme);
  },

  applyTheme: (theme) => {
    set({ currentTheme: theme });
    applyThemeToDOM(theme);
  },
}));

function applyThemeToDOM(theme: Theme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty("--ct-bg", c.background);
  root.style.setProperty("--ct-bg-secondary", c.backgroundSecondary);
  root.style.setProperty("--ct-text", c.text);
  root.style.setProperty("--ct-text-secondary", c.textSecondary);
  root.style.setProperty("--ct-accent", c.accent);
  root.style.setProperty("--ct-error", c.error);
  root.style.setProperty("--ct-correct", c.correct);
  root.style.setProperty("--ct-incorrect", c.incorrect);
  root.style.setProperty("--ct-extra", c.extra);
  root.style.setProperty("--ct-caret", c.caret);
  root.style.setProperty("--ct-sub", c.sub);
  root.style.setProperty("--ct-card", c.card);
  root.style.setProperty("--ct-border", c.border);
  root.style.setProperty("--ct-type", theme.type);
}

export { themes };
