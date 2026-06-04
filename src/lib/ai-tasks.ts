import type Anthropic from "@anthropic-ai/sdk";
import {
  ADAPTIVE_THINKING,
  MODEL,
  requireAnthropic,
} from "./anthropic";
import type {
  CompanyResearch,
  FitAnalysis,
  ParsedCV,
} from "./db-types";

function textFromContent(content: Anthropic.ContentBlock[]): string {
  return content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("");
}

// ============================================================
// 1. Parse a CV from raw text into structured JSON.
// One-shot, no caching (each CV is unique).
// ============================================================

const CV_SCHEMA = {
  type: "object",
  properties: {
    headline: { type: "string" },
    summary: { type: "string" },
    experiences: {
      type: "array",
      items: {
        type: "object",
        properties: {
          company: { type: "string" },
          role: { type: "string" },
          dates: { type: "string" },
          location: { type: "string" },
          responsibilities: { type: "array", items: { type: "string" } },
          achievements: { type: "array", items: { type: "string" } },
          metrics: { type: "array", items: { type: "string" } },
        },
        required: ["company", "role"],
        additionalProperties: false,
      },
    },
    skills: { type: "array", items: { type: "string" } },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          institution: { type: "string" },
          degree: { type: "string" },
          dates: { type: "string" },
        },
        required: ["institution"],
        additionalProperties: false,
      },
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          url: { type: "string" },
        },
        required: ["label", "url"],
        additionalProperties: false,
      },
    },
  },
  required: ["headline", "summary", "experiences", "skills"],
  additionalProperties: false,
} as const;

export async function parseCV(rawText: string): Promise<ParsedCV> {
  const client = requireAnthropic();
  const trimmed = rawText.slice(0, 80_000);

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    thinking: ADAPTIVE_THINKING,
    system: [
      {
        type: "text",
        text:
          "You parse career documents — CVs, résumés, work-history narratives — " +
          "into a structured representation. Preserve the user's voice in achievements. " +
          "Always extract concrete metrics (numbers, %, $) when present. " +
          "Never invent achievements or skills the source doesn't mention.",
      },
    ],
    messages: [
      {
        role: "user",
        content:
          "Parse the following CV/résumé/job-history document into the schema. " +
          "Source:\n\n```\n" +
          trimmed +
          "\n```",
      },
    ],
    output_config: {
      format: { type: "json_schema", schema: CV_SCHEMA },
    },
  });

  const text = textFromContent(resp.content);
  try {
    return JSON.parse(text) as ParsedCV;
  } catch (e) {
    throw new Error(
      `Failed to parse CV: model returned non-JSON. ${
        e instanceof Error ? e.message : ""
      }`,
    );
  }
}

// ============================================================
// 2. Extract job metadata (title, company, location) from a raw posting blob.
// ============================================================

const JOB_META_SCHEMA = {
  type: "object",
  properties: {
    job_title: { type: "string" },
    company: { type: "string" },
    location: { type: "string" },
  },
  required: ["job_title", "company"],
  additionalProperties: false,
} as const;

export type JobMeta = {
  job_title: string;
  company: string;
  location?: string;
};

export async function extractJobMeta(blob: string): Promise<JobMeta> {
  const client = requireAnthropic();
  const trimmed = blob.slice(0, 30_000);

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system:
      "You extract job-posting metadata. If a field is genuinely unclear, " +
      "use 'Unknown' rather than guessing.",
    messages: [
      {
        role: "user",
        content:
          "Extract job_title, company, and location from this posting:\n\n```\n" +
          trimmed +
          "\n```",
      },
    ],
    output_config: {
      format: { type: "json_schema", schema: JOB_META_SCHEMA },
    },
  });

  const text = textFromContent(resp.content);
  return JSON.parse(text) as JobMeta;
}

// ============================================================
// 3. Fit analysis — given CV + job description, score and explain the gap.
// Uses prompt caching: CV and job description are the cacheable prefix.
// ============================================================

const FIT_SCHEMA = {
  type: "object",
  properties: {
    fit_score: { type: "integer" },
    headline: { type: "string" },
    strengths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          quote_from_cv: { type: "string" },
          why_relevant: { type: "string" },
        },
        required: ["quote_from_cv", "why_relevant"],
        additionalProperties: false,
      },
    },
    gaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          job_requirement: { type: "string" },
          where_im_weak: { type: "string" },
          how_to_close: { type: "string" },
        },
        required: ["job_requirement", "where_im_weak", "how_to_close"],
        additionalProperties: false,
      },
    },
    suggested_resume_edits: { type: "array", items: { type: "string" } },
    cover_letter_outline: { type: "array", items: { type: "string" } },
    questions_for_improve_fit: { type: "array", items: { type: "string" } },
  },
  required: [
    "fit_score",
    "headline",
    "strengths",
    "gaps",
    "suggested_resume_edits",
    "cover_letter_outline",
    "questions_for_improve_fit",
  ],
  additionalProperties: false,
} as const;

export async function analyzeFit(args: {
  cv: ParsedCV;
  rawCvText: string;
  jobDescription: string;
}): Promise<FitAnalysis> {
  const client = requireAnthropic();

  const cvBlock =
    "<candidate_cv>\n" +
    JSON.stringify(args.cv, null, 2) +
    "\n\n<original_text>\n" +
    args.rawCvText.slice(0, 60_000) +
    "\n</original_text>\n</candidate_cv>";

  const jobBlock =
    "<job_posting>\n" + args.jobDescription.slice(0, 30_000) + "\n</job_posting>";

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    thinking: ADAPTIVE_THINKING,
    system: [
      {
        type: "text",
        text:
          "You are an experienced hiring manager turned career coach. " +
          "You assess fit between a candidate and a job, then advise on how to close the gap. " +
          "Be honest about weaknesses — sugar-coating doesn't help the candidate. " +
          "Cite the candidate's CV verbatim when calling out strengths. " +
          "When suggesting resume edits, write concrete bullet drafts using " +
          "their own experiences — never invent achievements. " +
          "questions_for_improve_fit should be 3-5 questions designed to surface " +
          "unstated abilities, side projects, or quantifiable outcomes that aren't on the CV.",
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: cvBlock, cache_control: { type: "ephemeral" } },
          { type: "text", text: jobBlock, cache_control: { type: "ephemeral" } },
          {
            type: "text",
            text:
              "Produce a fit analysis. fit_score is 0-100 where:\n" +
              "  90-100 = exceptional match, candidate is over-qualified or perfectly aligned\n" +
              "  70-89  = strong match, minor gaps\n" +
              "  50-69  = partial match, real gaps to address\n" +
              "  30-49  = stretch, multiple significant gaps\n" +
              "  0-29   = poor match\n" +
              "Headline is one sentence summarizing the verdict.",
          },
        ],
      },
    ],
    output_config: {
      format: { type: "json_schema", schema: FIT_SCHEMA },
    },
  });

  const text = textFromContent(resp.content);
  return JSON.parse(text) as FitAnalysis;
}

// ============================================================
// 4. Company research — uses web search and web fetch.
// ============================================================

const RESEARCH_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    mission: { type: "string" },
    recent_news: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          detail: { type: "string" },
        },
        required: ["title", "detail"],
        additionalProperties: false,
      },
    },
    culture_signals: { type: "array", items: { type: "string" } },
    what_to_emphasize: { type: "array", items: { type: "string" } },
    sources: { type: "array", items: { type: "string" } },
  },
  required: [
    "summary",
    "mission",
    "recent_news",
    "culture_signals",
    "what_to_emphasize",
    "sources",
  ],
  additionalProperties: false,
} as const;

export async function researchCompany(args: {
  company: string;
  jobTitle: string;
  jobDescription: string;
}): Promise<CompanyResearch> {
  const client = requireAnthropic();

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    thinking: ADAPTIVE_THINKING,
    tools: [
      { type: "web_search_20260209", name: "web_search" },
      { type: "web_fetch_20260209", name: "web_fetch" },
    ],
    system:
      "You research companies to help job candidates tailor their applications. " +
      "Use web search and web fetch to gather current information. " +
      "Focus on: what the company does, recent funding/news (last 12 months), " +
      "culture and values, and what a candidate for the given role should emphasize. " +
      "Cite source URLs.",
    messages: [
      {
        role: "user",
        content:
          `Research ${args.company} for a candidate applying to ${args.jobTitle}.\n\n` +
          `Job posting excerpt:\n${args.jobDescription.slice(0, 4000)}\n\n` +
          "Return a structured research brief.",
      },
    ],
    output_config: {
      format: { type: "json_schema", schema: RESEARCH_SCHEMA },
    },
  });

  // When using server-side tools, the model loops; pause_turn means we need
  // to send the assistant turn back. For typical research it completes in
  // one pass. Handle pause_turn once defensively.
  let final = resp;
  if (final.stop_reason === "pause_turn") {
    final = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: ADAPTIVE_THINKING,
      tools: [
        { type: "web_search_20260209", name: "web_search" },
        { type: "web_fetch_20260209", name: "web_fetch" },
      ],
      system:
        "You research companies to help job candidates tailor their applications.",
      messages: [
        {
          role: "user",
          content: `Research ${args.company} for ${args.jobTitle}.`,
        },
        { role: "assistant", content: final.content },
      ],
      output_config: {
        format: { type: "json_schema", schema: RESEARCH_SCHEMA },
      },
    });
  }

  return JSON.parse(textFromContent(final.content)) as CompanyResearch;
}

// ============================================================
// 5. Improve-fit chat — non-streaming, ONE question per turn.
// CV + job description cached as prefix.
// ============================================================

export type ChatTurn = { role: "user" | "assistant"; content: string };

export async function improveFitTurn(args: {
  cv: ParsedCV;
  rawCvText: string;
  jobDescription: string;
  fitAnalysis: import("./db-types").FitAnalysis | null;
  history: ChatTurn[];
}): Promise<string> {
  const client = requireAnthropic();

  const cvBlock =
    "<candidate_cv>\n" +
    JSON.stringify(args.cv, null, 2) +
    "\n\n<original_text>\n" +
    args.rawCvText.slice(0, 60_000) +
    "\n</original_text>\n</candidate_cv>";

  const jobBlock =
    "<job_posting>\n" + args.jobDescription.slice(0, 30_000) + "\n</job_posting>";

  const fitBlock = args.fitAnalysis
    ? "<prior_fit_analysis>\n" +
      JSON.stringify(args.fitAnalysis, null, 2) +
      "\n</prior_fit_analysis>"
    : "";

  // Use a stable preface (cached) + the live conversation.
  const systemBlocks: { type: "text"; text: string; cache_control?: { type: "ephemeral" } }[] = [
    {
      type: "text",
      text:
        "You are CV Coach. You're helping a candidate improve their fit for a specific job " +
        "by surfacing experiences, projects, or metrics they didn't put on their CV. " +
        "Behavior rules:\n" +
        "- Ask ONE focused, specific question per turn. Never bundle multiple questions.\n" +
        "- Build on the prior fit analysis: target the gaps it identified.\n" +
        "- When the candidate gives you something concrete, draft a one-line CV bullet " +
        "  using their words and propose where it fits.\n" +
        "- After ~5 turns, offer to summarise the new bullets they should add.\n" +
        "- Never invent. If they don't have an answer, move on to a different angle.",
      cache_control: { type: "ephemeral" },
    },
    { type: "text", text: cvBlock, cache_control: { type: "ephemeral" } },
    { type: "text", text: jobBlock, cache_control: { type: "ephemeral" } },
  ];
  if (fitBlock) systemBlocks.push({ type: "text", text: fitBlock });

  const messages = args.history.map((t) => ({
    role: t.role,
    content: t.content,
  }));

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    thinking: ADAPTIVE_THINKING,
    system: systemBlocks,
    messages,
  });

  return textFromContent(resp.content);
}
