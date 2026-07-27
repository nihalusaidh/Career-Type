"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { careers } from "@/data/careers";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TypingOverlay } from "@/components/typing/TypingOverlay";
import { FAQ } from "./FAQ";

const careerIcons: Record<string, React.ReactNode> = {
  developer: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  office: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "customer-support": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  hr: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "data-entry": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  student: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
};

export function LandingPage() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("developer");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const openOverlay = (career?: string) => {
    if (career) setSelectedCareer(career);
    setOverlayOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ct-accent)]/5 to-transparent pointer-events-none" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--ct-text)]"
          >
            Practice Typing for{" "}
            <span className="text-[var(--ct-accent)]">Your Career</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-[var(--ct-text-secondary)] max-w-2xl mx-auto"
          >
            Improve typing using real developer code, office documents, customer
            chats, emails, and professional content instead of random words.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" onClick={() => openOverlay("developer")}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Typing
            </Button>
            <Button variant="secondary" size="lg" onClick={() => openOverlay()}>
              Choose Career
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Career Cards */}
      <section id="careers" className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--ct-text)]">
              Choose Your Career Path
            </h2>
            <p className="mt-2 text-[var(--ct-text-secondary)]">
              Practice with content that matches your profession
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openOverlay(career.id)}
              >
                <Card className="h-full hover:border-[var(--ct-accent)]/50 transition-colors group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-[var(--ct-accent)]/10 text-[var(--ct-accent)]">
                      {careerIcons[career.id]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ct-text)] group-hover:text-[var(--ct-accent)] transition-colors">
                        {career.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ct-text-secondary)]">
                        {career.description}
                      </p>
                      <p className="mt-2 text-xs text-[var(--ct-text-secondary)]">
                        {career.subCategories.length} categories
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:py-24 bg-[var(--ct-bg-secondary)]/50">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--ct-text)]">
              Everything You Need
            </h2>
            <p className="mt-2 text-[var(--ct-text-secondary)]">
              Professional typing tools, completely free
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Card>
                  <div className="p-2 mb-3 w-fit rounded-xl bg-[var(--ct-accent)]/10 text-[var(--ct-accent)]">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--ct-text)]">{feature.title}</h3>
                  <p className="mt-1 text-sm text-[var(--ct-text-secondary)]">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t border-[var(--ct-border)] px-4 py-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--ct-text-secondary)]">
            &copy; {new Date().getFullYear()} CareerType. Free &amp; open typing platform.
          </p>
          <div className="flex gap-4 text-sm text-[var(--ct-text-secondary)]">
            <Link href="/" className="hover:text-[var(--ct-text)]">Home</Link>
            <Link href="/typing/developer" className="hover:text-[var(--ct-text)]">Developer</Link>
            <Link href="/typing/office" className="hover:text-[var(--ct-text)]">Office</Link>
            <Link href="/typing/customer-support" className="hover:text-[var(--ct-text)]">Support</Link>
          </div>
        </div>
      </footer>

      {/* Typing Overlay */}
      <TypingOverlay
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        initialCareer={selectedCareer}
      />
    </div>
  );
}

const features = [
  {
    title: "Career-Based Practice",
    description: "Type real content from your profession — code, emails, reports, and more.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Typing Analytics",
    description: "Track WPM, accuracy, mistakes, and see your improvement over time.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Keyboard Heatmaps",
    description: "Visualize your weak keys and improve your weakest fingers.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "100% Free",
    description: "No subscriptions, no hidden costs. Everything is free forever.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    title: "No Login Required",
    description: "Start typing instantly. Your data stays on your device.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Friends Racing",
    description: "Create private rooms and race friends in real-time.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];
