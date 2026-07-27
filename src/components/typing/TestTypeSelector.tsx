"use client";

import { motion } from "framer-motion";
import type { TestType } from "@/types";

interface TestTypeSelectorProps {
  selected: TestType;
  onSelect: (type: TestType) => void;
}

const testTypes: { label: string; value: TestType }[] = [
  { label: "30s", value: "30s" },
  { label: "60s", value: "60s" },
  { label: "120s", value: "120s" },
  { label: "5m", value: "5min" },
  { label: "10m", value: "10min" },
  { label: "∞", value: "unlimited" },
];

export function TestTypeSelector({ selected, onSelect }: TestTypeSelectorProps) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-[var(--ct-card)] border border-[var(--ct-border)]">
      {testTypes.map((t) => (
        <motion.button
          key={t.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(t.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            selected === t.value
              ? "bg-[var(--ct-accent)] text-white"
              : "text-[var(--ct-text-secondary)] hover:text-[var(--ct-text)]"
          }`}
        >
          {t.label}
        </motion.button>
      ))}
    </div>
  );
}
