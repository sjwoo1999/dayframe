import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={twMerge("rounded-[--radius-lg] shadow-[--shadow-md] border border-[--ll-gray-200] bg-white dark:bg-[--ll-gray-900]", className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={twMerge("px-4 pt-4", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={twMerge("px-4 pb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={twMerge("text-sm font-semibold", className)} {...props} />;
}
