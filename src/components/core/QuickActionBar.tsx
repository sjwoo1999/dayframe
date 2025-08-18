"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useTodayState } from "@/hooks/useTodayState";
import { events } from "@/analytics/events";

function MoodSheet() {
	const { actions } = useTodayState();
	const [mood, setMood] = React.useState<number>(6);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="glow">감정</Button>
			</SheetTrigger>
			<SheetContent side="bottom" title="오늘의 기분">
				<div className="max-w-sm mx-auto space-y-3">
					<p className="text-sm">오늘의 기분 (1-10)</p>
					<Input type="number" min={1} max={10} value={mood} onChange={(e) => setMood(Number(e.target.value))} aria-label="오늘의 기분" />
					<div className="flex justify-end gap-2">
						<SheetClose asChild>
							<Button variant="outline">취소</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button onClick={() => { actions.addMood(mood); events.mood_added(mood); toast.success("감정 저장", { description: `기분 ${mood}` }); }}>저장</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function ExpenseSheet() {
	const { actions } = useTodayState();
	const [amount, setAmount] = React.useState<number>(0);
	const [category, setCategory] = React.useState<string>("");
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary">지출</Button>
			</SheetTrigger>
			<SheetContent side="bottom" title="지출 입력">
				<div className="max-w-sm mx-auto space-y-3">
					<p className="text-sm">지출 입력</p>
					<Input type="number" placeholder="금액" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
					<Input placeholder="카테고리 (선택)" value={category} onChange={(e) => setCategory(e.target.value)} />
					<div className="flex justify-end gap-2">
						<SheetClose asChild>
							<Button variant="outline">취소</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button onClick={() => { actions.addExpense({ amount, category }); events.expense_added(amount, category); toast.success("지출 저장", { description: `${amount.toLocaleString()}원` }); }}>저장</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function PhotoSheet() {
	const { actions } = useTodayState();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">사진</Button>
			</SheetTrigger>
			<SheetContent side="bottom" title="사진 추가">
				<div className="max-w-sm mx-auto space-y-3">
					<p className="text-sm">사진 업로드는 V1에선 count 기반 모의 저장</p>
					<div className="flex justify-end gap-2">
						<SheetClose asChild>
							<Button variant="outline">닫기</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button onClick={() => { actions.addPhoto(1); events.photo_uploaded(1); toast.success("사진 기록", { description: "1장 추가" }); }}>+1</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function LocationSheet() {
	const { actions } = useTodayState();
	const [label, setLabel] = React.useState<string>("");
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">위치</Button>
			</SheetTrigger>
			<SheetContent side="bottom" title="위치 추가">
				<div className="max-w-sm mx-auto space-y-3">
					<p className="text-sm">위치 라벨</p>
					<Input placeholder="예: 카페, 집" value={label} onChange={(e) => setLabel(e.target.value)} />
					<div className="flex justify-end gap-2">
						<SheetClose asChild>
							<Button variant="outline">취소</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button onClick={() => { if (!label.trim()) { toast.error("라벨을 입력해주세요"); return; } actions.addLocation({ label }); events.location_added(label); toast.success("위치 저장", { description: label }); }}>저장</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

export function QuickActionBar() {
	return (
		<div className="grid grid-cols-4 gap-2">
			<MoodSheet />
			<ExpenseSheet />
			<PhotoSheet />
			<LocationSheet />
		</div>
	);
}
