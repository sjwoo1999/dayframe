"use client";

import * as React from "react";
import { loadToday, addMood, addExpense, addPhoto, addLocation, type TodayData, type ExpenseItem, type LocationItem } from "@/mocks/store";
import { totals } from "@/mocks/store";

export function useTodayState() {
	const [data, setData] = React.useState<TodayData>(() => loadToday());

	const refresh = React.useCallback(() => setData(loadToday()), []);

	const actions = React.useMemo(() => ({
		addMood: (value: number) => setData(addMood(value)),
		addExpense: (item: ExpenseItem) => setData(addExpense(item)),
		addPhoto: (count = 1) => setData(addPhoto(count)),
		addLocation: (loc: LocationItem) => setData(addLocation(loc)),
		refresh,
	}), [refresh]);

	return { data, actions, totals: totals(data) } as const;
}
