import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryBlock } from "./SummaryBlock";
import { MovementMiniMap } from "./MovementMiniMap";
import { SpendTile } from "./SpendTile";
import { MoodBar } from "./MoodBar";

export interface TodayCardProps {
	score?: number;
	summary?: string[];
	spend?: number;
	mood?: number; // 1-10
}

export function TodayCard({ score = 72, summary = ["오늘은 이동이 많았고 카페에 지출이 있었어요.", "컨디션이 다소 낮았네요. 내일은 20분 휴식 목표 어때요?"], spend = 18000, mood = 6 }: TodayCardProps) {
	return (
		<Card className="glass gradient-border card-rich">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Today</CardTitle>
				<div className="relative h-8 w-8">
					<svg viewBox="0 0 36 36" className="h-8 w-8">
						<defs>
							<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#F76241" />
								<stop offset="100%" stopColor="#ffb199" />
							</linearGradient>
						</defs>
						<path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="none" stroke="#eee" strokeWidth="3"/>
						<path className="ring-stroke" d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="none" stroke="url(#grad)" strokeWidth="3" strokeDasharray={`${(score/100)*100} 100`} strokeLinecap="round"/>
					</svg>
					<div className="absolute inset-0 grid place-items-center text-[11px] font-semibold text-[--color-foreground]">{score}</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<SummaryBlock lines={summary} />
					<MovementMiniMap />
					<div className="grid grid-cols-2 gap-3">
						<SpendTile amount={spend} category="오늘의 지출" />
						<div className="rounded-[--radius-md] bg-[--color-surface] border border-[--color-border] p-3">
							<div className="text-[11px] text-[--color-muted]">오늘의 기분</div>
							<div className="mt-2"><MoodBar value={mood} /></div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
