"use client";

import { useMemo } from "react";
import type { WpmSnapshot } from "@/types";

interface WpmSparklineProps {
  data: WpmSnapshot[];
  accentColor: string;
  textSecondary: string;
}

export function WpmSparkline({ data, accentColor, textSecondary }: WpmSparklineProps) {
  const path = useMemo(() => {
    if (data.length < 2) return null;
    const values = data.map((d) => d.wpm);
    const max = Math.max(...values, 1);
    const width = 200;
    const height = 40;
    const padding = 2;
    const points = values.map((v, i) => {
      const x = padding + (i / (values.length - 1)) * (width - 2 * padding);
      const y = height - padding - (v / max) * (height - 2 * padding);
      return `${x},${y}`;
    });
    return points.join(" ");
  }, [data]);

  if (data.length < 2) {
    return (
      <div className="w-[200px] h-10 flex items-center justify-center">
        <span className="text-[10px]" style={{ color: textSecondary }}>—</span>
      </div>
    );
  }

  return (
    <svg width="200" height="40" className="overflow-visible">
      <polyline
        points={path!}
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
