"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  duration: number | null;
  onTimeUp: () => void;
  isActive: boolean;
}

export function useTimer({ duration, onTimeUp, isActive }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration ?? Infinity);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive || duration === null) {
      clearTimer();
      return;
    }

    setTimeLeft(duration);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 0.1;
        if (next <= 0) {
          clearTimer();
          onTimeUpRef.current();
          return 0;
        }
        return next;
      });
    }, 100);

    return clearTimer;
  }, [isActive, duration, clearTimer]);

  const reset = useCallback((newDuration?: number) => {
    clearTimer();
    setTimeLeft(newDuration ?? duration ?? Infinity);
  }, [duration, clearTimer]);

  return { timeLeft, reset, clearTimer };
}
