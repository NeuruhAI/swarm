"use client";

import { useState } from "react";
import { Activity, Fingerprint, Pause, Play, Radar, Target } from "lucide-react";
import { useSwarm } from "@/hooks/useSwarm";
import { SwarmNav } from "@/components/swarm/SwarmNav";
import { Hero } from "@/components/swarm/Hero";
import { Reveal } from "@/components/swarm/Reveal";
import { StatCard } from "@/components/StatCard";
import { LegionCard } from "@/components/LegionCard";
import { USMap } from "@/components/USMap";
import { ActivityFeed } from "@/components/ActivityFeed";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Architecture } from "@/components/swarm/Architecture";
import { ReferralCTA } from "@/components/swarm/ReferralCTA";
import { Footer } from "@/components/swarm/Footer";

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <Reveal>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-brass">{eyebrow}</div>
      <h2 className="font-display max-w-3xl text-4xl font-black tracking-tight text-bone md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">{sub}</p>
    </Reveal>
  );
}

export default function Page() {
  const swarm = useSwarm();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const stats = [
    {
      title: "Agents online",
      value: swarm.online,
      icon: Activity,
      iconColor: "#c8a24b",
      change: 4.2,
      changeLabel: "vs last hour",
    },
    {
      title: "Missions completed",
      value: swarm.missions,
      icon: Target,
      iconColor: "#efe9dc",
      change: 12.8,
      changeLabel: "vs yesterday",
    },
    {
      title: "Signals processed",
      value: swarm.signals,
      icon: Radar,
      iconColor: "#c8a24b",
      change: 8.1,
      changeLabel: "vs yesterday",
    },
    {
      title: "Receipts hashed",
      value: swarm.receipts,
      icon: Fingerprint,
      iconColor: "#efe9dc",
      change: 6.4,
      changeLabel: "vs yesterday",
    },
  ];

  return (
    <main className="relative min-h-screen bg-obsidian-950 text-bone">
      <SwarmNav online={swarm.online} />

      <Hero
        online={swarm.online}
        missions={swarm.missions}
        signals={swarm.signals}
        receipts={swarm.receipts}
      />

      {/* live stats */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              icon={s.icon}
              iconColor={s.iconColor}
              gradientFrom="#e3bd63"
              gradientTo="#9a7829"
              change={s.change}
              changeLabel={s.changeLabel}
              delay={i * 0.08}
            />
          ))}
        </div>
      </section>

      {/* legions */}
      <section id="legions" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-8">
        <SectionHead
          eyebrow="The organism"
          title="Seven legions. Zero overlap."
          sub="Each legion owns one job and does it inside a bounded contract. Spawn more when the mission demands it. Watch them work in the theater below."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {swarm.legionViews.map((l, i) => (
            <Reveal key={l.id} delay={(i % 3) * 0.08} className="h-full">
              <LegionCard
                id={l.id}
                name={l.name}
                count={l.count}
                active={l.active}
                color={l.color}
                description={l.description}
                capabilities={l.capabilities}
                agents={l.agents}
                onSpawn={(n) => swarm.spawn(l.id, n)}
                delay={0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* theater */}
      <section id="theater" className="scroll-mt-20 border-y border-white/[0.06] bg-obsidian-900/60 py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Live theater"
              title="Watch the country work"
              sub="Every dot is an agent on a mission. Every row in the feed is a hashed action. Tap a city marker to inspect the agent."
            />
            <Reveal delay={0.1}>
              <button
                onClick={() => swarm.setRunning((r) => !r)}
                className="btn-shine flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:border-brass/60 hover:text-brass"
              >
                {swarm.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {swarm.running ? "Pause feed" : "Resume feed"}
              </button>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal className="lg:col-span-2" delay={0.05}>
              <div className="glass-panel h-full p-2">
                <USMap
                  agents={swarm.mapAgents}
                  isRunning={swarm.running}
                  onAgentClick={(a) => setSelectedAgent(`${a.name} · ${a.city}, ${a.state}`)}
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col gap-4">
                <div className="glass-panel px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
                    Inspector
                  </div>
                  <div className="mt-1 font-mono text-sm text-brass">
                    {selectedAgent ?? "Tap a city marker on the map"}
                  </div>
                </div>
                <div className="min-h-[380px] flex-1">
                  <ActivityFeed activities={swarm.activities} maxItems={24} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* throughput */}
      <section id="throughput" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-8">
        <SectionHead
          eyebrow="Telemetry"
          title="Throughput, live"
          sub="Operations per minute and spawn rate across all seven legions, updating every two seconds."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <PerformanceChart
              data={swarm.throughput}
              title="Operations throughput"
              color="#c8a24b"
              showSecondary
              secondaryColor="#efe9dc"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <PerformanceChart
              data={swarm.spawnRate}
              title="Agent spawn rate"
              color="#e3bd63"
              showSecondary
              secondaryColor="#9a7829"
            />
          </Reveal>
        </div>
      </section>

      <Architecture />
      <ReferralCTA />
      <Footer />
    </main>
  );
}
