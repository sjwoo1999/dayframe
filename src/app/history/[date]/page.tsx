import { TodayCard } from "@/components/core/TodayCard";
import { BottomNav } from "@/components/shell/BottomNav";
import { DetailActionsClient } from "./Actions.client";
import { DetailClient } from "./DetailClient";

export default async function DayDetailPage({ params }: { params: Promise<{ date: string }> }) {
	const { date } = await params;
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">{date}</h1>
			<div className="mt-3 space-y-3">
				<TodayCard />
				<DetailClient date={date} />
				<DetailActionsClient date={date} />
			</div>
			<BottomNav />
		</main>
	);
}
