import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Dayframe",
	description: "Your day in one card.",
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
} satisfies import("next").Viewport;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className="antialiased">
				{children}
				<div id="toast-root" aria-live="polite" aria-atomic="true" />
			</body>
		</html>
	);
}
