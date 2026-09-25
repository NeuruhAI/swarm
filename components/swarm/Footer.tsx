import { REFERRAL_URL } from "./ReferralCTA";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-obsidian-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center bg-brass font-display text-xs font-black text-obsidian-950">
            S
          </span>
          <div>
            <div className="font-display text-sm font-extrabold tracking-[0.18em] text-bone">SWARM</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
              A Neuruh execution surface
            </div>
          </div>
        </div>

        <p className="max-w-md text-center font-mono text-[10px] leading-relaxed text-bone-faint md:text-left">
          Live simulation. Figures on this page are generated for demonstration, not audited results.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-brass"
          >
            Join Muse
          </a>
          <span className="font-mono text-[11px] text-bone-faint">© 2026 Neuruh LLC</span>
        </div>
      </div>
    </footer>
  );
}
