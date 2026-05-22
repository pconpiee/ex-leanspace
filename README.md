# ex-leanspace

A career helper for alumni of [Leanspace](https://leanspace.io) — the Strasbourg-based NewSpace ground-segment platform. Career pathways, AI prompts, Claude skills, networking playbooks, and leadership transitions.

Unofficial. Not affiliated with Leanspace SAS. Built by an alum, for alumni.

## What's inside

- **Pathways** — eight role functions inside Leanspace (PM, Solutions Architect, BDM, Engineering, Domain Expert, Design/Marketing/PM, Ops, Exec) with skills, artefacts, next-step roles and pitfalls each.
- **Destinations** — nine sector categories where Leanspace alumni typically go, with concrete company examples and comp expectations.
- **AI Skills** — ten Claude prompts and three drop-in Claude skills (`cv-coach`, `deal-postmortem`, `mission-storyteller`).
- **Networking** — events, communities, and four step-by-step playbooks.
- **Leadership** — IC→manager, manager→director, IC→founder, IC→academic guides.
- **Org map** — public-info snapshot of who works on which team at Leanspace.
- **Resources** — curated newsletters, podcasts, books, and tools.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (no config file — `@theme` in `globals.css`)
- Static-rendered (no DB, no auth, no signup)
- Fonts: Inter, JetBrains Mono, Fraunces (Google Fonts via `next/font`)

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy

Set up on Vercel: import the repo, no env vars required. Production branch is `main`; preview branches deploy automatically.

## Editing content

All content lives in `src/lib/data/`:

- `pathways.ts` — career pathways by function
- `destinations.ts` — destination sectors
- `prompts.ts` — Claude prompts + skills
- `networking.ts` — events, communities, playbooks
- `leadership.ts` — transition guides
- `org.ts` — org map and company facts
- `resources.ts` — books, newsletters, podcasts, tools

Plain TypeScript objects. Edit, save, page rebuilds.

## Disclaimer

Roles, comp bands, deal sizes, and conferences change. Every fact has a source — verify with the company or recruiter before betting your year on it.
