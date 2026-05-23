import Link from "next/link";

const nav = [
  { href: "/directory", label: "Directory" },
  { href: "/pathways", label: "Pathways" },
  { href: "/destinations", label: "Destinations" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/skills", label: "AI Skills" },
  { href: "/networking", label: "Networking" },
  { href: "/leadership", label: "Leadership" },
  { href: "/org", label: "The Org" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--bg)]/70 border-b hairline">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="dot" />
          <span className="mono text-sm tracking-tight">
            <span className="text-[color:var(--fg-mute)]">ex-</span>
            <span className="text-[color:var(--fg)] group-hover:text-[color:var(--accent)] transition">leanspace</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:bg-[color:var(--panel)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/pathways" className="btn btn-primary text-xs">
          Start →
        </Link>
      </div>
      <details className="md:hidden border-t hairline">
        <summary className="px-5 py-3 text-sm text-[color:var(--fg-soft)] mono cursor-pointer">menu</summary>
        <nav className="px-5 pb-4 flex flex-col gap-1 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
