"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingStore } from "@/store/typingStore";
import { careers } from "@/data/careers";
import { getRandomPassage } from "@/content/index";
import { getTimeFromTestType } from "@/lib/utils";
import { TypingEngine } from "./TypingEngine";
import type { TestType } from "@/types";

export function HomePage() {
  const store = useTypingStore();
  const [careerId, setCareerId] = useState(store.career || "developer");
  const [subId, setSubId] = useState(store.subCategory || "");
  const [testType, setTestType] = useState<TestType>(store.testType);
  const [passageKey, setPassageKey] = useState(0);

  const career = careers.find((c) => c.id === careerId);
  const subCategories = career?.subCategories ?? [];

  useEffect(() => {
    if (!subId && subCategories.length > 0) {
      setSubId(subCategories[0].id);
    }
  }, [careerId]);

  const handleCareerChange = useCallback((id: string) => {
    setCareerId(id);
    store.setCareer(id);
    const career = careers.find((c) => c.id === id);
    const firstSub = career?.subCategories[0]?.id ?? "";
    setSubId(firstSub);
    store.setSubCategory(firstSub);
    setPassageKey((k) => k + 1);
  }, [store]);

  const handleSubChange = useCallback((id: string) => {
    setSubId(id);
    store.setSubCategory(id);
    setPassageKey((k) => k + 1);
  }, [store]);

  const handleTestTypeChange = useCallback((type: TestType) => {
    setTestType(type);
    store.setTestType(type);
  }, [store]);

  const handleNewPassage = useCallback(() => {
    setPassageKey((k) => k + 1);
  }, []);

  const passage = useMemo(() => {
    if (!subId) return "";
    return getRandomPassage(careerId, subId);
  }, [careerId, subId, passageKey]);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4">
      {/* Controls bar */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <select
          value={careerId}
          onChange={(e) => handleCareerChange(e.target.value)}
          className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)]"
        >
          {careers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={subId}
          onChange={(e) => handleSubChange(e.target.value)}
          className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)]"
        >
          {subCategories.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <div className="w-px h-5 bg-[var(--ct-border)] mx-1" />

        <div className="flex gap-0.5">
          {[
            { label: "30s", value: "30s" },
            { label: "60s", value: "60s" },
            { label: "120s", value: "120s" },
            { label: "5m", value: "5min" },
            { label: "10m", value: "10min" },
            { label: "∞", value: "unlimited" },
          ].map((t) => (
            <button
              key={t.value}
              onClick={() => handleTestTypeChange(t.value as TestType)}
              className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${
                testType === t.value
                  ? "bg-[var(--ct-accent)] text-white"
                  : "text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[var(--ct-border)] mx-1" />

        <button
          onClick={handleNewPassage}
          className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] hover:bg-[var(--ct-card)] transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          New
        </button>
      </div>

      {/* Typing Engine */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${careerId}-${subId}-${passageKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {passage ? (
            <TypingEngine
              passage={passage}
              careerId={careerId}
              subId={subId}
              testType={testType}
              duration={getTimeFromTestType(testType, undefined)}
              onNewPassage={handleNewPassage}
            />
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-[var(--ct-text-secondary)] text-sm">Select a topic to begin</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
