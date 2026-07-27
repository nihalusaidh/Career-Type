"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { TypingSession } from "@/types";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface ErrorDistributionProps {
  sessions: TypingSession[];
  accentColor: string;
  textSecondary: string;
}

const errorCategories = [
  { label: "Letters", test: (c: string) => /[a-zA-Z]/.test(c) },
  { label: "Numbers", test: (c: string) => /[0-9]/.test(c) },
  { label: "Symbols", test: (c: string) => /[^a-zA-Z0-9\s]/.test(c) },
  { label: "Spaces", test: (c: string) => /\s/.test(c) },
];

const colorPalette = ["#6366f1", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6", "#ec4899"];

export function ErrorDistribution({ sessions, accentColor, textSecondary }: ErrorDistributionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const errorData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const session of sessions) {
      for (const ch of session.charHistory) {
        if (ch.correct) continue;
        for (const cat of errorCategories) {
          if (cat.test(ch.char)) {
            counts[cat.label] = (counts[cat.label] || 0) + 1;
            break;
          }
        }
      }
    }
    return counts;
  }, [sessions]);

  useEffect(() => {
    if (!canvasRef.current || Object.keys(errorData).length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const labels = Object.keys(errorData);
    const values = Object.values(errorData);

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colorPalette.slice(0, labels.length),
            borderWidth: 2,
            borderColor: "var(--ct-card)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: textSecondary,
              font: { size: 11 },
              padding: 12,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "var(--ct-card)",
            borderColor: "var(--ct-border)",
            borderWidth: 1,
            titleColor: "var(--ct-text)",
            bodyColor: "var(--ct-text-secondary)",
            callbacks: {
              label: (ctx) => {
                const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                const val = ctx.parsed as unknown as number;
                return ` ${ctx.label}: ${val} (${Math.round((val / total) * 100)}%)`;
              },
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
  }, [errorData, accentColor, textSecondary]);

  if (Object.keys(errorData).length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--ct-text-secondary)]">
        Complete typing tests to see error distribution
      </div>
    );
  }

  return (
    <div className="h-48 flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}
