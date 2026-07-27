"use client";

import { useEffect, useCallback, useRef } from "react";

interface UseKeyboardOptions {
  onChar: (char: string) => void;
  onBackspace: () => void;
  onTab?: () => void;
  onEscape?: () => void;
  onCtrlK?: () => void;
  onCtrlShiftP?: () => void;
  isActive: boolean;
}

export function useKeyboard({
  onChar,
  onBackspace,
  onTab,
  onEscape,
  onCtrlK,
  onCtrlShiftP,
  isActive,
}: UseKeyboardOptions) {
  const onCharRef = useRef(onChar);
  const onBackspaceRef = useRef(onBackspace);
  const onTabRef = useRef(onTab);
  const onEscapeRef = useRef(onEscape);
  const onCtrlKRef = useRef(onCtrlK);
  const onCtrlShiftPRef = useRef(onCtrlShiftP);

  onCharRef.current = onChar;
  onBackspaceRef.current = onBackspace;
  onTabRef.current = onTab;
  onEscapeRef.current = onEscape;
  onCtrlKRef.current = onCtrlK;
  onCtrlShiftPRef.current = onCtrlShiftP;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive && e.key !== "Escape") return;

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onCtrlKRef.current?.();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        onCtrlShiftPRef.current?.();
        return;
      }

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
