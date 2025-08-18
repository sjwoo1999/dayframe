import { TodayCard } from "@/components/core/TodayCard";
import { BottomNav } from "@/components/shell/BottomNav";
import { DetailActionsClient } from "./Actions.client";

export default async function DayDetailPage({ params }: { params: Promise<{ date: string }> }) {
	const { date } = await params;
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">{date}</h1>
			<div className="mt-3 space-y-3">
				<TodayCard />
				<section aria-labelledby="raw-records">
					<h2 id="raw-records" className="text-sm font-semibold">Records</h2>
					<ul className="mt-2 space-y-1 text-sm text-[--color-muted]">
						<li>Emotion: 6</li>
						<li>Expense: 18,000 KRW</li>
						<li>Photo: 1</li>
						<li>Location: Cafe</li>
					</ul>
				</section>
				<DetailActionsClient date={date} />
			</div>
			<BottomNav />
		</main>
	);
}
