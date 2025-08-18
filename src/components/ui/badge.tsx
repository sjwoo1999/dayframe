import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

type BadgeVariant = "default" | "secondary" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
	const styles = clsx(
		"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
		variant === "default" && "bg-[--ll-gray-900] text-white",
		variant === "secondary" && "bg-[--color-primary-700] text-white",
		variant === "outline" && "border border-[--ll-gray-300] text-[--ll-gray-800]"
	);
	return <span className={twMerge(styles, className)} {...props} />;
}
