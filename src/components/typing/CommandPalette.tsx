"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export function CommandPalette({ isOpen, onClose, commands }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                className="w-full bg-transparent text-sm text-[var(--ct-text)] placeholder-[var(--ct-text-secondary)] focus:outline-none"
              />
            </div>
            <div className="border-t border-[var(--ct-border)] max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-[var(--ct-text-secondary)]">
                  No matching commands
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => { cmd.action(); onClose(); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-[var(--ct-accent)]/10 text-[var(--ct-accent)]"
                        : "text-[var(--ct-text)] hover:bg-[var(--ct-bg)]"
                    }`}
                  >
                    <span>{cmd.label}</span>
                    {cmd.shortcut && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--ct-bg)] text-[var(--ct-text-secondary)]">
                        {cmd.shortcut}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
