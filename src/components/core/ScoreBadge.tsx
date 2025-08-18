import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface ScoreBadgeProps {
	score: number; // 0-100
	className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
	const tone = score >= 70 ? "bg-green-600" : score >= 40 ? "bg-yellow-500" : "bg-red-600";
	return (
		<span className={twMerge("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white", tone, className)} aria-label={`점수 ${score}`}>
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
				<circle cx="12" cy="12" r="10" className="opacity-30" stroke="currentColor" strokeWidth="2" />
				<path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
			{score}
		</span>
	);
}
