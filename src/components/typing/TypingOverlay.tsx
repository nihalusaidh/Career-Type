"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypingEngine as Engine } from "@/lib/typing-engine";
import { useTypingStore } from "@/store/typingStore";
import { useStatsStore } from "@/store/statsStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { StatsBar } from "./StatsBar";
import { Results } from "./Results";
import { KeyboardVisualizer } from "./KeyboardVisualizer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TestTypeSelector } from "./TestTypeSelector";
import { SubCategorySelector } from "./SubCategorySelector";
import { getTimeFromTestType, generateId } from "@/lib/utils";
import { getRandomPassage } from "@/content/index";
import { careers } from "@/data/careers";
import type { TypingSession } from "@/types";

interface TypingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialCareer?: string;
}

type OverlayScreen = "select" | "countdown" | "typing" | "results" | "paused";

export function TypingOverlay({ isOpen, onClose, initialCareer }: TypingOverlayProps) {
  const store = useTypingStore();
  const { addSession } = useStatsStore();
  const { playKeySound } = useSound();

  const [screen, setScreen] = useState<OverlayScreen>("select");
  const [careerId, setCareerId] = useState(initialCareer ?? "developer");
  const [subId, setSubId] = useState("");
  const [testType, setTestType] = useState<string>("60s");
  const [passage, setPassage] = useState("");
  const [engineResult, setEngineResult] = useState<any>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  const engineRef = useRef<Engine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeUpRef = useRef(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const career = careers.find((c) => c.id === careerId);
  const duration = getTimeFromTestType(testType, undefined);

  useEffect(() => {
    if (career) {
      setSubId(career.subCategories[0]?.id ?? "");
    }
  }, [careerId, career]);

  useEffect(() => {
    if (screen === "typing" && containerRef.current) {
      containerRef.current.focus();
    }
  }, [screen]);

  // Generate a fresh passage
  const generatePassage = useCallback(() => {
    const p = getRandomPassage(careerId, subId);
    setPassage(p);
    return p;
  }, [careerId, subId]);

  // Start countdown then test
  const startCountdown = useCallback(() => {
    setCountdown(3);
    setScreen("countdown");
    const p = generatePassage();
    engineRef.current = new Engine(p);

    let count = 3;
    countdownTimerRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        store.reset();
        store.setPassage(p);
        store.setStatus("active");
        store.setStartTime(Date.now());
        engineRef.current?.start();
        setEngineResult(null);
        setScreen("typing");
      }
      setCountdown(count);
    }, 1000);
  }, [generatePassage, store]);

  const onTimeUp = useCallback(() => {
    timeUpRef.current = true;
    if (engineRef.current) {
      engineRef.current.finish();
      const result = engineRef.current.getResult();
      setEngineResult(result);
      store.setStatus("finished");
      saveSession(result);
      setScreen("results");
    }
  }, []);

  const { timeLeft } = useTimer({
    duration: duration ?? null,
    onTimeUp,
    isActive: screen === "typing" && (duration !== null),
  });

  const handleChar = useCallback(
    (char: string) => {
      if (screen !== "typing" || !engineRef.current) return;

      const result = engineRef.current.handleChar(char);
      store.setChar(result.charSnapshot.char, result.charSnapshot.char, result.correct, Date.now());

      if (result.finished) {
        const finalResult = engineRef.current.getResult();
        setEngineResult(finalResult);
        store.setStatus("finished");
        store.setEndTime(Date.now());
        saveSession(finalResult);
        setScreen("results");
      }
    },
    [screen, store]
  );

  const handleBackspace = useCallback(() => {
    if (screen !== "typing" || !engineRef.current) return;
    if (store.currentCharIndex <= 0) return;
    engineRef.current.handleBackspace();
    store.removeLastChar();
  }, [screen, store]);

  useKeyboard({
    onChar: handleChar,
    onBackspace: handleBackspace,
    isActive: screen === "typing",
  });

  const handleRestart = useCallback(() => {
    setScreen("select");
    setEngineResult(null);
    store.reset();
  }, [store]);

  const handleClose = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setScreen("select");
    setEngineResult(null);
    store.reset();
    onClose();
  }, [store, onClose]);

  const handlePause = useCallback(() => {
    store.setStatus("paused");
    setScreen("paused");
  }, [store]);

  const handleResume = useCallback(() => {
    store.setStatus("active");
    setScreen("typing");
  }, [store]);

  function saveSession(result: any) {
    const session: TypingSession = {
      id: generateId(),
      career: careerId,
      subCategory: subId,
      testType: testType as any,
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
  }

  function calculateCurrentWpm(): number {
    if (!store.startTime || store.totalChars === 0) return 0;
    const elapsed = (Date.now() - store.startTime) / 1000 / 60;
    if (elapsed <= 0) return 0;
    return Math.round((store.totalChars / 5) / elapsed);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-5xl mx-4 max-h-[95vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[var(--ct-card)] border border-[var(--ct-border)] text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Selection Screen */}
            {screen === "select" && (
              <div className="p-6 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]">
                <h2 className="text-xl font-bold text-[var(--ct-text)] mb-4">Practice Typing</h2>

                {/* Career selector */}
                <div className="mb-4">
                  <label className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)] block mb-2">
                    Career
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {careers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCareerId(c.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize ${
                          careerId === c.id
                            ? "bg-[var(--ct-accent)] text-white border-[var(--ct-accent)]"
                            : "bg-[var(--ct-bg)] text-[var(--ct-text-secondary)] border-[var(--ct-border)] hover:text-[var(--ct-text)]"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-category selector */}
                {career && (
                  <div className="mb-4">
                    <label className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)] block mb-2">
                      Topic
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {career.subCategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSubId(sub.id)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                            subId === sub.id
                              ? "bg-[var(--ct-accent)] text-white border-[var(--ct-accent)]"
                              : "bg-[var(--ct-bg)] text-[var(--ct-text-secondary)] border-[var(--ct-border)] hover:text-[var(--ct-text)]"
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Test type */}
                <div className="mb-6">
                  <label className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)] block mb-2">
                    Duration
                  </label>
                  <TestTypeSelector
                    selected={testType as any}
                    onSelect={(t) => setTestType(t)}
                  />
                </div>

                <Button onClick={startCountdown} size="lg" className="w-full">
                  Start Typing
                </Button>
              </div>
            )}

            {/* Countdown Screen */}
            {screen === "countdown" && (
              <div className="p-12 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] flex flex-col items-center justify-center">
                <div className="text-8xl font-bold text-[var(--ct-accent)] tabular-nums animate-pulse">
                  {countdown > 0 ? countdown : "Go!"}
                </div>
              </div>
            )}

            {/* Typing Screen */}
            {screen === "typing" && (
              <div className="p-6 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]">
                <div className="mb-4">
                  <StatsBar
                    wpm={calculateCurrentWpm()}
                    accuracy={store.totalChars > 0 ? Math.round((store.correctChars / store.totalChars) * 100) : 100}
                    mistakes={store.mistakes}
                    totalChars={store.totalChars}
                    timeLeft={duration !== null ? timeLeft : null}
                    status="active"
                  />
                </div>

                <div
                  ref={containerRef}
                  tabIndex={0}
                  className="relative focus:outline-none cursor-text mb-4 p-4 rounded-xl bg-[var(--ct-bg)] border border-[var(--ct-border)]"
                >
                  <div className="relative font-mono text-lg leading-relaxed select-none">
                    {passage.split("").map((char, i) => {
                      const typed = store.typedChars[i];
                      let color = "var(--ct-sub)";
                      if (typed) {
                        color = typed.correct ? "var(--ct-correct)" : "var(--ct-incorrect)";
                      } else if (i === store.currentCharIndex) {
                        color = "var(--ct-text)";
                      }

                      return (
                        <span key={i} className="relative" style={{ color }}>
                          {char === " " ? "\u00A0" : char}
                          {i === store.currentCharIndex && (
                            <span
                              className="absolute inset-y-0 left-0 w-[2px] animate-pulse"
                              style={{ backgroundColor: "var(--ct-caret)" }}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Button variant="secondary" onClick={handlePause}>
                    Pause
                  </Button>
                </div>

                <KeyboardVisualizer pressedKey={pressedKey} />
              </div>
            )}

            {/* Paused Screen */}
            {screen === "paused" && (
              <div className="p-12 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] flex flex-col items-center justify-center gap-6">
                <div className="text-2xl font-bold text-[var(--ct-text)]">Paused</div>
                <div className="flex gap-3">
                  <Button onClick={handleResume}>Resume</Button>
                  <Button variant="secondary" onClick={handleClose}>Quit</Button>
                </div>
              </div>
            )}

            {/* Results Screen */}
            {screen === "results" && engineResult && (
              <Results
                result={engineResult}
                isOpen={true}
                onClose={handleClose}
                onRestart={handleRestart}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
