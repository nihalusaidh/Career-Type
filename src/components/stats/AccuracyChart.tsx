"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import type { TypingSession } from "@/types";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface AccuracyChartProps {
  sessions: TypingSession[];
  accentColor: string;
  errorColor: string;
  textSecondary: string;
}

export function AccuracyChart({ sessions, accentColor, errorColor, textSecondary }: AccuracyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || sessions.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const recent = sessions.slice(-30);
    const labels = recent.map((_, i) => `#${i + 1}`);
    const accuracyData = recent.map((s) => s.accuracy);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Accuracy %",
            data: accuracyData,
            borderColor: accentColor,
            backgroundColor: `${accentColor}15`,
            pointBackgroundColor: accentColor,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            yAxisID: "y",
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
              label: (ctx) => `${ctx.parsed.y}%`,
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            min: 80,
            max: 100,
            grid: {
              color: `${textSecondary}20`,
            },
            ticks: {
              color: textSecondary,
              font: { size: 11 },
              callback: (value) => `${value}%`,
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
  }, [sessions, accentColor, errorColor, textSecondary]);

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--ct-text-secondary)]">
        Complete a typing test to see your accuracy trend
      </div>
    );
  }

  return (
    <div className="h-48">
      <canvas ref={canvasRef} />
    </div>
  );
}
