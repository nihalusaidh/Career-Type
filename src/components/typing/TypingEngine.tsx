"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypingEngine as Engine } from "@/lib/typing-engine";
import { useTypingStore } from "@/store/typingStore";
import { useStatsStore } from "@/store/statsStore";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { StatsBar } from "./StatsBar";
import { Timer } from "./Timer";
import { Results } from "./Results";
import { KeyboardVisualizer } from "./KeyboardVisualizer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getTimeFromTestType, generateId } from "@/lib/utils";
import type { TypingSession, CharSnapshot } from "@/types";

interface TypingEngineProps {
  passage: string;
}

export function TypingEngine({ passage }: TypingEngineProps) {
  const store = useTypingStore();
  const { addSession } = useStatsStore();
  const { playKeySound } = useSound();

  const engineRef = useRef<Engine | null>(null);
  const [engineResult, setEngineResult] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const duration = getTimeFromTestType(store.testType, store.testDuration ?? undefined);

  const timerActive = store.status === "active";
  const timeUpRef = useRef(false);

  const onTimeUp = useCallback(() => {
    timeUpRef.current = true;
    if (engineRef.current) {
      engineRef.current.finish();
      const result = engineRef.current.getResult();
      setEngineResult(result);
      store.setStatus("finished");
      saveSession(result);
    }
  }, []);

  const { timeLeft } = useTimer({
    duration: duration ?? null,
    onTimeUp,
    isActive: timerActive && (duration !== null),
  });

  const startTest = useCallback(() => {
    timeUpRef.current = false;
    const p = passage || "Start typing to begin your practice session...";
    engineRef.current = new Engine(p);
    store.reset();
    store.setPassage(p);
    store.setStatus("active");
    const now = Date.now();
    store.setStartTime(now);
    engineRef.current.start();
    setEngineResult(null);
    setIsFocused(true);
  }, [passage, store]);

  const handleChar = useCallback(
    (char: string) => {
      if (store.status === "idle") {
        startTest();
      }
      if (store.status !== "active" || !engineRef.current) return;

      const result = engineRef.current.handleChar(char);
      store.setChar(
        result.charSnapshot.char,
        result.charSnapshot.char,
        result.correct,
        Date.now()
      );

      if (result.finished) {
        const finalResult = engineRef.current.getResult();
        setEngineResult(finalResult);
        store.setStatus("finished");
        store.setEndTime(Date.now());
        saveSession(finalResult);
      }
    },
    [store.status, store, startTest]
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

  function saveSession(result: any) {
    const session: TypingSession = {
      id: generateId(),
      career: store.career,
      subCategory: store.subCategory,
      testType: store.testType,
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

  return (
    <div className="flex flex-col gap-4">
      <StatsBar
        wpm={calculateCurrentWpm(store)}
        accuracy={store.totalChars > 0 ? Math.round((store.correctChars / store.totalChars) * 100) : 100}
        mistakes={store.mistakes}
        totalChars={store.totalChars}
        timeLeft={duration !== null ? timeLeft : null}
        status={store.status}
      />

      <Card className="relative overflow-hidden">
        <div
          ref={containerRef}
          tabIndex={0}
          className="relative focus:outline-none cursor-text"
          onClick={() => { setIsFocused(true); if (store.status === "idle") startTest(); }}
        >
          {/* Passage display */}
          <div className="relative font-mono text-lg leading-relaxed select-none">
            {store.passage.split("").map((char, i) => {
              const typed = store.typedChars[i];
              let color = "var(--ct-sub)";
              if (typed) {
                color = typed.correct ? "var(--ct-correct)" : "var(--ct-incorrect)";
              } else if (i === store.currentCharIndex) {
                color = "var(--ct-text)";
              }

              return (
                <span
                  key={i}
                  className="relative"
                  style={{ color }}
                >
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
      </Card>

      <div className="flex items-center justify-center gap-3">
        {store.status === "finished" ? (
          <Button onClick={startTest}>Restart Test</Button>
        ) : store.status === "idle" ? (
          <Button onClick={startTest}>Start Typing</Button>
        ) : store.status === "active" ? (
          <Button variant="secondary" onClick={() => { store.setStatus("paused"); }}>
            Pause
          </Button>
        ) : store.status === "paused" ? (
          <Button onClick={() => { store.setStatus("active"); }}>
            Resume
          </Button>
        ) : null}
      </div>

      <KeyboardVisualizer pressedKey={pressedKey} />

      <Results
        result={engineResult}
        isOpen={store.status === "finished"}
        onClose={() => {}}
        onRestart={startTest}
      />
    </div>
  );
}

function calculateCurrentWpm(store: any): number {
  if (!store.startTime || store.totalChars === 0) return 0;
  const elapsed = (Date.now() - store.startTime) / 1000 / 60;
  if (elapsed <= 0) return 0;
  return Math.round((store.totalChars / 5) / elapsed);
}
