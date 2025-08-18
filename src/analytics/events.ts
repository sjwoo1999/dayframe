"use client";

import { posthog } from "./posthog";

type EventProps = Record<string, unknown> | undefined;

function safeCapture(event: string, props?: EventProps) {
	try {
		posthog.capture(event, props as Record<string, unknown>);
	} catch {}
}

export const events = {
	card_viewed: (dateISO?: string) => safeCapture("card_viewed", { date: dateISO }),
	mood_added: (value: number) => safeCapture("mood_added", { value }),
	expense_added: (amount: number, category?: string) => safeCapture("expense_added", { amount, category }),
	photo_uploaded: (count: number) => safeCapture("photo_uploaded", { count }),
	location_added: (label: string) => safeCapture("location_added", { label }),
	card_generated: (dateISO?: string) => safeCapture("card_generated", { date: dateISO }),
	card_shared: (id: string) => safeCapture("card_shared", { id }),
	export_pdf: (id?: string) => safeCapture("export_pdf", { id }),
	settings_opened: () => safeCapture("settings_opened"),
};
