"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Container, PageHeader, Section } from "@/components/section";
import {
  alumni as staticAlumni,
  clusters,
  domainOrder,
  type AlumniStatus,
  type LeanspaceDomain,
} from "@/lib/data/alumni";
import { supabase, supabaseConfigured, type DB_Alumnus } from "@/lib/supabase";

// ── Display type (merges static + DB shapes) ──────────────────────────────────
type DisplayPerson = {
  id?: string;
  name: string;
  linkedIn?: string;
  leanspaceRole: string;
  domain: LeanspaceDomain;
  tenure: string;
  currentRole?: string;
  currentCompany?: string;
  sector?: string;
  location?: string;
  status: AlumniStatus;
  claimedBy?: string;
  fromDB: boolean;
};

function fromStatic(a: (typeof staticAlumni)[0]): DisplayPerson {
  return { ...a, linkedIn: a.linkedIn ?? undefined, fromDB: false };
}

function fromDB(r: DB_Alumnus): DisplayPerson {
  return {
    id: r.id,
    name: r.name,
    linkedIn: r.linkedin ?? undefined,
    leanspaceRole: r.leanspace_role,
    domain: r.domain as LeanspaceDomain,
    tenure: r.tenure ?? "",
    currentRole: r.current_role ?? undefined,
    currentCompany: r.current_company ?? undefined,
    sector: r.sector ?? undefined,
    location: r.location ?? undefined,
    status: r.status,
    claimedBy: r.claimed_by ?? undefined,
    fromDB: true,
  };
}

// ── Status labels + styles ────────────────────────────────────────────────────
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

// ── Edit form state type ──────────────────────────────────────────────────────
type FormState = {
  name: string;
  linkedIn: string;
  leanspaceRole: string;
  domain: LeanspaceDomain;
  tenure: string;
  currentRole: string;
  currentCompany: string;
  sector: string;
  location: string;
  status: AlumniStatus;
};

const emptyForm: FormState = {
  name: "",
  linkedIn: "",
  leanspaceRole: "",
  domain: "Product",
  tenure: "",
  currentRole: "",
  currentCompany: "",
  sector: "",
  location: "",
  status: "unknown",
};

function personToForm(p: DisplayPerson): FormState {
  return {
    name: p.name,
    linkedIn: p.linkedIn ?? "",
    leanspaceRole: p.leanspaceRole,
    domain: p.domain,
    tenure: p.tenure,
    currentRole: p.currentRole ?? "",
    currentCompany: p.currentCompany ?? "",
    sector: p.sector ?? "",
    location: p.location ?? "",
    status: p.status,
  };
}

// ── Modal ─────────────────────────────────────────────────────────────────────
type ModalMode = "add" | "edit" | "claim";

function AlumniModal({
  mode,
  subject,
  user,
  onClose,
  onSuccess,
}: {
  mode: ModalMode;
  subject?: DisplayPerson;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<FormState>(
    subject ? personToForm(subject) : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const isEdit = mode === "edit";
  const isClaim = mode === "claim";
  const isAdd = mode === "add";

  function field(k: keyof FormState, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      linkedin: form.linkedIn.trim() || null,
      leanspace_role: form.leanspaceRole.trim(),
      domain: form.domain,
      tenure: form.tenure.trim() || null,
      current_role: form.currentRole.trim() || null,
      current_company: form.currentCompany.trim() || null,
      sector: form.sector.trim() || null,
      location: form.location.trim() || null,
      status: form.status,
    };

    let err = null;

    if (isAdd) {
      ({ error: err } = await supabase.from("alumni").insert({
        ...payload,
        added_by: user.email,
        approved: false,
      }));
    } else if (isClaim && subject?.id) {
      ({ error: err } = await supabase
        .from("alumni")
        .update({ ...payload, claimed_by: user.email })
        .eq("id", subject.id));
    } else if (isEdit && subject?.id) {
      ({ error: err } = await supabase
        .from("alumni")
        .update(payload)
        .eq("id", subject.id));
    }

    setSaving(false);
    if (err) {
      setError(err.message);
    } else {
      onSuccess();
    }
  }

  async function handleRemove() {
    if (!supabase || !subject?.id) return;
    setRemoving(true);
    const { error: err } = await supabase
      .from("alumni")
      .update({ removed: true })
      .eq("id", subject.id);
    setRemoving(false);
    if (err) {
      setError(err.message);
    } else {
      onSuccess();
    }
  }

  const titleMap: Record<ModalMode, string> = {
    add: "Add a person",
    edit: "Edit your profile",
    claim: `Claim "${subject?.name}"`,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="panel w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
        style={{ background: "var(--bg)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[color:var(--fg-mute)] hover:text-[color:var(--fg)] text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="font-display text-lg font-semibold mb-1">
          {titleMap[mode]}
        </h2>
        {isClaim && (
          <p className="text-xs text-[color:var(--fg-mute)] mb-4">
            Only claim this profile if you are this person.
          </p>
        )}
        {isAdd && (
          <p className="text-xs text-[color:var(--fg-mute)] mb-4">
            Additions by others are reviewed before going live.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => field("name", e.target.value)}
                className="input"
                placeholder="Full name"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">LinkedIn URL</span>
              <input
                value={form.linkedIn}
                onChange={(e) => field("linkedIn", e.target.value)}
                className="input"
                placeholder="https://linkedin.com/in/…"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Role at Leanspace *</span>
              <input
                required
                value={form.leanspaceRole}
                onChange={(e) => field("leanspaceRole", e.target.value)}
                className="input"
                placeholder="PM — Mission Control"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Domain *</span>
              <select
                value={form.domain}
                onChange={(e) => field("domain", e.target.value as LeanspaceDomain)}
                className="input"
              >
                {domainOrder.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Tenure</span>
              <input
                value={form.tenure}
                onChange={(e) => field("tenure", e.target.value)}
                className="input"
                placeholder="Jan 2022 – Dec 2024"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Status *</span>
              <select
                value={form.status}
                onChange={(e) => field("status", e.target.value as AlumniStatus)}
                className="input"
              >
                <option value="employed">Landed (employed)</option>
                <option value="freelance">Freelance</option>
                <option value="searching">Open to roles</option>
                <option value="unknown">Not listed</option>
              </select>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Current role</span>
              <input
                value={form.currentRole}
                onChange={(e) => field("currentRole", e.target.value)}
                className="input"
                placeholder="Senior PM"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Current company</span>
              <input
                value={form.currentCompany}
                onChange={(e) => field("currentCompany", e.target.value)}
                className="input"
                placeholder="Company name"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Sector</span>
              <input
                value={form.sector}
                onChange={(e) => field("sector", e.target.value)}
                className="input"
                placeholder="NewSpace / SaaS / …"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="kicker text-xs">Location</span>
              <input
                value={form.location}
                onChange={(e) => field("location", e.target.value)}
                className="input"
                placeholder="Paris, France"
              />
            </label>
          </div>

          {error && (
            <p className="text-xs text-[color:var(--warn)]">{error}</p>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            {isEdit && subject?.claimedBy === user.email && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={removing}
                className="text-xs text-[color:var(--warn)] hover:underline"
              >
                {removing ? "Removing…" : "Remove me from directory"}
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button type="button" onClick={onClose} className="btn text-xs px-3 py-1.5">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary text-xs px-3 py-1.5"
              >
                {saving ? "Saving…" : isAdd ? "Submit" : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Auth panel ────────────────────────────────────────────────────────────────
function AuthPanel({
  user,
  onUserChange,
}: {
  user: User | null;
  onUserChange: (u: User | null) => void;
}) {
  const [step, setStep] = useState<"idle" | "typing" | "sent">("idle");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function sendLink() {
    if (!supabase || !email.trim()) return;
    setSending(true);
    setErr("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/directory`
            : "https://ex-leanspace.vercel.app/directory",
      },
    });
    setSending(false);
    if (error) {
      setErr(error.message);
    } else {
      setStep("sent");
    }
  }

  async function signOut() {
    await supabase?.auth.signOut();
    onUserChange(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-xs text-[color:var(--fg-mute)]">
        <span>
          Signed in as <span className="text-[color:var(--fg)]">{user.email}</span>
        </span>
        <button onClick={signOut} className="hover:text-[color:var(--warn)] underline">
          Sign out
        </button>
      </div>
    );
  }

  if (step === "sent") {
    return (
      <p className="text-xs text-[color:var(--good)]">
        Magic link sent — check your email and click the link to sign in.
      </p>
    );
  }

  if (step === "typing") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendLink()}
          placeholder="your@email.com"
          className="input text-xs py-1.5 px-2 w-52"
        />
        <button
          onClick={sendLink}
          disabled={sending}
          className="btn btn-primary text-xs px-3 py-1.5"
        >
          {sending ? "Sending…" : "Send magic link"}
        </button>
        <button
          onClick={() => setStep("idle")}
          className="text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--fg)]"
        >
          Cancel
        </button>
        {err && <p className="text-xs text-[color:var(--warn)] w-full">{err}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setStep("typing")}
      className="text-xs text-[color:var(--accent)] hover:underline"
    >
      Sign in to edit your profile →
    </button>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function AlumnusCard({
  person,
  user,
  onEdit,
  onClaim,
}: {
  person: DisplayPerson;
  user: User | null;
  onEdit: (p: DisplayPerson) => void;
  onClaim: (p: DisplayPerson) => void;
}) {
  const hasLanded = person.currentRole || person.currentCompany;
  const isOwner = user && person.claimedBy === user.email;
  const isUnclaimed = !person.claimedBy && person.fromDB;

  return (
    <div className="panel p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium text-[color:var(--fg)]">{person.name}</div>
          <div className="text-xs text-[color:var(--fg-mute)] mt-0.5 mono">{person.tenure}</div>
        </div>
        <span className={statusClass[person.status]}>{statusLabel[person.status]}</span>
      </div>

      <div>
        <div className="text-xs kicker mb-1">At Leanspace</div>
        <div className="text-sm text-[color:var(--fg-soft)]">{person.leanspaceRole}</div>
      </div>

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

      <div className="mt-auto pt-2 border-t hairline flex items-center justify-between gap-2">
        <span className="text-xs text-[color:var(--fg-mute)]">
          {person.location ?? "—"}
        </span>
        <div className="flex items-center gap-3">
          {isOwner && (
            <button
              onClick={() => onEdit(person)}
              className="mono text-xs text-[color:var(--blue)] hover:underline"
            >
              Edit ✎
            </button>
          )}
          {!isOwner && isUnclaimed && user && (
            <button
              onClick={() => onClaim(person)}
              className="mono text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--accent)] hover:underline"
            >
              This is me
            </button>
          )}
          {person.linkedIn ? (
            <a
              href={person.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs text-[color:var(--accent)] hover:underline"
            >
              LinkedIn ↗
            </a>
          ) : (
            <span className="text-xs text-[color:var(--fg-mute)]">No profile</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Cluster card ──────────────────────────────────────────────────────────────
function ClusterCard({ cluster }: { cluster: (typeof clusters)[number] }) {
  return (
    <div className="panel p-5 border-l-2 border-[color:var(--accent-soft)]">
      <div className="text-sm font-medium text-[color:var(--accent)]">{cluster.label}</div>
      <div className="text-xs text-[color:var(--fg-soft)] mt-1">{cluster.note}</div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {cluster.members.map((m) => (
          <span key={m} className="tag tag-mute text-xs">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Filter button ─────────────────────────────────────────────────────────────
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
      className={`flex-none px-3 py-1.5 rounded-md text-sm transition flex items-center gap-1.5 ${
        active
          ? "bg-[color:var(--accent)] text-[color:var(--bg)] font-medium"
          : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)] hover:bg-[color:var(--panel)]"
      }`}
    >
      {label}
      <span className={`mono text-xs ${active ? "opacity-70" : "text-[color:var(--fg-mute)]"}`}>
        {count}
      </span>
    </button>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ people }: { people: DisplayPerson[] }) {
  const employed = people.filter((a) => a.status === "employed").length;
  const freelance = people.filter((a) => a.status === "freelance").length;
  const searching = people.filter((a) => a.status === "searching").length;

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div>
        <span className="mono text-3xl font-bold text-[color:var(--fg)]">{people.length}</span>
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
  const [people, setPeople] = useState<DisplayPerson[]>(staticAlumni.map(fromStatic));
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<"static" | "live">("static");
  const [user, setUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<LeanspaceDomain | "All">("All");
  const [modal, setModal] = useState<{ mode: ModalMode; subject?: DisplayPerson } | null>(null);

  const fetchAlumni = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("alumni")
      .select("*")
      .eq("approved", true)
      .eq("removed", false)
      .order("created_at", { ascending: true });
    setLoading(false);
    if (!error && data && data.length > 0) {
      setPeople((data as DB_Alumnus[]).map(fromDB));
      setDataSource("live");
    }
  };

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchAlumni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleModalSuccess() {
    setModal(null);
    fetchAlumni();
  }

  const filterOptions: Array<{ label: string; value: LeanspaceDomain | "All" }> = [
    { label: "All", value: "All" },
    ...domainOrder.map((d) => ({ label: d, value: d })),
  ];

  const filtered =
    activeFilter === "All" ? people : people.filter((p) => p.domain === activeFilter);

  return (
    <>
      <PageHeader
        kicker="Alumni directory"
        title="Who we are now"
        lede={`Where ${people.length} (known) Leanspacers landed after the ride. A living record of the people who built something real together.`}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="kicker mb-4">At a glance</div>
            <StatsBar people={people} />
          </div>
          <div>
            <div className="kicker mb-4">Notable clusters</div>
            <div className="space-y-3">
              {clusters.map((c) => (
                <ClusterCard key={c.label} cluster={c} />
              ))}
            </div>
          </div>
        </div>

        <div className="neu p-5 md:p-6 mt-8">
          <div className="kicker mb-2">contribute</div>
          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
            In the list and want to update your profile? Know someone missing? Sign in with your
            email — no password needed.
          </p>
          <div className="mb-4">
            <AuthPanel user={user} onUserChange={setUser} />
          </div>
          <div className="flex flex-wrap gap-2">
            {supabaseConfigured ? (
              <>
                <button
                  onClick={() => { if (!user) return; setModal({ mode: "add" }); }}
                  disabled={!user}
                  title={!user ? "Sign in to add a person" : undefined}
                  className="btn text-xs px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + Add a person
                </button>
                {loading && (
                  <span className="text-xs text-[color:var(--fg-mute)] self-center ml-2">
                    Syncing…
                  </span>
                )}
                {dataSource === "live" && !loading && (
                  <span className="text-xs text-[color:var(--good)] self-center ml-2">
                    ● Live
                  </span>
                )}
              </>
            ) : (
              <>
                <a
                  href="mailto:hello@ex-leanspace.vercel.app?subject=New%20alumni%20suggestion&body=Name%3A%0ALinkedIn%3A%0ARole%20at%20Leanspace%3A%0ATenure%3A%0ACurrently%3A%0A"
                  className="btn text-xs px-3 py-1.5"
                >
                  + Add a person
                </a>
                <a
                  href="mailto:hello@ex-leanspace.vercel.app?subject=Job%20opening&body=Company%3A%0ARole%3A%0ALink%3A%0AWhy%20relevant%3A%0A"
                  className="btn text-xs px-3 py-1.5"
                >
                  + Post a job
                </a>
                <a
                  href="mailto:hello@ex-leanspace.vercel.app?subject=General%20contribution"
                  className="btn text-xs px-3 py-1.5"
                >
                  + Something else
                </a>
              </>
            )}
          </div>
          <p className="text-xs text-[color:var(--fg-mute)] mt-3">
            Data sourced from LinkedIn. All additions reviewed before going live.
          </p>
        </div>
      </Section>

      <div className="border-t hairline">
        <Container className="py-8 md:py-10">
          <div className="-mx-5 px-5 overflow-x-auto pb-1 mb-8">
            <div className="flex gap-1.5 w-max">
              {filterOptions.map((opt) => (
                <FilterBtn
                  key={opt.value}
                  label={opt.label}
                  active={activeFilter === opt.value}
                  count={
                    opt.value === "All"
                      ? people.length
                      : people.filter((p) => p.domain === opt.value).length
                  }
                  onClick={() => setActiveFilter(opt.value)}
                />
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((person) => (
              <AlumnusCard
                key={person.id ?? person.name}
                person={person}
                user={user}
                onEdit={(p) => setModal({ mode: "edit", subject: p })}
                onClaim={(p) => setModal({ mode: "claim", subject: p })}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-[color:var(--fg-mute)] text-sm">
              No alumni found for this filter.
            </p>
          )}
        </Container>
      </div>

      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">Looking for referrals?</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              Before you apply anywhere, check if a Leanspacer is already there. Warm intros beat
              cold applications every time.
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

      {modal && user && (
        <AlumniModal
          mode={modal.mode}
          subject={modal.subject}
          user={user}
          onClose={() => setModal(null)}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
