import { BottomNav } from "@/components/shell/BottomNav";
import { HistoryListClient } from "@/features/history/HistoryList.client";

export default function HistoryPage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">History</h1>
			<HistoryListClient />
			<BottomNav />
		</main>
	);
}
