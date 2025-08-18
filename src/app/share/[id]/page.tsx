import { notFound } from "next/navigation";
import { ShareClient } from "./ShareClient";

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) return notFound();
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh bg-[--color-background] text-[--color-foreground]">
			<h1 className="text-base font-semibold">Shared Card</h1>
			<ShareClient id={id} />
		</main>
	);
}
