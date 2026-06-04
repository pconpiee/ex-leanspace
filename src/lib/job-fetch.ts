import * as cheerio from "cheerio";

export type JobFetchResult = {
  ok: boolean;
  text: string;
  title?: string;
  // Reason a job-board URL was rejected, e.g. "linkedin-anti-bot".
  fallbackReason?: string;
  source: "url" | "paste";
};

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 " +
    "(KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

// LinkedIn aggressively blocks server-side fetches.  Detect early so the UI
// can prompt the user to paste the job text directly.
function isLikelyBlocked(url: string, html: string): boolean {
  const lower = url.toLowerCase();
  if (lower.includes("linkedin.com/jobs")) return true;
  if (html.includes("authwall") || html.includes("Sign in to LinkedIn")) {
    return true;
  }
  if (html.length < 2000 && /captcha|access denied|forbidden/i.test(html)) {
    return true;
  }
  return false;
}

export async function fetchJobFromURL(url: string): Promise<JobFetchResult> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return {
      ok: false,
      text: "",
      source: "url",
      fallbackReason: "invalid-url",
    };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      ok: false,
      text: "",
      source: "url",
      fallbackReason: "invalid-protocol",
    };
  }

  let html = "";
  try {
    const resp = await fetch(parsed.toString(), {
      headers: HEADERS,
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    if (!resp.ok) {
      return {
        ok: false,
        text: "",
        source: "url",
        fallbackReason: `http-${resp.status}`,
      };
    }
    html = await resp.text();
  } catch (e) {
    return {
      ok: false,
      text: "",
      source: "url",
      fallbackReason: e instanceof Error ? e.message : "fetch-failed",
    };
  }

  if (isLikelyBlocked(parsed.toString(), html)) {
    return {
      ok: false,
      text: "",
      source: "url",
      fallbackReason: "blocked-or-walled",
    };
  }

  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, noscript, svg, iframe").remove();
  const title = $("title").text().trim() || $("h1").first().text().trim();
  const body = ($("main").text() || $("article").text() || $("body").text())
    .replace(/\s+/g, " ")
    .trim();

  if (body.length < 400) {
    return {
      ok: false,
      text: body,
      title,
      source: "url",
      fallbackReason: "too-short",
    };
  }

  return { ok: true, text: body, title, source: "url" };
}
