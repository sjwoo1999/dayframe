import { notFound } from "next/navigation";
import { ShareClient } from "./ShareClient";
import { Header, IconButton } from "@/components/shell/Header";

export default function SharePage({ params }: { params: { id: string } }) {
	const { id } = params;
	if (!id) return notFound();
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Header title="Share" left={<IconButton href="/today" label="Back">◀</IconButton>} />
			<div className="p-4">
				<ShareClient id={id} />
			</div>
		</main>
	);
}
