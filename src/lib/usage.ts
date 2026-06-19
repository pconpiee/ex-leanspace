import { getAdminSupabase } from "./supabase-server";

// Per-user lifetime AI spend cap, in USD. Bump this to raise everyone's allowance.
export const PER_USER_BUDGET_USD = 1.0;

// $ per 1,000,000 tokens (input / output). Keep in sync with model routing.
const RATES: Record<string, { in: number; out: number }> = {
  "claude-haiku-4-5": { in: 1, out: 5 },
  "claude-sonnet-4-6": { in: 3, out: 15 },
  "claude-opus-4-8": { in: 5, out: 25 },
};

type Usage = {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
} | null | undefined;

export class BudgetExceededError extends Error {
  constructor() {
    super("Per-user AI budget exceeded");
    this.name = "BudgetExceededError";
  }
}

// Convert an Anthropic usage block into USD for the given model.
// Cache writes bill at 1.25x input (5-min TTL); cache reads at 0.1x input.
export function costUsd(model: string, u: Usage): number {
  if (!u) return 0;
  const r = RATES[model] ?? RATES["claude-sonnet-4-6"];
  const input = (u.input_tokens ?? 0) * r.in;
  const cacheWrite = (u.cache_creation_input_tokens ?? 0) * r.in * 1.25;
  const cacheRead = (u.cache_read_input_tokens ?? 0) * r.in * 0.1;
  const output = (u.output_tokens ?? 0) * r.out;
  return (input + cacheWrite + cacheRead + output) / 1_000_000;
}

// Lifetime spend for a user. Fails open (returns 0) so a DB hiccup never locks
// people out of a free tool.
export async function getSpend(email: string): Promise<number> {
  try {
    const admin = getAdminSupabase();
    if (!admin) return 0;
    const { data } = await admin
      .from("user_usage")
      .select("total_cost_usd")
      .eq("user_email", email)
      .maybeSingle();
    return (data?.total_cost_usd as number) ?? 0;
  } catch {
    return 0;
  }
}

// Throw BudgetExceededError if the user is already at/over their cap.
export async function assertBudget(email: string): Promise<void> {
  const spent = await getSpend(email);
  if (spent >= PER_USER_BUDGET_USD) throw new BudgetExceededError();
}

// Record spend after a model call. Never throws — metering must not break the
// user's request.
export async function recordUsage(
  email: string,
  model: string,
  usage: Usage,
): Promise<void> {
  try {
    const cost = costUsd(model, usage);
    if (cost <= 0) return;
    const admin = getAdminSupabase();
    if (!admin) return;
    await admin.rpc("add_usage", { p_email: email, p_cost: cost });
  } catch {
    // swallow — accounting errors shouldn't surface to the user
  }
}
