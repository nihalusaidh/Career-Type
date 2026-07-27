"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ResultsProps {
  result: any;
  onRestart: () => void;
  onNewText: () => void;
}

export function Results({ result, onRestart, onNewText }: ResultsProps) {
  if (!result) return null;

  const stats = [
    { label: "WPM", value: result.wpm, highlight: result.wpm >= 100 },
    { label: "Raw WPM", value: result.rawWpm },
    { label: "Accuracy", value: `${result.accuracy}%`, highlight: result.accuracy >= 95 },
    { label: "Mistakes", value: result.mistakes },
    { label: "Correct", value: result.correctChars },
    { label: "Incorrect", value: result.incorrectChars },
    { label: "Words", value: result.wordsTyped },
    { label: "Time", value: `${result.duration.toFixed(1)}s` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]/80 backdrop-blur-sm p-6"
    >
      <div className="text-center mb-5">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold text-[var(--ct-text)]"
        >
          {result.completed ? "Complete!" : "Time's Up!"}
        </motion.h2>
        <p className="text-sm text-[var(--ct-text-secondary)] mt-0.5">
          {result.completed
            ? "You finished the passage"
            : "Practice more to improve your speed"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            className="text-center p-2.5 rounded-xl bg-[var(--ct-bg)]/60"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ct-text-secondary)]">
              {stat.label}
            </div>
            <div className={`text-lg font-bold tabular-nums mt-0.5 ${
              stat.highlight ? "text-[var(--ct-accent)]" : "text-[var(--ct-text)]"
            }`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onRestart} className="flex-1">
          Try Again
        </Button>
        <Button variant="secondary" onClick={onNewText} className="flex-1">
          New Text
        </Button>
      </div>
    </motion.div>
  );
}
