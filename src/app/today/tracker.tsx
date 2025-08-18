"use client";

import * as React from "react";
import { initPostHog } from "@/analytics/posthog";
import { events } from "@/analytics/events";

export function TodayTracker() {
	React.useEffect(() => {
		initPostHog();
		events.card_viewed(new Date().toISOString().slice(0, 10));
	}, []);
	return null;
}
