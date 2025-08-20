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
			<Button onClick={() => toast.success("Regenerated summary (mock)")}>Regenerate</Button>
		</div>
	);
}
