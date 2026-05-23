import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2">
          <div className="mono text-xs uppercase tracking-widest text-[color:var(--fg-mute)] mb-2">ex-leanspace</div>
          <p className="text-[color:var(--fg-soft)] max-w-sm">
            An unofficial career helper for alumni of <a className="link" href="https://leanspace.io" target="_blank" rel="noopener">Leanspace</a>.
            Not affiliated with Leanspace SAS. Built by an alum for alumni.
          </p>
        </div>
        <div>
          <div className="kicker mb-2">Site</div>
          <ul className="space-y-1.5 text-[color:var(--fg-soft)]">
            <li><Link href="/directory">Alumni directory</Link></li>
            <li><Link href="/recommendations">Recommendations</Link></li>
            <li><Link href="/pathways">Career pathways</Link></li>
            <li><Link href="/skills">AI skills & prompts</Link></li>
            <li><Link href="/networking">Networking</Link></li>
            <li><Link href="/leadership">Leadership</Link></li>
            <li><Link href="/org">The org map</Link></li>
          </ul>
        </div>
        <div>
          <div className="kicker mb-2">Related</div>
          <ul className="space-y-1.5 text-[color:var(--fg-soft)]">
            <li><a className="hover:text-[color:var(--fg)]" href="https://leanspace.io" target="_blank" rel="noopener">leanspace.io ↗</a></li>
            <li><a className="hover:text-[color:var(--fg)]" href="https://pconpiee.github.io/cv-guide/" target="_blank" rel="noopener">CV Guide ↗</a></li>
            <li><a className="hover:text-[color:var(--fg)]" href="https://pconpiee.github.io/bullet-builder/" target="_blank" rel="noopener">Bullet Builder ↗</a></li>
            <li><a className="hover:text-[color:var(--fg)]" href="https://pconpiee.github.io/career-folder/" target="_blank" rel="noopener">Career Folder ↗</a></li>
            <li><a className="hover:text-[color:var(--fg)]" href="https://blue-canopy.vercel.app" target="_blank" rel="noopener">Blue Canopy ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-wrap items-center justify-between gap-3 mono text-xs text-[color:var(--fg-mute)]">
          <span>Last updated May 2026 · v0.1</span>
          <span>Made for alumni of a small Strasbourg space-software company.</span>
        </div>
      </div>
    </footer>
  );
}
