"use client";

import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypingEngine as Engine } from "@/lib/typing-engine";
import { useTypingStore } from "@/store/typingStore";
import { useStatsStore } from "@/store/statsStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { KeyboardVisualizer } from "./KeyboardVisualizer";
import { WpmSparkline } from "./WpmSparkline";
import { CommandPalette } from "./CommandPalette";
import { Button } from "@/components/ui/Button";
import { generateId } from "@/lib/utils";
import type { TypingSession, TestType, CharSnapshot } from "@/types";

interface TypingEngineProps {
  passage: string;
  careerId: string;
  subId: string;
  testType: TestType;
  duration: number | null;
  onNewPassage: () => void;
}

function getPerKeyAccuracy(chars: CharSnapshot[]): Record<string, { correct: number; total: number; accuracy: number }> {
  const map: Record<string, { correct: number; total: number }> = {};
  for (const c of chars) {
    if (!map[c.char]) map[c.char] = { correct: 0, total: 0 };
    map[c.char].total++;
    if (c.correct) map[c.char].correct++;
  }
  const result: Record<string, { correct: number; total: number; accuracy: number }> = {};
  for (const [char, data] of Object.entries(map)) {
    result[char] = { ...data, accuracy: Math.round((data.correct / data.total) * 100) };
  }
  return result;
}

function getConsistencyScore(wpmHistory: { wpm: number }[]): number {
  if (wpmHistory.length < 2) return 100;
  const wpms = wpmHistory.map((w) => w.wpm);
  const avg = wpms.reduce((a, b) => a + b, 0) / wpms.length;
  if (avg === 0) return 100;
  const variance = wpms.reduce((sum, w) => sum + (w - avg) ** 2, 0) / wpms.length;
  const stdDev = Math.sqrt(variance);
  return Math.round(Math.max(0, 100 - (stdDev / avg) * 100));
}

function getWeakKeys(pka: Record<string, { correct: number; total: number; accuracy: number }>): string[] {
  return Object.entries(pka)
    .filter(([, d]) => d.total >= 3 && d.accuracy < 80)
    .sort(([, a], [, b]) => a.accuracy - b.accuracy)
    .slice(0, 5)
    .map(([char]) => char);
}

export function TypingEngine({ passage, careerId, subId, testType, duration, onNewPassage }: TypingEngineProps) {
  const store = useTypingStore();
  const { addSession } = useStatsStore();
  const { playKeySound } = useSound();

  const engineRef = useRef<Engine | null>(null);
  const [engineResult, setEngineResult] = useState<any>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeUpRef = useRef(false);
  const passedTimeUpRef = useRef(false);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const timerActive = store.status === "active";
  const isFinished = store.status === "finished";
  const isIdle = store.status === "idle";
  const isPaused = store.status === "paused";
  const focusMode = store.focusMode;

  const saveSession = useCallback((result: any) => {
    const session: TypingSession = {
      id: generateId(),
      career: careerId,
      subCategory: subId,
      testType,
      testDuration: duration ?? 0,
      wpm: result.wpm,
      rawWpm: result.rawWpm,
      accuracy: result.accuracy,
      mistakes: result.mistakes,
      correctChars: result.correctChars,
      incorrectChars: result.incorrectChars,
      totalChars: result.totalChars,
      wordsTyped: result.wordsTyped,
      duration: result.duration,
      completed: result.completed,
      timestamp: Date.now(),
      charHistory: result.charHistory,
    };
    addSession(session);
  }, [careerId, subId, testType, duration, addSession]);

  const onTimeUp = useCallback(() => {
    if (passedTimeUpRef.current) return;
    passedTimeUpRef.current = true;
    timeUpRef.current = true;
    if (engineRef.current) {
      engineRef.current.finish();
      const result = engineRef.current.getResult();
      setEngineResult(result);
      store.setStatus("finished");
      saveSession(result);
    }
  }, [store, saveSession]);

  const { timeLeft } = useTimer({
    duration: duration ?? null,
    onTimeUp,
    isActive: timerActive && (duration !== null),
  });

  // Record WPM every second
  useEffect(() => {
    if (timerActive) {
      wpmIntervalRef.current = setInterval(() => {
        if (!store.startTime || store.totalChars === 0) return;
        const elapsed = (Date.now() - store.startTime) / 1000 / 60;
        if (elapsed <= 0) return;
        const wpm = Math.round((store.totalChars / 5) / elapsed);
        store.pushWpmSnapshot(wpm);
      }, 1000);
    }
    return () => {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [timerActive, store]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const startTest = useCallback(() => {
    timeUpRef.current = false;
    passedTimeUpRef.current = false;
    engineRef.current = new Engine(passage);
    store.reset();
    store.setPassage(passage);
    store.setStatus("active");
    const now = Date.now();
    store.setStartTime(now);
    engineRef.current.start();
    setEngineResult(null);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [passage, store]);

  const handleChar = useCallback(
    (char: string) => {
      if (store.status === "idle") {
        startTest();
        return;
      }
      if (store.status !== "active" || !engineRef.current || timeUpRef.current) return;
      setPressedKey(char);
      const result = engineRef.current.handleChar(char);
      store.setChar(result.charSnapshot.char, result.charSnapshot.char, result.correct, Date.now());

      if (result.finished) {
        engineRef.current.finish();
        const finalResult = engineRef.current.getResult();
        setEngineResult(finalResult);
        store.setStatus("finished");
        store.setEndTime(Date.now());
        saveSession(finalResult);
      }
    },
    [store, startTest, saveSession]
  );

  const handleBackspace = useCallback(() => {
    if (store.status !== "active" || !engineRef.current) return;
    if (store.currentCharIndex <= 0) return;
    engineRef.current.handleBackspace();
    store.removeLastChar();
    setPressedKey("backspace");
  }, [store]);

  const handleRestart = useCallback(() => {
    startTest();
  }, [startTest]);

  const handleEscape = useCallback(() => {
    if (isFinished || isIdle) return;
    store.toggleFocusMode();
  }, [store, isFinished, isIdle]);

  useKeyboard({
    onChar: handleChar,
    onBackspace: handleBackspace,
    onTab: isIdle || timerActive || isPaused ? startTest : undefined,
    onEscape: handleEscape,
    onCtrlK: () => setPaletteOpen(true),
    onCtrlShiftP: onNewPassage,
    isActive: store.status === "active" || store.status === "idle",
  });

  useEffect(() => {
    if (store.status === "active" && containerRef.current) {
      containerRef.current.focus();
    }
  }, [store.status]);

  function calculateCurrentWpm(): number {
    if (!store.startTime || store.totalChars === 0) return 0;
    const elapsed = (Date.now() - store.startTime) / 1000 / 60;
    if (elapsed <= 0) return 0;
    return Math.round((store.totalChars / 5) / elapsed);
  }

  const currentWpm = calculateCurrentWpm();
  const currentAccuracy = store.totalChars > 0 ? Math.round((store.correctChars / store.totalChars) * 100) : 100;

  const displayTime = duration !== null && timeLeft !== null
    ? formatTime(timeLeft)
    : duration !== null ? formatTime(duration) : "∞";

  // Per-key accuracy for results
  const perKeyData = useMemo(() => {
    if (!engineResult) return null;
    return getPerKeyAccuracy(engineResult.charHistory || []);
  }, [engineResult]);

  const consistencyScore = useMemo(() => {
    if (!engineResult) return null;
    return getConsistencyScore(store.wpmHistory);
  }, [engineResult, store.wpmHistory]);

  const weakKeys = useMemo(() => {
    if (!perKeyData) return [];
    return getWeakKeys(perKeyData);
  }, [perKeyData]);

  const commandPaletteCommands = useMemo(() => [
    { id: "restart", label: "Restart test", shortcut: "Tab", action: startTest },
    { id: "new-text", label: "New text passage", shortcut: "Ctrl+Shift+P", action: onNewPassage },
    { id: "toggle-focus", label: "Toggle focus mode", shortcut: "Esc", action: () => store.toggleFocusMode() },
    { id: "close-palette", label: "Close command palette", shortcut: "Esc", action: () => setPaletteOpen(false) },
  ], [startTest, onNewPassage, store]);

  // Time info for the stats below keyboard
  const showTimer = duration !== null;
  const totalTestDuration = duration !== null ? duration : 0;
  const elapsed = store.startTime ? (Date.now() - store.startTime) / 1000 : 0;
  const elapsedDisplay = showTimer ? displayTime : `${Math.floor(elapsed / 60)}:${String(Math.floor(elapsed % 60)).padStart(2, "0")}`;

  return (
    <>
      {/* Focus mode: only text */}
      {focusMode && !isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ct-bg)] p-8">
          <div
            ref={containerRef}
            tabIndex={0}
            className="focus:outline-none cursor-text w-full max-w-4xl"
          >
            <div className="flex items-center justify-between mb-4 text-xs">
              <span className="font-mono tabular-nums text-[var(--ct-text-secondary)]">{elapsedDisplay}</span>
              <span className="text-[var(--ct-text-secondary)]">{currentWpm} wpm</span>
            </div>
            <div className="font-mono text-xl leading-relaxed select-none break-words">
              {store.passage.split("").map((char, i) => {
                const typed = store.typedChars[i];
                let color = "var(--ct-sub)";
                if (typed) color = typed.correct ? "var(--ct-correct)" : "var(--ct-incorrect)";
                else if (i === store.currentCharIndex) color = "var(--ct-text)";
                return (
                  <span key={i} className="relative transition-colors duration-50" style={{ color }}>
                    {char === " " ? "\u00A0" : char}
                    {i === store.currentCharIndex && (
                      <span className="absolute inset-y-0 left-0 w-[2.5px] caret-blink" style={{ backgroundColor: "var(--ct-caret)" }} />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Normal mode layout */}
      {(!focusMode || isFinished) && (
        <div className="flex flex-col items-center gap-4">
          {/* Text Area */}
          <div className="w-full relative">
            <div
              ref={containerRef}
              tabIndex={0}
              onClick={() => containerRef.current?.focus()}
              className="relative focus:outline-none cursor-text w-full p-5 rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)]/50 min-h-[140px]"
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono tabular-nums text-[var(--ct-text-secondary)]">{elapsedDisplay}</span>
                <span className="text-[var(--ct-text-secondary)]">{isIdle ? "" : `${currentWpm} wpm`}</span>
              </div>

              <div className="font-mono text-lg leading-relaxed select-none break-words">
                {store.passage.split("").map((char, i) => {
                  const typed = store.typedChars[i];
                  let color = "var(--ct-sub)";
                  if (typed) color = typed.correct ? "var(--ct-correct)" : "var(--ct-incorrect)";
                  else if (i === store.currentCharIndex) color = "var(--ct-text)";
                  return (
                    <span key={i} className="relative transition-colors duration-50" style={{ color }}>
                      {char === " " ? "\u00A0" : char}
                      {i === store.currentCharIndex && (
                        <span className="absolute inset-y-0 left-0 w-[2.5px] caret-blink" style={{ backgroundColor: "var(--ct-caret)" }} />
                      )}
                    </span>
                  );
                })}
              </div>

              {isIdle && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--ct-card)]/40 rounded-xl">
                  <p className="text-sm text-[var(--ct-text-secondary)]">Click or press any key to start</p>
                </div>
              )}

              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--ct-card)]/60 backdrop-blur-sm rounded-xl">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-[var(--ct-text)] mb-3">Paused</p>
                    <Button onClick={() => store.setStatus("active")}>Resume</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Keyboard (hidden in focus mode) */}
          <KeyboardVisualizer pressedKey={pressedKey} />

          {/* Stats below keyboard */}
          <div className="flex items-center gap-4 text-xs text-[var(--ct-text-secondary)]">
            <span className="font-mono tabular-nums">
              wpm <span className="text-[var(--ct-text)] font-semibold">{isIdle ? "—" : currentWpm}</span>
            </span>
            <span className="text-[var(--ct-border)]">|</span>
            <span className="font-mono tabular-nums">
              acc <span className="text-[var(--ct-text)] font-semibold">{isIdle ? "—" : `${currentAccuracy}%`}</span>
            </span>
            <span className="text-[var(--ct-border)]">|</span>
            <span className="font-mono tabular-nums">
              mistakes <span className="text-[var(--ct-text)] font-semibold">{store.mistakes}</span>
            </span>
            {!isIdle && !isFinished && (
              <>
                <span className="text-[var(--ct-border)]">|</span>
                <span className="font-mono tabular-nums">
                  consistency <span className="text-[var(--ct-text)] font-semibold">{getConsistencyScore(store.wpmHistory)}%</span>
                </span>
              </>
            )}
          </div>

          {/* Controls / Results */}
          <AnimatePresence mode="wait">
            {isFinished && engineResult ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-lg"
              >
                <div className="rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)]/50 p-5">
                  {/* Top stats grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--ct-text)] tabular-nums">{engineResult.wpm}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)]">wpm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--ct-text)] tabular-nums">{engineResult.rawWpm}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)]">raw</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--ct-text)] tabular-nums">{engineResult.accuracy}%</div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)]">accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--ct-text)] tabular-nums">{consistencyScore ?? "—"}%</div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)]">consistency</div>
                    </div>
                  </div>

                  {/* WPM Sparkline */}
                  {store.wpmHistory.length > 1 && (
                    <div className="mb-4 flex justify-center">
                      <WpmSparkline data={store.wpmHistory} accentColor="var(--ct-accent)" textSecondary="var(--ct-text-secondary)" />
                    </div>
                  )}

                  {/* Per-key accuracy (top 6 worst keys with enough data) */}
                  {perKeyData && weakKeys.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--ct-text-secondary)] mb-2">Practice these keys</div>
                      <div className="flex flex-wrap gap-2">
                        {weakKeys.map((key) => {
                          const data = perKeyData[key];
                          return (
                            <div key={key} className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono">
                              <span className="text-[var(--ct-text)] font-semibold">{key === " " ? "␣" : key}</span>
                              <span className="text-[var(--ct-text-secondary)] ml-1">{data.accuracy}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                    <div>
                      <div className="text-xs text-[var(--ct-text-secondary)]">Mistakes</div>
                      <div className="text-sm font-semibold text-[var(--ct-text)]">{engineResult.mistakes}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--ct-text-secondary)]">Time</div>
                      <div className="text-sm font-semibold text-[var(--ct-text)]">{engineResult.duration.toFixed(1)}s</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={startTest} className="flex-1 text-sm py-2">Try Again</Button>
                    <Button variant="secondary" onClick={onNewPassage} className="flex-1 text-sm py-2">New Text</Button>
                  </div>
                </div>
              </motion.div>
            ) : isPaused ? null : (
              <motion.div
                key="controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                {isIdle ? (
                  <span className="text-xs text-[var(--ct-text-secondary)]">Press any key or Tab</span>
                ) : (
                  <button
                    onClick={() => store.setStatus("paused")}
                    className="px-4 py-1.5 text-xs font-medium rounded-lg border border-[var(--ct-border)] text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] hover:bg-[var(--ct-card)] transition-colors"
                  >
                    Pause
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Command Palette */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commandPaletteCommands}
      />
    </>
  );
}
