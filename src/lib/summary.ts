export interface DayFacts {
	movesCount: number; // 이동 수 or active index
	totalSpend: number; // 지출 합계 (KRW)
	avgMood: number; // 1-10
	photosCount: number; // 사진 수
	spendTopCategory?: string;
}

export function rulesSummary(facts: DayFacts): string[] {
	const lines: string[] = [];
	if (facts.movesCount >= 3 && facts.totalSpend >= 20000) {
		const where = facts.spendTopCategory ? `${facts.spendTopCategory}에` : "어디에";
		lines.push(`오늘은 이동이 많았고 ${where} 지출이 컸어요.`);
	}
	if (facts.avgMood <= 4) {
		lines.push("컨디션이 낮았네요. 내일은 20분 휴식 목표 어때요?");
	}
	if (facts.photosCount >= 1) {
		lines.push("기억에 남는 장면도 기록했어요.");
	}
	if (lines.length === 0) {
		lines.push("오늘은 담백한 하루였어요. 가볍게 정리해볼까요?");
	}
	return lines.slice(0, 4);
}

// 점수(0–100): 0.4*mood + 0.3*active - 0.3*overspend 정규화 근사
// mood: 1-10 → 0-100; active: movesCount scaled to 0-100; overspend: penalty if totalSpend>20000
export function computeScore(facts: DayFacts): number {
	const moodScore = (facts.avgMood / 10) * 100; // 0-100
	const activeScore = Math.min(100, (facts.movesCount / 5) * 100); // assume 5+ is max
	const overspendPenalty = facts.totalSpend > 20000 ? Math.min(100, ((facts.totalSpend - 20000) / 80000) * 100) : 0; // soft scale
	let score = 0.4 * moodScore + 0.3 * activeScore - 0.3 * overspendPenalty;
	score = Math.max(0, Math.min(100, Math.round(score)));
	return score;
}
