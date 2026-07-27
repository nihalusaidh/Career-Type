"use client";

import { motion } from "framer-motion";
import { careers } from "@/data/careers";

interface SubCategorySelectorProps {
  careerId: string;
  selectedSub: string;
  onSelect: (subId: string) => void;
}

export function SubCategorySelector({ careerId, selectedSub, onSelect }: SubCategorySelectorProps) {
  const career = careers.find((c) => c.id === careerId);
  if (!career) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {career.subCategories.map((sub) => (
        <motion.button
          key={sub.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(sub.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            selectedSub === sub.id
              ? "bg-[var(--ct-accent)] text-white border-[var(--ct-accent)]"
              : "bg-[var(--ct-card)] text-[var(--ct-text-secondary)] border-[var(--ct-border)] hover:text-[var(--ct-text)]"
          }`}
        >
          {sub.name}
        </motion.button>
      ))}
    </div>
  );
}
