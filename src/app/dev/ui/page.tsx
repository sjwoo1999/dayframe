"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster, toast } from "@/components/ui/toast";

export default function UIPlayground() {
	return (
		<main className="mx-auto max-w-sm p-4 space-y-4">
			<Toaster position="top-center" richColors />
			<h1 className="text-base font-semibold">UI Primitives</h1>
			<div className="flex gap-2 flex-wrap">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Destructive</Button>
			</div>
			<div className="flex gap-2 items-center">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline">Outline</Badge>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Input placeholder="Input" />
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline">Open Sheet</Button>
							</SheetTrigger>
							<SheetContent side="bottom">
								<div className="max-w-sm mx-auto">
									<p className="text-sm">Sheet content</p>
								</div>
							</SheetContent>
						</Sheet>
						<Button onClick={() => toast.success("Toast!", { description: "Saved" })}>Toast</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
