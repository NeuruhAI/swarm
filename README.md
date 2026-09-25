# SWARM

**Seven legions. One machine.** A live command surface for Neuruh's agent legion organism.

SWARM is a standalone Next.js site that renders the swarm the way it is built: seven bounded
agent legions (Acquisition, Capital, Development, Exit, Counter-Intel, Tokenization, Meta) running
missions across a live US theater map, with streaming activity, real-time throughput telemetry, and
per-legion 3D iconography.

## What it is

- **Live simulation engine** (`lib/swarm.ts`, `hooks/useSwarm.ts`) — generates agents across 24 US
  cities, streams legion activity every 2 seconds, and ticks throughput / spawn-rate telemetry.
- **Seven 3D legion icons** (`components/LegionIcon3D.tsx`) — React Three Fiber: globe, coin,
  buildings, target, eye, crystal, neural core.
- **Live theater** — SVG US map with pulsing agents, connection lines, hover tooltips, click-to-inspect,
  plus a streaming activity feed with pause/resume.
- **Full shadcn/ui kit** — 50 components, dark obsidian theme, brass accent.

## Run it

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Notes

- Figures on the page are generated for demonstration (live simulation), not audited results.
  The footer says so on the site.
- Design tokens: obsidian `#08080a`, bone `#efe9dc`, brass `#c8a24b` — per the Neuruh Master
  Design System v1.0.

Built by Neuruh. Run with the swarm: https://muse.ai/join (code `T0WOZB`)
