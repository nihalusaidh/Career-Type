"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingStore } from "@/store/typingStore";
import { careers } from "@/data/careers";
import { getRandomPassage } from "@/content/index";
import { getTimeFromTestType } from "@/lib/utils";
import { TypingEngine } from "./TypingEngine";
import { TestTypeSelector } from "./TestTypeSelector";
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
    <div className="mx-auto max-w-5xl px-4 pt-3 pb-10">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]/80 backdrop-blur-sm"
      >
        {/* Career row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ct-text-secondary)] min-w-[44px]">
            Career
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {careers.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCareerChange(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  careerId === c.id
                    ? "bg-[var(--ct-accent)] text-white shadow-sm shadow-[var(--ct-accent)]/30"
                    : "text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] hover:bg-[var(--ct-bg)] border border-transparent"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[var(--ct-border)] mb-3" />

        {/* Topic row */}
        {subCategories.length > 0 && (
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ct-text-secondary)] min-w-[44px]">
              Topic
            </span>
            <div className="flex gap-1.5 flex-wrap max-h-20 overflow-y-auto">
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubChange(sub.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    subId === sub.id
                      ? "bg-[var(--ct-accent)]/15 text-[var(--ct-accent)] border border-[var(--ct-accent)]/30"
                      : "text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] border border-transparent"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Separator */}
        <div className="h-px bg-[var(--ct-border)] mb-3" />

        {/* Time row */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ct-text-secondary)] min-w-[44px]">
            Time
          </span>
          <TestTypeSelector selected={testType} onSelect={handleTestTypeChange} />
          <button
            onClick={handleNewPassage}
            className="ml-auto px-3 py-1.5 text-xs font-medium rounded-lg text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] hover:bg-[var(--ct-bg)] border border-transparent transition-all flex items-center gap-1.5"
            title="New passage"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Text
          </button>
        </div>
      </motion.div>

      {/* Typing Engine */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${careerId}-${subId}-${passageKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
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
