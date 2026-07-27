"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is CareerType?",
    a: "CareerType is a free, browser-based typing platform where you practice using real career content instead of random words. Choose from Developer, Office, Customer Support, HR, Data Entry, or Student modes.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Everything works without an account. Your data is stored locally on your device. Accounts are only needed for optional features like verified certificates and cloud sync.",
  },
  {
    q: "Is CareerType really free?",
    a: "Yes, completely free. No subscriptions, no hidden payments, no limited trials. Forever free.",
  },
  {
    q: "What makes CareerType different from other typing sites?",
    a: "Instead of random words, you practice with real content from your career: Python code, SQL queries, office emails, customer support chats, HR letters, data entry forms, and more.",
  },
  {
    q: "How is my data stored?",
    a: "All your data is stored locally in your browser using IndexedDB. Nothing is sent to any server. You can reset your data any time in Settings.",
  },
  {
    q: "Can I get a certificate?",
    a: "Yes, verified certificates are available after creating a free account. They include your name, WPM, accuracy, and a QR code for verification.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--ct-text)]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--ct-border)] bg-[var(--ct-card)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--ct-text)] hover:bg-[var(--ct-bg-secondary)] transition-colors"
              >
                {faq.q}
                <svg
                  className={`w-4 h-4 text-[var(--ct-text-secondary)] transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-[var(--ct-text-secondary)] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
