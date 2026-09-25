import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SWARM — Neuruh Agent Legion Command",
  description:
    "Seven agent legions running bounded missions across the country. Every action hashed. Every receipt kept. A Neuruh execution surface.",
  openGraph: {
    title: "SWARM — Neuruh Agent Legion Command",
    description: "Seven legions. One machine. Every action hashed into a receipt.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-obsidian-950 font-sans text-bone antialiased">{children}</body>
    </html>
  );
}
