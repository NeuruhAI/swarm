"use client";

import { FileCheck2, GitBranch, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: Workflow,
    title: "Mission envelope",
    body: "Every mission ships with identity, objective, authority tier, acceptance tests, and stop conditions. No agent moves without one. No clipboard handoffs, no lost receipts between workers.",
  },
  {
    icon: GitBranch,
    title: "Event-driven, not chatty",
    body: "Legions do not chat with each other. They emit typed events, ingest receipts, and route through a deterministic switch. Star topology, parent-mediated, bounded contracts. No freelancing.",
  },
  {
    icon: FileCheck2,
    title: "Receipts or it didn't happen",
    body: "Tokenization hashes every action into custody. An independent court judges the evidence against the mission contract. If there is no receipt, the work does not count.",
  },
  {
    icon: ShieldCheck,
    title: "Bounded autonomy",
    body: "Spawn caps, no-op budgets, stall detection. The swarm scales inside the fence and stops at the edge. Money, offers, and consequential calls stay human. Always.",
  },
];

const STACK = ["Next.js 14", "React Three Fiber", "shadcn/ui", "Framer Motion", "Recharts", "Tailwind CSS"];

export function Architecture() {
  return (
    <section id="architecture" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8">
      <Reveal>
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-brass">Under the hood</div>
        <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-bone md:text-6xl">
          How the swarm is built
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
          Not a chatbot with extra steps. A governed organism: seven legions, one switch, one court,
          one custody chain. The architecture that keeps seven hundred agents from becoming seven
          hundred problems.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="glass-panel card-lift group h-full p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-brass/30 bg-brass/[0.07] text-brass transition-colors group-hover:bg-brass group-hover:text-obsidian-950">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-faint">
                0{i + 1}
              </div>
              <h3 className="font-display mt-2 text-2xl font-extrabold text-bone">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-bone-dim">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-faint">Built with</span>
          {STACK.map((s) => (
            <span
              key={s}
              className="border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
