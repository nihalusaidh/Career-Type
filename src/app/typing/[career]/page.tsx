import { notFound } from "next/navigation";
import { Metadata } from "next";
import { careers } from "@/data/careers";
import { TypingPageClient } from "./client";

interface Props {
  params: Promise<{ career: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { career: careerId } = await params;
  const career = careers.find((c) => c.id === careerId);
  if (!career) return { title: "Career Not Found" };

  return {
    title: `${career.name} Typing Practice`,
    description: career.description,
    openGraph: {
      title: `${career.name} Typing Practice – CareerType`,
      description: career.description,
    },
  };
}

export async function generateStaticParams() {
  return careers.map((c) => ({ career: c.id }));
}

export default async function CareerTypingPage({ params }: Props) {
  const { career: careerId } = await params;
  const career = careers.find((c) => c.id === careerId);
  if (!career) notFound();

  return <TypingPageClient careerId={careerId} />;
}
