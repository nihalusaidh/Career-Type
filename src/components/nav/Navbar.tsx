"use client";

import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";
import { useSettingsStore } from "@/store/settingsStore";

export function Navbar() {
  const { currentTheme, setTheme } = useThemeStore();
  const { settings, updateSetting } = useSettingsStore();

  const isDark = currentTheme.id === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    updateSetting("theme", next);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--ct-border)] bg-[var(--ct-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-base font-bold text-[var(--ct-text)] tracking-tight">
              Career<span className="text-[var(--ct-accent)]">Type</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/stats"
              className="px-3 py-1.5 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors"
            >
              Stats
            </Link>
            <Link
              href="/settings"
              className="px-3 py-1.5 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors"
            >
              Settings
            </Link>
            <div className="w-px h-4 bg-[var(--ct-border)] mx-1" />
            <button
              onClick={toggleTheme}
              className="p-1.5 text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors"
              title={isDark ? "Light theme" : "Dark theme"}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
