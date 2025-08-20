import { BottomNav } from "@/components/shell/BottomNav";
import { HistoryListClient } from "@/features/history/HistoryList.client";
import { Header } from "@/components/shell/Header";

export default function HistoryPage() {
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Header title="History" />
			<div className="p-4">
				<HistoryListClient />
			</div>
			<BottomNav />
		</main>
	);
}
