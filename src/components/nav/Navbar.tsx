"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes } from "@/data/themes";
import { useThemeStore } from "@/store/themeStore";
import { useSettingsStore } from "@/store/settingsStore";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { currentTheme, setTheme } = useThemeStore();
  const { settings, updateSetting } = useSettingsStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--ct-border)] bg-[var(--ct-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--ct-text)]">
              Career<span className="text-[var(--ct-accent)]">Type</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/typing/developer" className="px-3 py-1.5 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors">
              Practice
            </Link>
            <Link href="/stats" className="px-3 py-1.5 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors">
              Stats
            </Link>
            <Link href="/settings" className="px-3 py-1.5 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors">
              Settings
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)] shadow-xl overflow-hidden"
                  >
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); updateSetting("theme", t.id); setThemeMenuOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-[var(--ct-bg-secondary)] transition-colors ${currentTheme.id === t.id ? "text-[var(--ct-accent)]" : "text-[var(--ct-text)]"}`}
                      >
                        <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: t.colors.accent }} />
                        {t.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[var(--ct-border)] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <Link href="/typing/developer" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)]">Practice</Link>
              <Link href="/stats" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)]">Stats</Link>
              <Link href="/settings" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] rounded-lg hover:bg-[var(--ct-card)]">Settings</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
