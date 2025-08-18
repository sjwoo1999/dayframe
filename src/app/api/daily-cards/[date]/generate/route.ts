import { NextRequest } from "next/server";
import { rulesSummary, computeScore, type DayFacts } from "@/lib/summary";
import { maybePolishSummary } from "@/lib/llm";

export const runtime = "edge";

export async function GET(req: NextRequest, { params }: { params: Promise<{ date: string }> }) {
	const { date } = await params;
	const url = new URL(req.url);
	// In V1, we accept facts via query for mock; later compute from DB
	const movesCount = Number(url.searchParams.get("moves") ?? 0);
	const totalSpend = Number(url.searchParams.get("spend") ?? 0);
	const avgMood = Number(url.searchParams.get("mood") ?? 6);
	const photosCount = Number(url.searchParams.get("photos") ?? 0);
	const spendTopCategory = url.searchParams.get("cat") ?? undefined;

	const facts: DayFacts = { movesCount, totalSpend, avgMood, photosCount, spendTopCategory };
	const ruleLines = rulesSummary(facts);
	const score = computeScore(facts);
	const apiKey = process.env.OPENAI_API_KEY;
	const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
	const lines = await maybePolishSummary(ruleLines, { apiKey, model, timeoutMs: 2000 });

	return new Response(JSON.stringify({ date, score, lines }), {
		status: 200,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
