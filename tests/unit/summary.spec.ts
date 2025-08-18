import { describe, it, expect } from "vitest";
import { rulesSummary, computeScore } from "@/lib/summary";

describe("rulesSummary", () => {
	it("handles movement + overspend", () => {
		const lines = rulesSummary({ movesCount: 3, totalSpend: 30000, avgMood: 7, photosCount: 0, spendTopCategory: "카페" });
		expect(lines[0]).toContain("이동이 많았고 카페에 지출이 컸어요");
	});
	it("handles low mood", () => {
		const lines = rulesSummary({ movesCount: 0, totalSpend: 0, avgMood: 3, photosCount: 0 });
		expect(lines.some((l) => l.includes("컨디션이 낮았네요"))).toBe(true);
	});
	it("default line when no conditions", () => {
		const lines = rulesSummary({ movesCount: 0, totalSpend: 0, avgMood: 7, photosCount: 0 });
		expect(lines[0]).toContain("담백한 하루");
	});
});

describe("computeScore", () => {
	it("scales mood and activity, penalizes overspend", () => {
		const s1 = computeScore({ movesCount: 4, totalSpend: 10000, avgMood: 8, photosCount: 0 });
		const s2 = computeScore({ movesCount: 4, totalSpend: 90000, avgMood: 8, photosCount: 0 });
		expect(s1).toBeGreaterThan(s2);
		expect(s1).toBeGreaterThan(0);
		expect(s2).toBeGreaterThan(0);
	});
});
