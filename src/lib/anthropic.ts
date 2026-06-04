import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY ?? "";

export const anthropicConfigured = apiKey.length > 20;

let client: Anthropic | null = null;
export function getAnthropic(): Anthropic | null {
  if (!anthropicConfigured) return null;
  client ??= new Anthropic({ apiKey });
  return client;
}

// Always use Opus 4.8 (per claude-api skill guidance).
export const MODEL = "claude-opus-4-8";

// Standard adaptive-thinking config — Claude decides depth per call.
export const ADAPTIVE_THINKING = { type: "adaptive" as const };

export class ConfigMissingError extends Error {
  constructor() {
    super("ANTHROPIC_API_KEY not configured");
    this.name = "ConfigMissingError";
  }
}

export function requireAnthropic(): Anthropic {
  const c = getAnthropic();
  if (!c) throw new ConfigMissingError();
  return c;
}
