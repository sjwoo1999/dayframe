import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface SpendTileProps {
	amount: number;
	category?: string;
	className?: string;
}

export function SpendTile({ amount, category = "지출", className }: SpendTileProps) {
	const formatted = new Intl.NumberFormat("ko-KR").format(amount);
	return (
		<div className={twMerge("rounded-[--radius-md] bg-white border border-[--ll-gray-200] p-3", className)}>
			<div className="text-[11px] text-[--ll-gray-500]">{category}</div>
			<div className="mt-1 text-lg font-semibold text-[--ll-gray-900]">₩{formatted}</div>
		</div>
	);
}
