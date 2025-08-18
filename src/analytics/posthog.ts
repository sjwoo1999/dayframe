"use client";

import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";
export const analyticsEnabled = Boolean(key);

export function initPostHog() {
	if (!analyticsEnabled) return;
	if (typeof window === "undefined") return;
	if (posthog.__loaded) return;
	posthog.init(key as string, { api_host: host, person_profiles: "identified_only" });
}

export { posthog };
