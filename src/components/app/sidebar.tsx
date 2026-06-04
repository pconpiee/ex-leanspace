"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app", label: "Dashboard", exact: true },
  { href: "/app/applications", label: "Applications" },
  { href: "/app/cv", label: "My CV" },
];

export function AppSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex md:flex-col w-full md:w-56 md:min-h-screen md:border-r hairline px-4 md:px-5 py-3 md:py-6 gap-2 md:gap-1 bg-[color:var(--bg-soft)] overflow-x-auto md:overflow-visible">
      <Link href="/" className="hidden md:flex items-center gap-2 mb-6 group">
        <span className="dot" />
        <span className="mono text-sm">
          <span className="text-[color:var(--fg-mute)]">ex-</span>
          <span className="text-[color:var(--fg)] group-hover:text-[color:var(--accent)] transition">
            leanspace
          </span>
        </span>
      </Link>

      <nav className="flex md:flex-col gap-1 flex-1">
        {links.map((l) => {
          const active = l.exact
            ? pathname === l.href
            : pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-md text-sm transition whitespace-nowrap ${
                active
                  ? "bg-[color:var(--panel)] text-[color:var(--fg)] font-medium"
                  : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:bg-[color:var(--panel)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:block mt-auto pt-6 text-xs text-[color:var(--fg-mute)]">
        <div className="mb-2 truncate" title={email}>
          {email}
        </div>
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="text-[color:var(--fg-mute)] hover:text-[color:var(--warn)] underline"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
