import { Metadata } from "next";
import { StatsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Typing Statistics",
  description: "View your typing statistics, charts, heatmaps, and progress over time.",
};

export default function StatsPage() {
  return <StatsPageClient />;
}
