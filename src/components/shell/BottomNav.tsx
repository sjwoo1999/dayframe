"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const tabs = [
	{ href: "/today", label: "오늘" },
	{ href: "/history", label: "히스토리" },
	{ href: "/insights", label: "인사이트" },
	{ href: "/share/demo", label: "공유" },
	{ href: "/settings", label: "설정" },
];

export function BottomNav() {
	const pathname = usePathname();
	return (
		<nav className="fixed inset-x-0 bottom-0 z-40 bg-white/80 backdrop-blur border-t border-[--ll-gray-200]">
			<ul className="mx-auto max-w-sm grid grid-cols-5 gap-1 px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)]">
				{tabs.map((t) => {
					const active = pathname?.startsWith(t.href);
					return (
						<li key={t.href}>
							<Link
								href={t.href}
								className={clsx(
									"block text-center rounded-[--radius-md] px-2 py-1 text-xs font-medium",
									active ? "bg-[--ll-gray-900] text-white" : "text-[--ll-gray-700] hover:bg-[--ll-gray-100]"
								)}
								aria-current={active ? "page" : undefined}
							>
								{t.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
