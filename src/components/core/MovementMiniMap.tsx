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
				<defs>
					<linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.7" />
						<stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.4" />
					</linearGradient>
				</defs>
				<polyline points={path} fill="none" stroke="url(#spark)" strokeWidth="1.75" />
			</svg>
		</div>
	);
}
