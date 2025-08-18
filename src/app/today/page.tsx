import { TodayCard } from "@/components/core/TodayCard";
import { QuickActionsClient } from "./QuickActions.client";
import { Toaster } from "@/components/ui/toast";
import { TodayTracker } from "./tracker";
import { BottomNav } from "@/components/shell/BottomNav";

export default function TodayPage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<Toaster position="top-center" richColors />
			<TodayTracker />
			<h1 className="sr-only">Today</h1>
			<div className="space-y-4">
				<TodayCard />
				<QuickActionsClient />
			</div>
			<BottomNav />
		</main>
	);
}
