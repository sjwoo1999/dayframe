"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/shell/BottomNav";
import { Header } from "@/components/shell/Header";
import { useTodayState } from "@/hooks/useTodayState";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

const tabs = ["mood", "expense", "photo", "location"] as const;

type Tab = typeof tabs[number];

function CaptureClient() {
	const sp = useSearchParams();
	const [tab, setTab] = useState<Tab>("mood");
	const { actions } = useTodayState();
	const router = useRouter();

	// controlled states
	const [mood, setMood] = useState<number>(6);
	const [amount, setAmount] = useState<string>("");
	const [label, setLabel] = useState<string>("");

	useEffect(() => {
		const t = sp.get("tab");
		if (tabs.includes((t as Tab) ?? "")) setTab(t as Tab);
	}, [sp]);

	function onSaved() {
		toast.success("Saved", { description: "History updated" });
		router.push("/history");
	}

	function onSaveMood() {
		const v = Math.max(1, Math.min(10, Number(mood || 6)));
		actions.addMood(v);
		onSaved();
	}
	function onSaveExpense() {
		const v = Number(amount);
		if (!Number.isFinite(v) || v <= 0) {
			toast.error("Enter valid amount");
			return;
		}
		actions.addExpense({ amount: v });
		onSaved();
	}
	function onSavePhoto() {
		actions.addPhoto(1);
		onSaved();
	}
	function onSaveLocation() {
		const v = label.trim();
		if (!v) {
			toast.error('Enter label');
			return;
		}
		actions.addLocation({ label: v });
		onSaved();
	}

	const expenseInvalid = amount.trim() === "" || Number(amount) <= 0 || !Number.isFinite(Number(amount));
	const locationInvalid = label.trim() === "";

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
						<label htmlFor="mood-input" className="text-sm">Mood (1-10)</label>
						<Input id="mood-input" type="number" min={1} max={10} value={mood} onChange={(e) => setMood(Number(e.target.value))} />
						<Button onClick={onSaveMood}>Save</Button>
					</div>
				)}
				{tab === "expense" && (
					<div className="space-y-2">
						<label htmlFor="expense-amount" className="text-sm">Amount</label>
						<Input id="expense-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} aria-invalid={expenseInvalid} />
						<p id="expense-help" className="text-xs text-[--ll-gray-600]">Enter a positive number</p>
						<Button onClick={onSaveExpense} disabled={expenseInvalid}>Save</Button>
					</div>
				)}
				{tab === "photo" && (
					<div className="space-y-2">
						<label className="text-sm">Add photo (stub)</label>
						<Button onClick={onSavePhoto}>Save</Button>
					</div>
				)}
				{tab === "location" && (
					<div className="space-y-2">
						<label htmlFor="location-label" className="text-sm">Label</label>
						<Input id="location-label" value={label} onChange={(e) => setLabel(e.target.value)} aria-invalid={locationInvalid} />
						<p id="location-help" className="text-xs text-[--ll-gray-600]">Enter a short place label</p>
						<Button onClick={onSaveLocation} disabled={locationInvalid}>Save</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default function CapturePage() {
	return (
		<main className="mx-auto max-w-sm min-h-dvh bg-[--color-background] text-[--color-foreground] pb-[calc(56px+env(safe-area-inset-bottom))]">
			<Header title="Capture" />
			<div className="p-4">
				<Suspense fallback={<p className="text-sm text-[--ll-gray-500]">Loading…</p>}>
					<CaptureClient />
				</Suspense>
			</div>
			<BottomNav />
		</main>
	);
}
