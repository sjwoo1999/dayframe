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
			<div className="text-[11px] font-semibold uppercase tracking-wider text-[--ll-gray-500]">{title}</div>
			<div className="space-y-1 text-[13px] leading-5">
				{lines.map((l, i) => (
					<p key={i} className="text-[--ll-gray-800] dark:text-[--ll-gray-200]">{l}</p>
				))}
			</div>
		</div>
	);
}
