import { TodayCard } from "@/components/core/TodayCard";
import { QuickActionsClient } from "./QuickActions.client";
import { Toaster } from "@/components/ui/toast";
import { TodayTracker } from "./tracker";
import { BottomNav } from "@/components/shell/BottomNav";
import { Header, IconButton } from "@/components/shell/Header";

export default function TodayPage() {
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Toaster position="top-center" richColors />
			<TodayTracker />
			<Header title="Today" right={<IconButton href="/share/demo" label="Share">🔗</IconButton>} />
			<div className="p-4 space-y-4">
				<TodayCard />
				<QuickActionsClient />
			</div>
			<BottomNav />
		</main>
	);
}
