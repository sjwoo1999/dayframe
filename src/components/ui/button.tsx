import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive" | "glow";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean;
}

function baseClasses({ disabled }: { disabled?: boolean }) {
	return clsx(
		"inline-flex items-center justify-center whitespace-nowrap rounded-[--radius-md] font-medium transition-colors select-none",
		"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-focus-ring]",
		"min-h-[44px]",
		disabled && "opacity-60 pointer-events-none"
	);
}

function variantClasses(variant: ButtonVariant): string {
	switch (variant) {
	case "secondary":
	return "bg-[--ll-gray-900] text-white hover:opacity-90 focus-visible:opacity-95";
	case "outline":
	return "bg-[--color-surface] text-[--ll-gray-900] border border-[--color-border] hover:bg-[--ll-gray-50]";
	case "ghost":
	return "bg-transparent text-[--ll-gray-900] hover:bg-[--ll-gray-100]";
	case "destructive":
	return "bg-red-600 text-white hover:bg-red-700";
	case "glow":
	return "relative bg-[--color-primary-700] text-white shadow-[0_0_0_0_rgba(247,98,65,0.35)] hover:shadow-[0_0_18px_6px_rgba(247,98,65,0.35)] transition-shadow";
	case "default":
	default:
	return "bg-[--color-primary-700] text-white hover:opacity-90";
	}
}

function sizeClasses(size: ButtonSize): string {
	switch (size) {
		case "sm":
			return "h-9 px-3 text-sm";
		case "lg":
			return "h-12 px-5 text-base";
		case "md":
		default:
			return "h-10 px-4 text-sm";
	}
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "md", ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={twMerge(baseClasses({ disabled: props.disabled }), variantClasses(variant), sizeClasses(size), className)}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";
