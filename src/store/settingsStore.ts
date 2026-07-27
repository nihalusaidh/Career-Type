import { create } from "zustand";
import type { Settings } from "@/types";
import { getDefaultSettings } from "@/lib/db";

interface SettingsState {
  settings: Settings;
  loaded: boolean;
  setSettings: (settings: Settings) => void;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  loadSettings: () => Promise<void>;
  persistSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: getDefaultSettings(),
  loaded: false,

  setSettings: (settings) => set({ settings }),

  updateSetting: (key, value) => {
    const current = get().settings;
    const updated = { ...current, [key]: value };
    set({ settings: updated });
    get().persistSettings();
  },

  loadSettings: async () => {
    const { getSettings } = await import("@/lib/db");
    const settings = await getSettings();
    set({ settings, loaded: true });
  },

  persistSettings: async () => {
    const { saveSettings } = await import("@/lib/db");
    await saveSettings(get().settings);
  },
}));
