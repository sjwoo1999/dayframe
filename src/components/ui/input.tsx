import * as React from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={twMerge(
				"flex h-10 w-full rounded-[--radius-md] border border-[--ll-gray-300] bg-white px-3 py-2 text-sm text-[--ll-gray-900]",
				"placeholder:text-[--ll-gray-400] focus-visible:outline-2 focus-visible:outline-[--color-focus-ring] focus-visible:outline-offset-2",
				className
			)}
			{...props}
		/>
	);
});
Input.displayName = "Input";
