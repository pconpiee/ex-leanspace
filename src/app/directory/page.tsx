"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/section";
import { alumni, clusters, domainOrder, type AlumniStatus, type LeanspaceDomain } from "@/lib/data/alumni";

// ── Status badge ──────────────────────────────────────────────────────────────
const statusLabel: Record<AlumniStatus, string> = {
  employed: "Landed",
  freelance: "Freelance",
  searching: "Open to roles",
  unknown: "Not listed",
};

const statusClass: Record<AlumniStatus, string> = {
  employed: "tag tag-good",
  freelance: "tag tag-warm",
  searching: "tag",
  unknown: "tag tag-mute",
};

// ── Single card ───────────────────────────────────────────────────────────────
function AlumnusCard({ person }: { person: (typeof alumni)[number] }) {
  const hasLanded = person.currentRole || person.currentCompany;

  return (
    <div className="panel p-5 flex flex-col gap-3 group">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium text-[color:var(--fg)]">{person.name}</div>
          <div className="text-xs text-[color:var(--fg-mute)] mt-0.5 mono">{person.tenure}</div>
        </div>
        <span className={statusClass[person.status]}>{statusLabel[person.status]}</span>
      </div>

      {/* Leanspace role */}
      <div>
        <div className="text-xs kicker mb-1">At Leanspace</div>
        <div className="text-sm text-[color:var(--fg-soft)]">{person.leanspaceRole}</div>
      </div>

      {/* Arrow + destination */}
      {hasLanded && (
        <div>
          <div className="text-xs kicker mb-1">Now</div>
          <div className="text-sm text-[color:var(--fg)]">
            {person.currentRole}
            {person.currentCompany && (
              <span className="text-[color:var(--fg-soft)]"> @ {person.currentCompany}</span>
            )}
          </div>
          {person.sector && (
            <div className="mt-1">
              <span className="tag tag-mute text-xs">{person.sector}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer: location + LinkedIn */}
      <div className="mt-auto pt-2 border-t hairline flex items-center justify-between gap-2">
        <span className="text-xs text-[color:var(--fg-mute)]">
          {person.location ?? "—"}
        </span>
        {person.linkedIn ? (
          <a
            href={person.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-xs"
          >
            LinkedIn ↗
          </a>
        ) : (
          <span className="text-xs text-[color:var(--fg-mute)]">No profile</span>
        )}
      </div>
    </div>
  );
}

// ── Cluster callout ───────────────────────────────────────────────────────────
function ClusterCard({ cluster }: { cluster: (typeof clusters)[number] }) {
  return (
    <div className="panel p-5 border-l-2 border-[color:var(--accent-soft)]">
      <div className="text-sm font-medium text-[color:var(--accent)]">{cluster.label}</div>
      <div className="text-xs text-[color:var(--fg-soft)] mt-1">{cluster.note}</div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {cluster.members.map((m) => (
          <span key={m} className="tag tag-mute text-xs">{m}</span>
        ))}
      </div>
    </div>
  );
}

// ── Domain filter button ──────────────────────────────────────────────────────
function FilterBtn({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm transition flex items-center gap-1.5 ${
        active
          ? "bg-[color:var(--accent)] text-[color:var(--bg)] font-medium"
          : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:bg-[color:var(--panel)]"
      }`}
    >
      {label}
      <span
        className={`mono text-xs ${active ? "opacity-70" : "text-[color:var(--fg-mute)]"}`}
      >
        {count}
      </span>
    </button>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const employed = alumni.filter((a) => a.status === "employed").length;
  const freelance = alumni.filter((a) => a.status === "freelance").length;
  const searching = alumni.filter((a) => a.status === "searching").length;

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div>
        <span className="mono text-3xl font-bold text-[color:var(--fg)]">{alumni.length}</span>
        <div className="text-[color:var(--fg-mute)] text-xs mt-0.5">known alumni</div>
      </div>
      <div>
        <span className="mono text-3xl font-bold text-[color:var(--good)]">{employed}</span>
        <div className="text-[color:var(--fg-mute)] text-xs mt-0.5">landed roles</div>
      </div>
      <div>
        <span className="mono text-3xl font-bold text-[color:var(--warm)]">{freelance}</span>
        <div className="text-[color:var(--fg-mute)] text-xs mt-0.5">freelancing</div>
      </div>
      <div>
        <span className="mono text-3xl font-bold text-[color:var(--warn)]">{searching}</span>
        <div className="text-[color:var(--fg-mute)] text-xs mt-0.5">open to roles</div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DirectoryPage() {
  const [activeFilter, setActiveFilter] = useState<LeanspaceDomain | "All">("All");

  const filterOptions: Array<{ label: string; value: LeanspaceDomain | "All" }> = [
    { label: "All", value: "All" },
    ...domainOrder.map((d) => ({ label: d, value: d })),
  ];

  const filtered =
    activeFilter === "All"
      ? alumni
      : alumni.filter((a) => a.domain === activeFilter);

  return (
    <>
      <PageHeader
        kicker="Alumni directory"
        title="Who we are now"
        lede="Where 19 (known) Leanspacers landed after the ride. A living record of the people who built something real together."
      />

      {/* Stats + clusters */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Stats */}
          <div>
            <div className="kicker mb-4">At a glance</div>
            <StatsBar />
            <p className="text-sm text-[color:var(--fg-soft)] mt-4 max-w-sm">
              Data from LinkedIn, May 2026. Know someone missing?{" "}
              <a
                href="https://github.com/pconpiee/ex-leanspace/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--accent)] hover:underline"
              >
                Open a PR ↗
              </a>
            </p>
          </div>

          {/* Clusters */}
          <div>
            <div className="kicker mb-4">Notable clusters</div>
            <div className="space-y-3">
              {clusters.map((c) => (
                <ClusterCard key={c.label} cluster={c} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Filter + grid */}
      <div className="border-t hairline">
        <Container className="py-8 md:py-10">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-1 mb-8">
            {filterOptions.map((opt) => (
              <FilterBtn
                key={opt.value}
                label={opt.label}
                active={activeFilter === opt.value}
                count={
                  opt.value === "All"
                    ? alumni.length
                    : alumni.filter((a) => a.domain === opt.value).length
                }
                onClick={() => setActiveFilter(opt.value)}
              />
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((person) => (
              <AlumnusCard key={person.name} person={person} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-[color:var(--fg-mute)] text-sm">No alumni found for this filter.</p>
          )}
        </Container>
      </div>

      {/* CTA footer */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">Looking for referrals?</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              Before you apply anywhere, check if a Leanspacer is already there. Warm intros beat cold applications every time.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/recommendations" className="btn btn-primary">
              Get a recommendation →
            </Link>
            <Link href="/networking" className="btn">
              Networking playbooks
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
