import { BottomNav } from "@/components/shell/BottomNav";
import { Header } from "@/components/shell/Header";

export default function SettingsPage() {
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Header title="Settings" />
			<div className="p-4 space-y-2">
				<p className="text-sm text-[--ll-gray-500]">계정/환경설정</p>
			</div>
			<BottomNav />
		</main>
	);
}
