"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { LEGIONS } from "@/lib/swarm";
import { ParticleField } from "./ParticleField";

interface HeroProps {
  online: number;
  missions: number;
  signals: number;
  receipts: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ online, missions, signals, receipts }: HeroProps) {
  const stats = [
    { label: "Agents online", value: online.toLocaleString() },
    { label: "Missions completed", value: missions.toLocaleString() },
    { label: "Signals processed", value: signals.toLocaleString() },
    { label: "Receipts hashed", value: receipts.toLocaleString() },
  ];

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <ParticleField density={80} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(200,162,75,0.10), transparent 70%)" }}
      />
      <div className="absolute -right-40 top-1/3 hidden h-[560px] w-[560px] animate-spin-slow rounded-full border border-brass/15 lg:block">
        <div className="absolute inset-12 rounded-full border border-brass/10" />
        <div className="absolute inset-28 rounded-full border border-brass/[0.07]" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brass shadow-[0_0_18px_rgba(200,162,75,0.9)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-32 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <div className="mb-6 inline-flex items-center gap-3 border border-brass/30 bg-brass/[0.06] px-4 py-2">
            <span className="status-dot h-2 w-2 rounded-full bg-brass" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass">
              Neuruh execution infrastructure
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display text-balance text-[17vw] font-black leading-[0.9] tracking-tight text-bone sm:text-[13vw] lg:text-[9.5rem]"
        >
          THE
          <br />
          <span className="text-brass">SWARM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl"
        >
          Seven agent legions running bounded missions across the country. Every action hashed into a
          receipt. Every receipt kept in custody. Nothing runs on vibes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#legions"
            className="btn-shine group inline-flex items-center gap-2 bg-brass px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-obsidian-950 transition-colors hover:bg-brass-bright"
          >
            Meet the legions
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://muse.ai/join"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-white/15 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:border-brass/60 hover:text-brass"
          >
            Join Muse
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-obsidian-950/80 px-6 py-5 backdrop-blur">
              <div className="font-display text-3xl font-extrabold tabular-nums text-bone md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mask-fade-x relative border-t border-white/[0.06] bg-obsidian-950/60 py-4 backdrop-blur">
        <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-12 whitespace-nowrap">
          {[...LEGIONS, ...LEGIONS].map((l, i) => (
            <span key={i} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-faint">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
