export type ISODate = string; // YYYY-MM-DD

export interface ExpenseItem {
	amount: number;
	category?: string;
	note?: string;
}

export interface LocationItem {
	label: string;
	lat?: number;
	lng?: number;
}

export interface TodayData {
	mood?: number; // 1-10 (last value)
	expenses: ExpenseItem[];
	photos: number; // count only in mock
	locations: LocationItem[];
	updatedAt: string;
}

function todayKey(dateISO?: ISODate): string {
	const d = dateISO ?? new Date().toISOString().slice(0, 10);
	return `dayframe:today:${d}`;
}

export function loadToday(dateISO?: ISODate): TodayData {
	if (typeof window === "undefined") {
		return { expenses: [], photos: 0, locations: [], updatedAt: new Date().toISOString() };
	}
	try {
		const raw = localStorage.getItem(todayKey(dateISO));
		if (!raw) return { expenses: [], photos: 0, locations: [], updatedAt: new Date().toISOString() };
		return JSON.parse(raw) as TodayData;
	} catch {
		return { expenses: [], photos: 0, locations: [], updatedAt: new Date().toISOString() };
	}
}

export function saveToday(data: TodayData, dateISO?: ISODate): void {
	if (typeof window === "undefined") return;
	const next = { ...data, updatedAt: new Date().toISOString() } as TodayData;
	localStorage.setItem(todayKey(dateISO), JSON.stringify(next));
}

export function addMood(value: number, dateISO?: ISODate): TodayData {
	const data = loadToday(dateISO);
	data.mood = Math.max(1, Math.min(10, Math.round(value)));
	saveToday(data, dateISO);
	return data;
}

export function addExpense(item: ExpenseItem, dateISO?: ISODate): TodayData {
	const data = loadToday(dateISO);
	data.expenses.push({ amount: Math.max(0, Math.round(item.amount)), category: item.category?.trim() || undefined, note: item.note?.trim() || undefined });
	saveToday(data, dateISO);
	return data;
}

export function addPhoto(count = 1, dateISO?: ISODate): TodayData {
	const data = loadToday(dateISO);
	data.photos = Math.max(0, (data.photos ?? 0) + Math.max(0, Math.floor(count)));
	saveToday(data, dateISO);
	return data;
}

export function addLocation(loc: LocationItem, dateISO?: ISODate): TodayData {
	const data = loadToday(dateISO);
	data.locations.push({ label: loc.label.trim(), lat: loc.lat, lng: loc.lng });
	saveToday(data, dateISO);
	return data;
}

export function totals(data: TodayData): { totalSpend: number; mood: number | undefined; photoCount: number } {
	const totalSpend = data.expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
	return { totalSpend, mood: data.mood, photoCount: data.photos ?? 0 };
}
