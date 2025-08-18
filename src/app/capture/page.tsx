"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/shell/BottomNav";

const tabs = ["mood", "expense", "photo", "location"] as const;

type Tab = typeof tabs[number];

function CaptureClient() {
	const sp = useSearchParams();
	const [tab, setTab] = useState<Tab>("mood");
	useEffect(() => {
		const t = sp.get("tab");
		if (tabs.includes((t as Tab) ?? "")) setTab(t as Tab);
	}, [sp]);
	return (
		<>
			<div className="mt-3 flex gap-2 text-xs">
				{tabs.map((t) => (
					<Button key={t} variant={t === tab ? "secondary" : "outline"} onClick={() => setTab(t)} aria-label={`open ${t} tab`}>
						{t}
					</Button>
				))}
			</div>
			<div className="mt-4">
				{tab === "mood" && (
					<div className="space-y-2">
						<label className="text-sm">Mood (1-10)</label>
						<Input type="number" min={1} max={10} defaultValue={6} />
						<Button>Save</Button>
					</div>
				)}
				{tab === "expense" && (
					<div className="space-y-2">
						<label className="text-sm">Amount</label>
						<Input type="number" />
						<Button>Save</Button>
					</div>
				)}
				{tab === "photo" && (
					<div className="space-y-2">
						<label className="text-sm">Add photo (stub)</label>
						<Button>Save</Button>
					</div>
				)}
				{tab === "location" && (
					<div className="space-y-2">
						<label className="text-sm">Label</label>
						<Input />
						<Button>Save</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default function CapturePage() {
	return (
		<main className="mx-auto max-w-sm p-4 min-h-dvh">
			<h1 className="text-base font-semibold">Capture</h1>
			<Suspense fallback={<p className="text-sm text-[--ll-gray-500]">Loading…</p>}>
				<CaptureClient />
			</Suspense>
			<BottomNav />
		</main>
	);
}
