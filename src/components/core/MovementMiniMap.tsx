import * as React from "react";

export interface MovementMiniMapProps {
	points?: Array<{ lat: number; lng: number }>;
}

export function MovementMiniMap({ points = [] }: MovementMiniMapProps) {
	// Stub: simple SVG polyline representation; later replace with map lib.
	return (
		<div className="h-24 w-full rounded-[--radius-md] bg-[--ll-gray-100] dark:bg-[--ll-gray-800] overflow-hidden">
			<svg viewBox="0 0 100 40" className="h-full w-full" aria-label="이동 경로 미니맵">
				<polyline points="10,30 30,20 50,25 70,10 90,15" fill="none" stroke="currentColor" strokeWidth="2" className="text-[--ll-gray-500]" />
			</svg>
		</div>
	);
}
