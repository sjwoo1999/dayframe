import { notFound } from "next/navigation";

export default async function DayDetailPage({ params }: { params: Promise<{ date: string }> }) {
	const { date } = await params;
	if (!date) return notFound();
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh">
			<h1 className="text-base font-semibold">Day Detail</h1>
			<p className="text-sm text-[--ll-gray-500]">날짜: {date}</p>
		</main>
	);
}
