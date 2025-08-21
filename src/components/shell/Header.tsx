"use client";

import * as React from "react";

type HeaderProps = {
	title?: string;
	left?: React.ReactNode;
	right?: React.ReactNode;
};

function IconButton({ children, onClick, href, label }: { children: React.ReactNode; onClick?: () => void; href?: string; label: string }) {
	const cls = "inline-grid place-items-center rounded-[--radius-md] min-h-[36px] min-w-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-focus-ring] hover:bg-[--ll-gray-100]";
	if (href) {
		return <a href={href} aria-label={label} className={cls}>{children}</a>;
	}
	return <button type="button" aria-label={label} className={cls} onClick={onClick}>{children}</button>;
}
export { IconButton };

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
