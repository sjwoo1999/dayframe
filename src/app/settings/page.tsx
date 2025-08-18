import { BottomNav } from "@/components/shell/BottomNav";

export default function SettingsPage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">Settings</h1>
			<p className="text-sm text-[--ll-gray-500]">계정/환경설정</p>
			<BottomNav />
		</main>
	);
}
