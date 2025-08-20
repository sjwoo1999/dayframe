"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useTodayState } from "@/hooks/useTodayState";

export function DetailActionsClient({ date }: { date: string }) {
	const router = useRouter();
	const { actions } = useTodayState(date);
	return (
		<div className="flex gap-2">
			<Button variant="outline" onClick={() => { actions.updateMood(undefined); toast.success("Cleared mood"); }}>Edit</Button>
			<Button variant="destructive" onClick={() => { if (confirm(`Delete ${date}?`)) { actions.clearDay(); toast.success("Deleted"); router.push("/history"); } }}>Delete</Button>
			<Button onClick={async () => {
				try {
					// optimistic placeholder
					actions.setSummary(["요약을 다시 준비하는 중…"], undefined, `loading:${date}`);
					const res = await fetch(`/api/daily-cards/${date}/generate?moves=5&spend=12000&mood=6&photos=1&cat=cafe`, { cache: 'no-store' });
					if (!res.ok) throw new Error(String(res.status));
					const json = await res.json() as { lines: string[]; score?: number };
					actions.setSummary(json.lines, json.score, `api:${date}`);
					toast.success("Summary regenerated");
				} catch (e) {
					toast.error("Failed to regenerate summary");
				}
			}}>Regenerate</Button>
		</div>
	);
}
