"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LEGIONS,
  SwarmActivity,
  SwarmAgent,
  lastSeenLabel,
  makeActivity,
  makeAgent,
  seedActivities,
  seedAgents,
} from "@/lib/swarm";

export interface ChartPoint {
  time: string;
  value: number;
  secondary?: number;
}

const MAX_AGENTS = 420;

function timeLabel(d: Date): string {
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function seedSeries(base: number, spread: number, n = 30): ChartPoint[] {
  const now = Date.now();
  const out: ChartPoint[] = [];
  let v = base;
  for (let i = n - 1; i >= 0; i--) {
    v = Math.max(8, v + (Math.random() - 0.48) * spread);
    out.push({
      time: timeLabel(new Date(now - i * 4000)),
      value: Math.round(v),
      secondary: Math.round(Math.max(4, v * (0.55 + Math.random() * 0.2))),
    });
  }
  return out;
}

export function useSwarm() {
  const [agents, setAgents] = useState<SwarmAgent[]>(() => seedAgents());
  const [activities, setActivities] = useState<SwarmActivity[]>(() => seedActivities());
  const [missions, setMissions] = useState(1284);
  const [signals, setSignals] = useState(48210);
  const [receipts, setReceipts] = useState(96402);
  const [throughput, setThroughput] = useState<ChartPoint[]>(() => seedSeries(220, 36));
  const [spawnRate, setSpawnRate] = useState<ChartPoint[]>(() => seedSeries(48, 14));
  const [running, setRunning] = useState(true);
  const counters = useRef({ perLegion: new Map<string, number>() });

  const spawn = useCallback((legionId: string, count: number) => {
    const legion = LEGIONS.find((l) => l.id === legionId);
    if (!legion) return;
    const start = (counters.current.perLegion.get(legionId) ?? 40) + 1;
    counters.current.perLegion.set(legionId, start + count);
    const fresh: SwarmAgent[] = [];
    for (let i = 0; i < count; i++) fresh.push(makeAgent(legion, start + i));
    setAgents((prev) => {
      const next = [...fresh, ...prev];
      return next.length > MAX_AGENTS ? next.slice(0, MAX_AGENTS) : next;
    });
    const note: SwarmActivity = {
      ...makeActivity(legion),
      action: `spawned ${count} agents`,
      target: `${legion.name} cohort`,
      status: "success",
      timestamp: new Date(),
    };
    setActivities((prev) => [note, ...prev].slice(0, 40));
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const n = 1 + Math.floor(Math.random() * 3);
      const fresh: SwarmActivity[] = [];
      for (let i = 0; i < n; i++) fresh.push(makeActivity());
      setActivities((prev) => [...fresh, ...prev].slice(0, 40));

      setAgents((prev) =>
        prev.map((a) => {
          if (Math.random() > 0.12) return a;
          const roll = Math.random();
          return {
            ...a,
            status: roll < 0.62 ? "active" : roll < 0.85 ? "busy" : "idle",
            lastSeenMin: Math.max(0, a.lastSeenMin + (Math.random() < 0.4 ? -1 : 1)),
            performance: Math.min(99, Math.max(52, a.performance + Math.round((Math.random() - 0.5) * 6))),
          };
        })
      );

      const label = timeLabel(new Date());
      setThroughput((prev) => {
        const last = prev[prev.length - 1]?.value ?? 220;
        const v = Math.max(60, Math.round(last + (Math.random() - 0.48) * 30));
        return [...prev.slice(-29), { time: label, value: v, secondary: Math.round(v * 0.62) }];
      });
      setSpawnRate((prev) => {
        const last = prev[prev.length - 1]?.value ?? 48;
        const v = Math.max(6, Math.round(last + (Math.random() - 0.5) * 10));
        return [...prev.slice(-29), { time: label, value: v, secondary: Math.round(v * 0.7) }];
      });

      setSignals((s) => s + 40 + Math.floor(Math.random() * 120));
      setReceipts((r) => r + 8 + Math.floor(Math.random() * 30));
      if (Math.random() < 0.3) setMissions((m) => m + 1);
    }, 2000);
    return () => clearInterval(t);
  }, [running]);

  const legionViews = useMemo(
    () =>
      LEGIONS.map((l) => {
        const members = agents.filter((a) => a.legionId === l.id);
        const active = members.filter((a) => a.status === "active").length;
        return {
          ...l,
          count: members.length,
          active,
          agents: [...members]
            .sort((a, b) => b.performance - a.performance)
            .slice(0, 8)
            .map((a) => ({
              id: a.id,
              name: a.callsign,
              role: a.role,
              status: a.status,
              lastActivity: lastSeenLabel(a.lastSeenMin),
              performance: a.performance,
            })),
        };
      }),
    [agents]
  );

  const mapAgents = useMemo(
    () =>
      agents.map((a) => ({
        id: a.id,
        city: a.city,
        state: a.state,
        x: a.x,
        y: a.y,
        legion: a.legionId,
        color: a.color,
        name: a.callsign,
      })),
    [agents]
  );

  const online = useMemo(() => agents.filter((a) => a.status !== "idle").length, [agents]);

  return {
    agents,
    activities,
    legionViews,
    mapAgents,
    online,
    total: agents.length,
    missions,
    signals,
    receipts,
    throughput,
    spawnRate,
    running,
    setRunning,
    spawn,
  };
}
