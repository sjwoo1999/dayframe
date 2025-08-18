import * as React from "react";

export interface MovementMiniMapProps {
	points?: number[]; // sparkline values 0..100
}

export function MovementMiniMap({ points = [10, 30, 20, 35, 50, 40, 60] }: MovementMiniMapProps) {
	const path = points
		.map((v, i) => `${(i / (points.length - 1)) * 100},${40 - (v / 100) * 40}`)
		.join(" ");
	return (
		<div className="h-24 w-full rounded-[--radius-md] bg-[--ll-gray-100] dark:bg-[--ll-gray-800] overflow-hidden">
			<svg viewBox="0 0 100 40" className="h-full w-full" aria-label="이동 스파크라인">
				<polyline points={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
			</svg>
		</div>
	);
}
