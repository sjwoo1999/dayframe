import { NextRequest } from "next/server";
import { z } from "zod";
import { rulesSummary, computeScore, type DayFacts } from "@/lib/summary";
import { maybePolishSummary } from "@/lib/llm";
import { env } from "@/lib/env";

export const runtime = "edge";

const QuerySchema = z.object({
	moves: z.coerce.number().min(0).max(100).default(0),
	spend: z.coerce.number().min(0).default(0),
	mood: z.coerce.number().min(1).max(10).default(6),
	photos: z.coerce.number().min(0).max(1000).default(0),
	cat: z.string().trim().max(64).optional(),
});

const RATE_LIMIT_WINDOW_MS = 10_000;
const RATE_LIMIT_MAX = 20;
const RATE_STATE = new Map<string, { count: number; ts: number }>();

function rateLimit(ip: string): boolean {
	const now = Date.now();
	const prev = RATE_STATE.get(ip);
	if (!prev || now - prev.ts > RATE_LIMIT_WINDOW_MS) {
		RATE_STATE.set(ip, { count: 1, ts: now });
		return true;
	}
	if (prev.count >= RATE_LIMIT_MAX) return false;
	prev.count += 1;
	return true;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ date: string }> }) {
	const { date } = await params;
	const url = new URL(req.url);

	// simple IP key for edge (best-effort)
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	if (!rateLimit(ip)) {
		return new Response(JSON.stringify({ error: "rate_limited" }), { status: 429 });
	}

	const parsed = QuerySchema.safeParse(Object.fromEntries(url.searchParams.entries()));
	if (!parsed.success) {
		return new Response(JSON.stringify({ error: "bad_request", issues: parsed.error.issues }), { status: 400 });
	}
	const { moves, spend, mood, photos, cat } = parsed.data;

	const facts: DayFacts = { movesCount: moves, totalSpend: spend, avgMood: mood, photosCount: photos, spendTopCategory: cat };
	const ruleLines = rulesSummary(facts);
	const score = computeScore(facts);
	const lines = await maybePolishSummary(ruleLines, { apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL, timeoutMs: 2000 });

	return new Response(JSON.stringify({ date, score, lines }), {
		status: 200,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
