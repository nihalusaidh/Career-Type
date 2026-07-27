import type { TypedChar, CharSnapshot } from "@/types";

export interface EngineState {
  passage: string;
  currentIndex: number;
  typedChars: TypedChar[];
  startTime: number | null;
  endTime: number | null;
  isActive: boolean;
  isFinished: boolean;
}

export interface EngineResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  mistakes: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  wordsTyped: number;
  duration: number;
  charHistory: CharSnapshot[];
  completed: boolean;
}

export class TypingEngine {
  private passage: string;
  private currentIndex: number;
  private typedChars: TypedChar[];
  private startTime: number | null;
  private endTime: number | null;
  private isActive: boolean;
  private isFinished: boolean;

  constructor(passage: string) {
    this.passage = passage;
    this.currentIndex = 0;
    this.typedChars = [];
    this.startTime = null;
    this.endTime = null;
    this.isActive = false;
    this.isFinished = false;
  }

  start(): void {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();
    }
  }

  handleChar(char: string): {
    correct: boolean;
    finished: boolean;
    charSnapshot: CharSnapshot;
  } {
    if (this.isFinished || !this.isActive) {
      return {
        correct: false,
        finished: this.isFinished,
        charSnapshot: { char, correct: false, time: Date.now(), position: this.currentIndex },
      };
    }

    const now = Date.now();
    const expected = this.passage[this.currentIndex] ?? "";

    if (char.length === 1) {
      const pressedKey = char === "Enter" ? "\n" : char;
      const correct = pressedKey === expected;

      this.typedChars.push({
        expected,
        typed: pressedKey,
        correct,
        timestamp: now,
      });

      const charSnapshot: CharSnapshot = {
        char: pressedKey,
        correct,
        time: now,
        position: this.currentIndex,
      };

      this.currentIndex++;

      if (this.currentIndex >= this.passage.length) {
        this.finish();
      }

      return { correct, finished: this.isFinished, charSnapshot };
    }

    return {
      correct: false,
      finished: this.isFinished,
      charSnapshot: { char, correct: false, time: now, position: this.currentIndex },
    };
  }

  handleBackspace(): void {
    if (this.typedChars.length > 0) {
      this.typedChars.pop();
      this.currentIndex--;
    }
  }

  finish(): void {
    this.isFinished = true;
    this.isActive = false;
    this.endTime = Date.now();
  }

  getResult(): EngineResult {
    const totalChars = this.typedChars.length;
    const correctChars = this.typedChars.filter((t) => t.correct).length;
    const incorrectChars = totalChars - correctChars;
    const duration = this.endTime && this.startTime
      ? (this.endTime - this.startTime) / 1000
      : 0;
    const minutes = duration / 60;
    const wordsTyped = Math.round(correctChars / 5);
    const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    const rawWpm = minutes > 0 ? Math.round((totalChars / 5) / minutes) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const charHistory = this.typedChars.map((t, i) => ({
      char: t.typed,
      correct: t.correct,
      time: t.timestamp,
      position: i,
    }));

    return {
      wpm,
      rawWpm,
      accuracy,
      mistakes: incorrectChars,
      correctChars,
      incorrectChars,
      totalChars,
      wordsTyped,
      duration,
      charHistory,
      completed: this.currentIndex >= this.passage.length,
    };
  }

  getProgress(): { current: number; total: number; typedChars: TypedChar[]; currentIndex: number } {
    return {
      current: this.currentIndex,
      total: this.passage.length,
      typedChars: this.typedChars,
      currentIndex: this.currentIndex,
    };
  }

  reset(passage?: string): void {
    this.passage = passage ?? this.passage;
    this.currentIndex = 0;
    this.typedChars = [];
    this.startTime = null;
    this.endTime = null;
    this.isActive = false;
    this.isFinished = false;
  }

  getState(): EngineState {
    return {
      passage: this.passage,
      currentIndex: this.currentIndex,
      typedChars: this.typedChars,
      startTime: this.startTime,
      endTime: this.endTime,
      isActive: this.isActive,
      isFinished: this.isFinished,
    };
  }
}
