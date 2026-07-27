import { Metadata } from "next";
import { SettingsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize your CareerType experience — themes, sounds, and preferences.",
};

export default function SettingsPage() {
  return <SettingsPageClient />;
}
