import { create } from "zustand";
import type { TypingState, TestType, WpmSnapshot } from "@/types";

interface TypingStoreState extends TypingState {
  passage: string;
  testType: TestType;
  testDuration: number | null;
  career: string;
  subCategory: string;
  countdownValue: number;

  setPassage: (passage: string) => void;
  setTestType: (type: TestType) => void;
  setTestDuration: (duration: number | null) => void;
  setCareer: (career: string) => void;
  setSubCategory: (sub: string) => void;
  setStatus: (status: TypingState["status"]) => void;
  setChar: (expected: string, typed: string, correct: boolean, timestamp: number) => void;
  removeLastChar: () => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  reset: () => void;
  incrementCountdown: () => void;
  setCountdownValue: (val: number) => void;
  pushWpmSnapshot: (wpm: number) => void;
  toggleFocusMode: () => void;
  setMode: (mode: TypingState["mode"]) => void;
}

const initialState: TypingState = {
  status: "idle",
  currentCharIndex: 0,
  typedChars: [],
  startTime: null,
  endTime: null,
  mistakes: 0,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  charHistory: [],
  wpmHistory: [],
  mode: "career",
  focusMode: false,
};

export const useTypingStore = create<TypingStoreState>((set) => ({
  ...initialState,
  passage: "",
  testType: "60s",
  testDuration: 60,
  career: "developer",
  subCategory: "python",
  countdownValue: 0,

  setPassage: (passage) => set({ passage }),
  setTestType: (testType) => set({ testType }),
  setTestDuration: (duration) => set({ testDuration: duration }),
  setCareer: (career) => set({ career }),
  setSubCategory: (sub) => set({ subCategory: sub }),

  setStatus: (status) => set({ status }),

  setChar: (expected, typed, correct, timestamp) =>
    set((state) => ({
      currentCharIndex: state.currentCharIndex + 1,
      typedChars: [...state.typedChars, { expected, typed, correct, timestamp }],
      charHistory: [
        ...state.charHistory,
        { char: typed, correct, time: timestamp, position: state.currentCharIndex },
      ],
      correctChars: state.correctChars + (correct ? 1 : 0),
      incorrectChars: state.incorrectChars + (correct ? 0 : 1),
      mistakes: state.mistakes + (correct ? 0 : 1),
      totalChars: state.totalChars + 1,
    })),

  removeLastChar: () =>
    set((state) => {
      if (state.typedChars.length === 0) return state;
      const last = state.typedChars[state.typedChars.length - 1];
      return {
        currentCharIndex: state.currentCharIndex - 1,
        typedChars: state.typedChars.slice(0, -1),
        charHistory: state.charHistory.slice(0, -1),
        correctChars: state.correctChars - (last.correct ? 1 : 0),
        incorrectChars: state.incorrectChars - (last.correct ? 0 : 1),
        mistakes: state.mistakes - (last.correct ? 0 : 1),
        totalChars: state.totalChars - 1,
      };
    }),

  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),

  incrementCountdown: () =>
    set((state) => ({ countdownValue: state.countdownValue - 1 })),

  setCountdownValue: (val) => set({ countdownValue: val }),

  pushWpmSnapshot: (wpm) =>
    set((state) => ({
      wpmHistory: [...state.wpmHistory, { time: Date.now(), wpm }],
    })),

  toggleFocusMode: () =>
    set((state) => ({ focusMode: !state.focusMode })),

  setMode: (mode) => set({ mode }),

  reset: () =>
    set({
      ...initialState,
      passage: "",
      countdownValue: 0,
    }),
}));
