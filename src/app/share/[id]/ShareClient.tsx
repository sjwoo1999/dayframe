"use client";

import * as React from "react";
import { TodayCard } from "@/components/core/TodayCard";
import { Button } from "@/components/ui/button";
import { events } from "@/analytics/events";

export function ShareClient({ id }: { id: string }) {
	const ref = React.useRef<HTMLDivElement>(null);

	async function exportPNG() {
		if (!ref.current) return;
		const { toPng } = await import("html-to-image");
		const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 2 });
		const link = document.createElement("a");
		link.download = `dayframe-${id}.png`;
		link.href = dataUrl;
		link.click();
		events.export_pdf(id);
	}

	async function exportPDF() {
		if (!ref.current) return;
		const [{ toPng }, { default: jsPDF }] = await Promise.all([
			import("html-to-image"),
			import("jspdf"),
		]);
		const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 2 });
		const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: [375, 667] });
		pdf.addImage(dataUrl, "PNG", 0, 0, 375, 667);
		pdf.save(`dayframe-${id}.pdf`);
		events.export_pdf(id);
	}

	return (
		<div className="mx-auto max-w-sm p-4 space-y-3">
			<div ref={ref} className="bg-white p-2 rounded-[--radius-lg]">
				<TodayCard />
			</div>
			<div className="flex gap-2">
				<Button variant="outline" onClick={exportPNG}>이미지 저장</Button>
				<Button onClick={exportPDF}>PDF 저장</Button>
			</div>
		</div>
	);
}
