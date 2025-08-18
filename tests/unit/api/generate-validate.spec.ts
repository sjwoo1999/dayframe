import { describe, it, expect } from "vitest";
import { z } from "zod";

const QuerySchema = z.object({
	moves: z.coerce.number().min(0).max(100).default(0),
	spend: z.coerce.number().min(0).default(0),
	mood: z.coerce.number().min(1).max(10).default(6),
	photos: z.coerce.number().min(0).max(1000).default(0),
	cat: z.string().trim().max(64).optional(),
});

describe("generate API input validation", () => {
	it("accepts defaults", () => {
		const res = QuerySchema.parse({});
		expect(res.moves).toBe(0);
		expect(res.mood).toBe(6);
	});
	it("rejects invalid mood", () => {
		expect(() => QuerySchema.parse({ mood: 0 })).toThrow();
	});
	it("coerces numbers", () => {
		const res = QuerySchema.parse({ moves: "5", spend: "20000" });
		expect(res.moves).toBe(5);
		expect(res.spend).toBe(20000);
	});
});
