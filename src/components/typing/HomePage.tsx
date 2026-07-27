"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingStore } from "@/store/typingStore";
import { careers } from "@/data/careers";
import { getRandomPassage } from "@/content/index";
import { getTimeFromTestType } from "@/lib/utils";
import { TypingEngine } from "./TypingEngine";
import type { TestType, TypingMode } from "@/types";

const wordList = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know",
  "take", "people", "into", "year", "your", "good", "some", "could",
  "them", "see", "other", "than", "then", "now", "look", "only", "come",
  "its", "over", "think", "also", "back", "after", "use", "two", "how",
  "our", "work", "first", "well", "way", "even", "new", "want", "because",
  "any", "these", "give", "day", "most", "us", "function", "const", "let",
  "var", "return", "import", "export", "default", "class", "extends",
  "async", "await", "try", "catch", "throw", "finally", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "typeof",
  "instanceof", "this", "super", "new", "delete", "void", "in", "of",
  "key", "value", "data", "type", "string", "number", "boolean", "array",
  "object", "null", "undefined", "true", "false", "map", "filter", "reduce",
  "forEach", "find", "some", "every", "includes", "push", "pop", "shift",
  "unshift", "slice", "splice", "concat", "join", "split", "indexOf",
  "length", "name", "select", "from", "where", "insert", "update", "delete",
  "create", "alter", "drop", "table", "index", "primary", "foreign", "key",
  "order", "group", "having", "limit", "offset", "join", "inner", "left",
  "right", "full", "outer", "cross", "on", "and", "or", "not", "like",
  "between", "in", "exists", "unique", "default", "constraint", "check",
  "git", "commit", "push", "pull", "fetch", "branch", "merge", "rebase",
  "clone", "status", "log", "diff", "stash", "tag", "remote", "origin",
  "master", "main", "feature", "fix", "hotfix", "release", "develop",
  "npm", "yarn", "install", "build", "test", "start", "run", "dev",
  "server", "client", "route", "api", "endpoint", "middleware", "handler",
  "app", "get", "post", "put", "patch", "delete", "response", "request",
  "status", "error", "message", "header", "body", "params", "query", "token",
  "user", "admin", "login", "logout", "register", "auth", "session", "cookie",
  "email", "password", "hash", "salt", "encrypt", "decrypt", "verify",
  "html", "css", "jsx", "tsx", "component", "props", "state", "effect",
  "hook", "context", "ref", "memo", "callback", "reducer", "dispatch",
  "store", "action", "reducer", "selector", "thunk", "saga", "async",
  "python", "java", "rust", "go", "ruby", "php", "swift", "kotlin",
  "docker", "kubernetes", "aws", "azure", "gcp", "linux", "shell", "bash",
  "code", "type", "speed", "fast", "practice", "learn", "keyboard", "skill",
  "accuracy", "words", "per", "minute", "test", "lesson", "career", "work",
  "typing", "better", "faster", "stronger", "focus", "goal", "progress", "level"
];

function generateWordPassage(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  return words.join(" ");
}

function getRandomQuote(): string {
  const all = careers.flatMap((c) =>
    c.subCategories.map((s) => getRandomPassage(c.id, s.id))
  );
  return all[Math.floor(Math.random() * all.length)] || "Practice makes perfect.";
}

export function HomePage() {
  const store = useTypingStore();
  const [mode, setMode] = useState<TypingMode>("career");
  const [careerId, setCareerId] = useState(store.career || "developer");
  const [subId, setSubId] = useState(store.subCategory || "");
  const [testType, setTestType] = useState<TestType>(store.testType);
  const [passageKey, setPassageKey] = useState(0);
  const [wordCount, setWordCount] = useState(25);
  const [customText, setCustomText] = useState("");

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
    const c = careers.find((x) => x.id === id);
    const firstSub = c?.subCategories[0]?.id ?? "";
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

  const handleModeChange = useCallback((newMode: TypingMode) => {
    setMode(newMode);
    store.setMode(newMode);
    store.reset();
    setPassageKey((k) => k + 1);
  }, [store]);

  const passage = useMemo(() => {
    if (mode === "words") {
      return generateWordPassage(wordCount);
    }
    if (mode === "quotes") {
      return getRandomQuote();
    }
    if (mode === "custom") {
      return customText || "Paste your text above to begin.";
    }
    if (!subId) return "";
    return getRandomPassage(careerId, subId);
  }, [mode, careerId, subId, passageKey, wordCount, customText]);

  const modeTabs: { id: TypingMode; label: string }[] = [
    { id: "career", label: "Career" },
    { id: "words", label: "Words" },
    { id: "quotes", label: "Quotes" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4">
      {/* Controls bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {/* Mode tabs */}
        <div className="flex gap-0.5 p-0.5 rounded-lg border border-[var(--ct-border)] bg-[var(--ct-card)]/30">
          {modeTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleModeChange(t.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                mode === t.id
                  ? "bg-[var(--ct-accent)] text-white"
                  : "text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[var(--ct-border)]" />

        {/* Career selector */}
        {mode === "career" && (
          <>
            <select
              value={careerId}
              onChange={(e) => handleCareerChange(e.target.value)}
              className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)]"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={subId}
              onChange={(e) => handleSubChange(e.target.value)}
              className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)]"
            >
              {subCategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </>
        )}

        {/* Words count */}
        {mode === "words" && (
          <select
            value={wordCount}
            onChange={(e) => { setWordCount(Number(e.target.value)); setPassageKey((k) => k + 1); }}
            className="bg-[var(--ct-bg)] text-[var(--ct-text)] border border-[var(--ct-border)] rounded-lg px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)]"
          >
            {[10, 25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>{n} words</option>
            ))}
          </select>
        )}

        <div className="w-px h-5 bg-[var(--ct-border)]" />

        {/* Time buttons */}
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

        <div className="w-px h-5 bg-[var(--ct-border)]" />

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

      {/* Custom text input */}
      {mode === "custom" && (
        <div className="mb-4">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Paste or type your own text here..."
            rows={4}
            className="w-full p-3 rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)]/50 text-sm text-[var(--ct-text)] placeholder-[var(--ct-text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--ct-accent)] resize-none"
          />
        </div>
      )}

      {/* Typing Engine */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${careerId}-${subId}-${passageKey}`}
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
