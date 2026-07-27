import { Metadata } from "next";
import { AchievementsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Achievements",
  description: "View your CareerType achievements and unlock new milestones.",
};

export default function AchievementsPage() {
  return <AchievementsPageClient />;
}
