"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { useThemeStore } from "@/store/themeStore";
import { useSettingsStore } from "@/store/settingsStore";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { applyTheme } = useThemeStore();
  const { settings, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings().then(() => {
      const { getSettings } = require("@/lib/db");
      getSettings().then((s: any) => {
        if (s?.theme) {
          applyTheme(s.theme);
        }
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-14">{children}</main>
    </>
  );
}
