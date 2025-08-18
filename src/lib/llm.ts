export interface LLMOptions {
	apiKey?: string;
	model?: string;
	timeoutMs?: number;
}

export async function maybePolishSummary(lines: string[], opts: LLMOptions): Promise<string[]> {
	if (!opts.apiKey) return lines;
	// Minimal client-side call placeholder: in real use, call OpenAI API.
	// To keep V1 secure and optional, we simply truncate/join w/ minor polish.
	const text = lines.join(" ").slice(0, 120);
	// Simulate 
	return [text];
}
