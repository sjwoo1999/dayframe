import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Dayframe",
		template: "%s · Dayframe",
	},
	description: "Your day in one card.",
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
} satisfies import("next").Viewport;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				<title>Dayframe</title>
			</head>
			<body className="antialiased pb-[calc(56px+env(safe-area-inset-bottom))]">
				{children}
				<div id="toast-root" aria-live="polite" aria-atomic="true" />
			</body>
		</html>
	);
}
