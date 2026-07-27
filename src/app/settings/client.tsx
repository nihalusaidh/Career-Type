"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { useThemeStore } from "@/store/themeStore";
import { themes } from "@/data/themes";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStatsStore } from "@/store/statsStore";

export function SettingsPageClient() {
  const { settings, updateSetting, loadSettings } = useSettingsStore();
  const { setTheme } = useThemeStore();
  const { resetStats } = useStatsStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--ct-text)] mb-6">
        Settings
      </h1>

      <div className="space-y-4">
        {/* Theme */}
        <Card>
          <h2 className="font-semibold text-[var(--ct-text)] mb-3">Theme</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); updateSetting("theme", t.id); }}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  settings.theme === t.id
                    ? "border-[var(--ct-accent)] bg-[var(--ct-accent)]/10"
                    : "border-[var(--ct-border)] hover:border-[var(--ct-text-secondary)]"
                }`}
              >
                <span
                  className="block w-full h-6 rounded-lg mb-1"
                  style={{ backgroundColor: t.colors.background }}
                />
                <span className="text-xs text-[var(--ct-text)]">{t.name}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Sound */}
        <Card>
          <h2 className="font-semibold text-[var(--ct-text)] mb-3">Keyboard Sound</h2>
          <div className="flex gap-2 mb-3">
            {["mechanical", "laptop", "typewriter", "silent"].map((s) => (
              <button
                key={s}
                onClick={() => updateSetting("sound", s as any)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${
                  settings.sound === s
                    ? "bg-[var(--ct-accent)] text-white"
                    : "bg-[var(--ct-bg)] text-[var(--ct-text-secondary)] border border-[var(--ct-border)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs text-[var(--ct-text-secondary)] block mb-1">
              Volume: {settings.soundVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.soundVolume}
              onChange={(e) => updateSetting("soundVolume", parseInt(e.target.value))}
              className="w-full accent-[var(--ct-accent)]"
            />
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <h2 className="font-semibold text-[var(--ct-text)] mb-3">Preferences</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--ct-text)]">Countdown Timer</span>
              <button
                onClick={() => updateSetting("countdown", !settings.countdown)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  settings.countdown ? "bg-[var(--ct-accent)]" : "bg-[var(--ct-border)]"
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transform transition-transform mt-0.5 ${
                  settings.countdown ? "translate-x-5 ml-0.5" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--ct-text)]">Cursor Style</span>
              <select
                value={settings.cursorStyle}
                onChange={(e) => updateSetting("cursorStyle", e.target.value as any)}
                className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-3 py-1 text-sm"
              >
                <option value="block">Block</option>
                <option value="line">Line</option>
                <option value="underline">Underline</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--ct-text)]">Font Size</span>
              <input
                type="number"
                min="12"
                max="32"
                value={settings.fontSize}
                onChange={(e) => updateSetting("fontSize", parseInt(e.target.value))}
                className="w-16 bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2 py-1 text-sm text-center"
              />
            </div>
          </div>
        </Card>

        {/* Reset */}
        <Card>
          <h2 className="font-semibold text-[var(--ct-text)] mb-3 text-red-500">
            Danger Zone
          </h2>
          <p className="text-sm text-[var(--ct-text-secondary)] mb-3">
            This will permanently delete all your local data, including typing history and settings.
          </p>
          <Button
            variant="danger"
            onClick={() => {
              if (confirm("Are you sure? This cannot be undone.")) {
                resetStats();
                loadSettings().then(() => {
                  setTheme("dark");
                  updateSetting("theme", "dark");
                });
              }
            }}
          >
            Reset All Data
          </Button>
        </Card>
      </div>
    </div>
  );
}
