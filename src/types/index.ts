export interface Career {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories: CareerSubCategory[];
}

export interface CareerSubCategory {
  id: string;
  name: string;
  description: string;
  passages: string[];
}

export interface TypingSession {
  id: string;
  career: string;
  subCategory: string;
  testType: TestType;
  testDuration: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  mistakes: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  wordsTyped: number;
  duration: number;
  completed: boolean;
  timestamp: number;
  charHistory: CharSnapshot[];
}

export interface CharSnapshot {
  char: string;
  correct: boolean;
  time: number;
  position: number;
}

export type TestType =
  | "30s" | "60s" | "120s" | "5min" | "10min"
  | "unlimited" | "custom-time" | "custom-paragraph" | "random-paragraph" | "career-paragraph";

export type TypingMode = "career" | "words" | "quotes" | "custom";

export interface WpmSnapshot {
  time: number;
  wpm: number;
}

export interface TypingState {
  status: "idle" | "countdown" | "active" | "paused" | "finished";
  currentCharIndex: number;
  typedChars: TypedChar[];
  startTime: number | null;
  endTime: number | null;
  mistakes: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  charHistory: CharSnapshot[];
  wpmHistory: WpmSnapshot[];
  mode: TypingMode;
  focusMode: boolean;
}

export interface TypedChar {
  expected: string;
  typed: string;
  correct: boolean;
  timestamp: number;
}

export interface Theme {
  id: string;
  name: string;
  type: "dark" | "light";
  colors: {
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    correct: string;
    incorrect: string;
    extra: string;
    caret: string;
    sub: string;
    card: string;
    border: string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalSessions: number;
  totalTime: number;
  totalChars: number;
  totalCorrectChars: number;
  totalMistakes: number;
  currentStreak: number;
  longestStreak: number;
  bestWpm: number;
  bestAccuracy: number;
  totalWpm: number;
  sessions: TypingSession[];
  achievements: string[];
  lastSessionDate: string | null;
  currentDayStreak: number;
}

export interface Settings {
  theme: string;
  sound: "mechanical" | "laptop" | "typewriter" | "silent";
  soundVolume: number;
  countdown: boolean;
  cursorStyle: "block" | "line" | "underline";
  fontSize: number;
  language: string;
}
