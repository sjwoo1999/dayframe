"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type SheetProps = React.ComponentProps<typeof Dialog.Root>;

export function Sheet({ children, ...props }: SheetProps) {
	return <Dialog.Root {...props}>{children}</Dialog.Root>;
}

export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({ side = "bottom", title = "Sheet", className, children, ...props }: React.ComponentProps<typeof Dialog.Content> & { side?: "top" | "bottom" | "left" | "right"; title?: string }) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
			<Dialog.Content
				className={twMerge(
					"fixed z-50 bg-white shadow-[--shadow-lg] outline-none",
					clsx(
						side === "bottom" && "inset-x-0 bottom-0 rounded-t-[--radius-xl] p-4",
						side === "top" && "inset-x-0 top-0 rounded-b-[--radius-xl] p-4",
						side === "left" && "inset-y-0 left-0 h-full w-80 p-4",
						side === "right" && "inset-y-0 right-0 h-full w-80 p-4"
					),
					className
				)}
				{...props}
			>
				<Dialog.Title className="sr-only">{title}</Dialog.Title>
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	);
}
