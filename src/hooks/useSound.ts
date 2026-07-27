"use client";

import { useCallback, useRef } from "react";
import { useSettingsStore } from "@/store/settingsStore";

type SoundType = "keypress" | "backspace" | "error" | "complete";

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { settings } = useSettingsStore();

  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playKeySound = useCallback(
    (type: SoundType = "keypress") => {
      if (settings.sound === "silent" || settings.soundVolume === 0) return;

      try {
        const ctx = getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const volume = settings.soundVolume / 100;
        const baseFreq =
          settings.sound === "mechanical" ? 800 :
          settings.sound === "laptop" ? 1200 :
          settings.sound === "typewriter" ? 600 : 0;

        const freq = type === "error" ? baseFreq * 0.5 :
                     type === "backspace" ? baseFreq * 0.8 :
                     type === "complete" ? baseFreq * 2 : baseFreq;

        osc.frequency.value = freq;
        osc.type = settings.sound === "mechanical" ? "square" : "sine";

        const duration = type === "complete" ? 0.3 : 0.05;
        gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio not available
      }
    },
    [settings.sound, settings.soundVolume, getContext]
  );

  return { playKeySound };
}
