import Link from "next/link";
import { BottomNav } from "@/components/shell/BottomNav";

export default function HistoryPage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">History</h1>
			<ul className="mt-3 space-y-2 text-sm">
				<li><Link className="underline" href="/history/2025-01-01">2025-01-01</Link></li>
				<li><Link className="underline" href="/history/2025-01-02">2025-01-02</Link></li>
			</ul>
			<BottomNav />
		</main>
	);
}
