import { TodayCard } from "@/components/core/TodayCard";
import { BottomNav } from "@/components/shell/BottomNav";
import { DetailActionsClient } from "./Actions.client";
import { DetailClient } from "./DetailClient";
import { Header, IconButton } from "@/components/shell/Header";

export default function DayDetailPage({ params }: { params: { date: string } }) {
	const { date } = params;
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Header title={date} left={<IconButton href="/history" label="Back">◀</IconButton>} right={<IconButton href={`/share/${date}`} label="Share">🔗</IconButton>} />
			<div className="p-4 space-y-3">
				<TodayCard />
				<DetailClient date={date} />
				<DetailActionsClient date={date} />
			</div>
			<BottomNav />
		</main>
	);
}
