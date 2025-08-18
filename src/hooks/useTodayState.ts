"use client";

import * as React from "react";
import { loadToday, addMood, addExpense, addPhoto, addLocation, type TodayData, type ExpenseItem, type LocationItem } from "@/mocks/store";
import { totals } from "@/mocks/store";

export function useTodayState(dateISO?: string) {
	const [data, setData] = React.useState<TodayData>(() => loadToday(dateISO));

	const refresh = React.useCallback(() => setData(loadToday(dateISO)), [dateISO]);

	const actions = React.useMemo(() => ({
		addMood: (value: number) => setData(addMood(value, dateISO)),
		addExpense: (item: ExpenseItem) => setData(addExpense(item, dateISO)),
		addPhoto: (count = 1) => setData(addPhoto(count, dateISO)),
		addLocation: (loc: LocationItem) => setData(addLocation(loc, dateISO)),
		refresh,
	}), [dateISO, refresh]);

	return { data, actions, totals: totals(data) } as const;
}
