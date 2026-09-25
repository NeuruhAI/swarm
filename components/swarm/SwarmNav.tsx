"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Legions", href: "#legions" },
  { label: "Theater", href: "#theater" },
  { label: "Throughput", href: "#throughput" },
  { label: "Architecture", href: "#architecture" },
  { label: "Join", href: "#join" },
];

export function SwarmNav({ online }: { online: number }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/[0.06] bg-obsidian-950/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brass font-display text-sm font-black text-obsidian-950">
            S
          </span>
          <span className="font-display text-lg font-extrabold tracking-[0.18em] text-bone">SWARM</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-brass"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="glass-panel flex items-center gap-2 px-3 py-1.5">
            <span className="status-dot h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] tabular-nums text-bone-dim">
              <span className="text-bone">{online.toLocaleString()}</span> online
            </span>
          </div>
          <a
            href="https://muse.ai/join"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine hidden bg-brass px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-obsidian-950 transition-colors hover:bg-brass-bright sm:block"
          >
            Join Muse
          </a>
        </div>
      </div>
    </header>
  );
}
