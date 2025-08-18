import * as React from "react";
import { clamp } from "@/utils/a11y";

export interface MoodBarProps {
	value: number; // 1-10
}

export function MoodBar({ value }: MoodBarProps) {
	const v = clamp(value, 1, 10);
	const pct = (v / 10) * 100;
	return (
		<div className="h-2 w-full rounded-full bg-[--ll-gray-200]" role="slider" aria-valuemin={1} aria-valuemax={10} aria-valuenow={v} aria-label="오늘의 기분">
			<div className="h-full rounded-full bg-[--color-primary-700]" style={{ width: `${pct}%` }} />
		</div>
	);
}
