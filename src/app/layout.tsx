import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CareerType – Free Career-Focused Typing Practice",
    template: "%s | CareerType",
  },
  description:
    "Practice typing using real career content. Developer code, office documents, customer support chats, and more. Free, no login required.",
  keywords: [
    "typing practice",
    "typing for developers",
    "code typing",
    "typing speed test",
    "career typing",
    "free typing test",
    "typing practice for programmers",
  ],
  openGraph: {
    title: "CareerType – Free Career-Focused Typing Platform",
    description:
      "Practice typing using real career content instead of random words. Free, no login required.",
    type: "website",
    siteName: "CareerType",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerType – Free Career-Focused Typing Platform",
    description:
      "Practice typing using real career content instead of random words. Free, no login required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
