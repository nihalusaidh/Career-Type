export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function calculateWPM(
  charCount: number,
  timeSeconds: number
): number {
  if (timeSeconds <= 0) return 0;
  const minutes = timeSeconds / 60;
  const words = charCount / 5;
  return Math.round(words / minutes);
}

export function calculateAccuracy(
  correct: number,
  total: number
): number {
  if (total <= 0) return 100;
  return Math.round((correct / total) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getTimeFromTestType(testType: string, customDuration?: number): number | null {
  switch (testType) {
    case "30s": return 30;
    case "60s": return 60;
    case "120s": return 120;
    case "5min": return 300;
    case "10min": return 600;
    case "custom-time": return customDuration ?? null;
    case "unlimited": return null;
    default: return null;
  }
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}
