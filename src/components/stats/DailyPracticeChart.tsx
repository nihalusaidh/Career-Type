"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import type { TypingSession } from "@/types";

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

interface DailyPracticeChartProps {
  sessions: TypingSession[];
  accentColor: string;
  textSecondary: string;
}

export function DailyPracticeChart({ sessions, accentColor, textSecondary }: DailyPracticeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const dailyData = useMemo(() => {
    const days: Record<string, number> = {};
    for (const session of sessions) {
      const date = new Date(session.timestamp).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      days[date] = (days[date] || 0) + session.duration;
    }
    return Object.entries(days).slice(-14);
  }, [sessions]);

  useEffect(() => {
    if (!canvasRef.current || dailyData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dailyData.map(([date]) => date),
        datasets: [
          {
            label: "Practice Time (s)",
            data: dailyData.map(([, time]) => Math.round(time)),
            backgroundColor: `${accentColor}40`,
            borderColor: accentColor,
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: "var(--ct-card)",
            borderColor: "var(--ct-border)",
            borderWidth: 1,
            titleColor: "var(--ct-text)",
            bodyColor: "var(--ct-text-secondary)",
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y ?? 0;
                if (val >= 60) {
                  const m = Math.floor(val / 60);
                  const s = val % 60;
                  return ` ${m}m ${s}s`;
                }
                return ` ${val}s`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textSecondary,
              font: { size: 9 },
              maxRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: `${textSecondary}15` },
            ticks: {
              color: textSecondary,
              font: { size: 10 },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dailyData, accentColor, textSecondary]);

  if (dailyData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--ct-text-secondary)]">
        Complete typing tests to see daily practice
      </div>
    );
  }

  return (
    <div className="h-48">
      <canvas ref={canvasRef} />
    </div>
  );
}
