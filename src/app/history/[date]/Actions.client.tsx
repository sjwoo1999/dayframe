"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export function DetailActionsClient({ date }: { date: string }) {
	const router = useRouter();
	return (
		<div className="flex gap-2">
			<Button variant="outline" onClick={() => toast.info("Edit not implemented in mock")}>Edit</Button>
			<Button variant="destructive" onClick={() => { if (confirm(`Delete ${date}?`)) { toast.success("Deleted (mock)"); router.push("/history"); } }}>Delete</Button>
			<Button onClick={() => toast.success("Regenerated summary (mock)")}>Regenerate</Button>
		</div>
	);
}
