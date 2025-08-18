"use client";

import dynamic from "next/dynamic";

const QuickActionBar = dynamic(
	() => import("@/components/core/QuickActionBar").then((m) => m.QuickActionBar),
	{ ssr: false, loading: () => <div className="h-[56px]" aria-hidden /> }
);

export function QuickActionsClient() {
	return (
		<div className="glass gradient-border rounded-[--radius-xl] p-2">
			<QuickActionBar />
		</div>
	);
}
