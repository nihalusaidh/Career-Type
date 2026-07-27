"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--ct-border)] bg-[var(--ct-card)]/80 backdrop-blur-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
