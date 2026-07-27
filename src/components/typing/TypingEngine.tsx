"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { generateId } from "@/lib/utils";
import type { TypingSession, TestType } from "@/types";

interface TypingEngineProps {
  passage: string;
  careerId: string;
  subId: string;
  testType: TestType;
  duration: number | null;
  onNewPassage: () => void;
}

export function TypingEngine({ passage, careerId, subId, testType, duration, onNewPassage }: TypingEngineProps) {
  const store = useTypingStore();
  const { addSession } = useStatsStore();
  const { playKeySound } = useSound();

  const engineRef = useRef<Engine | null>(null);
  const [engineResult, setEngineResult] = useState<any>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeUpRef = useRef(false);
  const passedTimeUpRef = useRef(false);

  const timerActive = store.status === "active";
  const isFinished = store.status === "finished";
  const isIdle = store.status === "idle";

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
        return; // startTest will reset everything; next char will be handled normally
      }
      if (store.status !== "active" || !engineRef.current || timeUpRef.current) return;

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
  }, [store]);

  useKeyboard({
    onChar: handleChar,
    onBackspace: handleBackspace,
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

  return (
    <div className="flex flex-col gap-5">
      {/* Stats Bar */}
      <StatsBar
        wpm={calculateCurrentWpm()}
        accuracy={store.totalChars > 0 ? Math.round((store.correctChars / store.totalChars) * 100) : 100}
        mistakes={store.mistakes}
        totalChars={store.totalChars}
        timeLeft={duration !== null ? timeLeft : null}
        status={store.status}
      />

      {/* Typing Area */}
      <motion.div layout className="relative">
        <div
          ref={containerRef}
          tabIndex={0}
          onClick={() => { if (containerRef.current) containerRef.current.focus(); }}
          className="relative focus:outline-none cursor-text p-6 rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]/60 backdrop-blur-sm min-h-[120px]"
        >
          <div className="relative font-mono text-xl leading-relaxed select-none">
            {store.passage.split("").map((char, i) => {
              const typed = store.typedChars[i];
              let color = "var(--ct-sub)";
              if (typed) {
                color = typed.correct ? "var(--ct-correct)" : "var(--ct-incorrect)";
              } else if (i === store.currentCharIndex) {
                color = "var(--ct-text)";
              }

              return (
                <span key={i} className="relative transition-colors duration-50" style={{ color }}>
                  {char === " " ? "\u00A0" : char}
                  {i === store.currentCharIndex && (
                    <span
                      className="absolute inset-y-0 left-0 w-[2.5px] caret-blink"
                      style={{ backgroundColor: "var(--ct-caret)" }}
                    />
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {isFinished ? (
          <>
            <Button onClick={startTest}>
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Button>
            <Button variant="secondary" onClick={onNewPassage}>
              New Text
            </Button>
          </>
        ) : isIdle ? (
          <Button onClick={startTest} size="lg" className="px-10">
            Start Typing
          </Button>
        ) : store.status === "paused" ? (
          <Button onClick={() => store.setStatus("active")}>
            Resume
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => store.setStatus("paused")}>
            Pause
          </Button>
        )}
      </div>

      {/* Keyboard Visualizer */}
      <KeyboardVisualizer pressedKey={pressedKey} />

      {/* Inline Results */}
      {isFinished && engineResult && (
        <Results
          result={engineResult}
          onRestart={startTest}
          onNewText={onNewPassage}
        />
      )}
    </div>
  );
}
