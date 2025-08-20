"use client";

import * as React from "react";

type HeaderProps = {
	title?: string;
	left?: React.ReactNode;
	right?: React.ReactNode;
};

export function Header({ title = "Dayframe", left, right }: HeaderProps) {
	return (
		<header role="banner" className="sticky top-0 z-[60] bg-[--color-surface]/80 backdrop-blur border-b border-[--color-border] h-12 flex items-center px-3">
			<div className="flex-1 min-w-0 flex items-center gap-2">
				{left ?? null}
				<h1 className="text-sm font-semibold truncate">
					{title}
				</h1>
			</div>
			<div className="flex items-center gap-2">
				{right ?? null}
			</div>
		</header>
	);
}
