"use client";

import { useEffect, useCallback, useRef } from "react";

interface UseKeyboardOptions {
  onChar: (char: string) => void;
  onBackspace: () => void;
  onTab?: () => void;
  onEscape?: () => void;
  isActive: boolean;
}

export function useKeyboard({
  onChar,
  onBackspace,
  onTab,
  onEscape,
  isActive,
}: UseKeyboardOptions) {
  const onCharRef = useRef(onChar);
  const onBackspaceRef = useRef(onBackspace);
  const onTabRef = useRef(onTab);
  const onEscapeRef = useRef(onEscape);

  onCharRef.current = onChar;
  onBackspaceRef.current = onBackspace;
  onTabRef.current = onTab;
  onEscapeRef.current = onEscape;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive && e.key !== "Escape") return;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        onBackspaceRef.current();
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        onTabRef.current?.();
        return;
      }

      if (e.key === "Escape") {
        onEscapeRef.current?.();
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        onCharRef.current(e.key);
      }
    },
    [isActive]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {};
}
