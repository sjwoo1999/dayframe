import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface SummaryBlockProps {
	title?: string;
	lines: string[]; // 1-4 short lines
	className?: string;
}

export function SummaryBlock({ title = "오늘의 요약", lines, className }: SummaryBlockProps) {
	return (
		<div className={twMerge("space-y-2", className)}>
			<div className="text-[var(--text-sm)] font-semibold text-[--ll-gray-700]">{title}</div>
			<div className="space-y-2 text-[var(--text-md)] leading-6 max-w-[38ch]">
				{lines.map((l, i) => (
					<p key={i} className="text-[--color-foreground] line-clamp-3">{l}</p>
				))}
			</div>
		</div>
	);
}
