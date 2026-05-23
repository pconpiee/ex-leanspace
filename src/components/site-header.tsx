"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/directory", label: "Directory" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/pathways", label: "Pathways" },
  { href: "/skills", label: "AI Prompts" },
  { href: "/networking", label: "Networking" },
  { href: "/org", label: "Org map" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--bg)]/70 border-b hairline">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="dot" />
          <span className="mono text-sm tracking-tight">
            <span className="text-[color:var(--fg-mute)]">ex-</span>
            <span className="text-[color:var(--fg)] group-hover:text-[color:var(--accent)] transition">leanspace</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md transition ${
                active
                  ? "text-[color:var(--fg)] bg-[color:var(--panel)] font-medium"
                  : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:bg-[color:var(--panel)]"
              }`}
            >
              {item.label}
            </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/directory" className="hidden md:inline-flex btn btn-primary text-xs">
            Find alumni →
          </Link>
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-[color:var(--panel)] transition"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`block w-5 h-px bg-[color:var(--fg-soft)] transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-5 h-px bg-[color:var(--fg-soft)] transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-px bg-[color:var(--fg-soft)] transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t hairline bg-[color:var(--bg)]/95 backdrop-blur-md">
          <div className="px-5 py-3 flex flex-col">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 border-b hairline last:border-0 transition text-sm ${
                  active
                    ? "text-[color:var(--fg)] font-medium"
                    : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]"
                }`}
              >
                {item.label}
              </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

