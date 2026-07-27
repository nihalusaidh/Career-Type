"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ResultsProps {
  result: any;
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export function Results({ result, isOpen, onClose, onRestart }: ResultsProps) {
  if (!result || !isOpen) return null;

  const stats = [
    { label: "WPM", value: result.wpm, highlight: result.wpm >= 100 },
    { label: "Raw WPM", value: result.rawWpm },
    { label: "Accuracy", value: `${result.accuracy}%`, highlight: result.accuracy >= 95 },
    { label: "Mistakes", value: result.mistakes },
    { label: "Correct", value: result.correctChars },
    { label: "Incorrect", value: result.incorrectChars },
    { label: "Words Typed", value: result.wordsTyped },
    { label: "Duration", value: `${result.duration.toFixed(1)}s` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)] p-6"
    >
      <div className="text-center mb-6">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold text-[var(--ct-text)]"
        >
          Test Complete
        </motion.h2>
        {result.completed ? (
          <p className="text-sm text-[var(--ct-text-secondary)] mt-1">
            You finished the passage!
          </p>
        ) : (
          <p className="text-sm text-[var(--ct-text-secondary)] mt-1">
            Time&apos;s up!
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-xl bg-[var(--ct-bg)]">
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--ct-text-secondary)]">
              {stat.label}
            </div>
            <div className={`text-xl font-bold tabular-nums ${stat.highlight ? "text-[var(--ct-accent)]" : "text-[var(--ct-text)]"}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onRestart} className="flex-1">
          Practice Again
        </Button>
        <Button variant="secondary" onClick={onClose} className="flex-1">
          Close
        </Button>
      </div>
    </motion.div>
  );
}
