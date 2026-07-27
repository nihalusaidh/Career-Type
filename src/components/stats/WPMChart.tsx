"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";
import type { TypingSession } from "@/types";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

interface WPMChartProps {
  sessions: TypingSession[];
  accentColor: string;
  textSecondary: string;
}

export function WPMChart({ sessions, accentColor, textSecondary }: WPMChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || sessions.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const recent = sessions.slice(-30);
    const labels = recent.map((_, i) => `#${i + 1}`);
    const wpmData = recent.map((s) => s.wpm);
    const avgWpm = wpmData.reduce((a, b) => a + b, 0) / wpmData.length;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "WPM",
            data: wpmData,
            borderColor: accentColor,
            backgroundColor: `${accentColor}15`,
            pointBackgroundColor: accentColor,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.3,
            borderWidth: 2,
          },
          {
            label: "Average",
            data: Array(wpmData.length).fill(Math.round(avgWpm)),
            borderColor: textSecondary,
            borderDash: [4, 4],
            pointRadius: 0,
            borderWidth: 1,
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
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: true,
            grid: {
              color: `${textSecondary}20`,
            },
            ticks: {
              color: textSecondary,
              font: { size: 11 },
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
  }, [sessions, accentColor, textSecondary]);

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--ct-text-secondary)]">
        Complete a typing test to see your WPM trend
      </div>
    );
  }

  return (
    <div className="h-48">
      <canvas ref={canvasRef} />
    </div>
  );
}
