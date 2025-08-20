"use client";

import * as React from "react";
import { useTodayState } from "@/hooks/useTodayState";
import { SummaryBlock } from "@/components/core/SummaryBlock";

export function DetailClient({ date }: { date: string }) {
	const { data, totals } = useTodayState(date);
	return (
		<section aria-labelledby="raw-records" className="space-y-4">
			<h2 id="raw-records" className="text-sm font-semibold">Records</h2>
			<ul className="space-y-1 text-sm text-[--color-muted]">
				<li>Emotion: {data.mood ?? '-'}</li>
				<li>Expense: {totals.totalSpend.toLocaleString()} KRW ({data.expenses.length} items)</li>
				<li>Photo: {data.photos ?? 0}</li>
				<li>Location: {data.locations.map(l => l.label).join(', ') || '-'}</li>
			</ul>
			{data.summary?.length ? (
				<SummaryBlock title="요약" lines={data.summary} />
			) : null}
		</section>
	);
}
