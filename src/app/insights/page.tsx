import { BottomNav } from "@/components/shell/BottomNav";

export default function InsightsPage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh">
			<h1 className="text-base font-semibold">Insights</h1>
			<p className="text-sm text-[--ll-gray-500]">주/월 리캡과 트렌드가 여기에 표시됩니다.</p>
			<BottomNav />
		</main>
	);
}
