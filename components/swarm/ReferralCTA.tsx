"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParticleField } from "./ParticleField";

export const REFERRAL_CODE = "T0WOZB";
export const REFERRAL_URL = "https://muse.ai/join";

export function ReferralCTA() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = REFERRAL_CODE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="join" className="relative overflow-hidden border-y border-brass/20 bg-obsidian-900">
      <ParticleField density={40} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,162,75,0.12), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-28 text-center md:px-8">
        <Reveal>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-brass">
            Early access
          </div>
          <h2 className="font-display text-balance text-4xl font-black tracking-tight text-bone md:text-6xl">
            Run with the swarm.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bone-dim">
            Muse is in early access. Join with my code and we both get 1 billion tokens. Bring your
            own missions.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={copy}
              className="group flex items-center gap-4 border border-brass/40 bg-obsidian-950/70 px-6 py-4 backdrop-blur transition-colors hover:border-brass"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-faint">
                Code
              </span>
              <span className="font-mono text-2xl font-bold tracking-[0.3em] text-brass">{REFERRAL_CODE}</span>
              {copied ? (
                <Check className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5 text-bone-faint transition-colors group-hover:text-brass" />
              )}
            </button>
            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 bg-brass px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-obsidian-950 transition-colors hover:bg-brass-bright"
            >
              Join Muse
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 font-mono text-[11px] text-bone-faint">
            {copied ? "Code copied. See you inside." : "Tap the code to copy it."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
