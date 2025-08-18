import { hasSupabaseKeys, supabase } from "@/lib/supabase";
import * as Mock from "@/mocks/store";

export type { ExpenseItem, LocationItem, TodayData } from "@/mocks/store";

export interface DbAdapter {
	loadToday(dateISO?: Mock.ISODate): Promise<Mock.TodayData>;
	addMood(value: number, dateISO?: Mock.ISODate): Promise<Mock.TodayData>;
	addExpense(item: Mock.ExpenseItem, dateISO?: Mock.ISODate): Promise<Mock.TodayData>;
	addPhoto(count?: number, dateISO?: Mock.ISODate): Promise<Mock.TodayData>;
	addLocation(loc: Mock.LocationItem, dateISO?: Mock.ISODate): Promise<Mock.TodayData>;
}

class MockAdapter implements DbAdapter {
	async loadToday(dateISO?: Mock.ISODate) { return Mock.loadToday(dateISO); }
	async addMood(value: number, dateISO?: Mock.ISODate) { return Mock.addMood(value, dateISO); }
	async addExpense(item: Mock.ExpenseItem, dateISO?: Mock.ISODate) { return Mock.addExpense(item, dateISO); }
	async addPhoto(count = 1, dateISO?: Mock.ISODate) { return Mock.addPhoto(count, dateISO); }
	async addLocation(loc: Mock.LocationItem, dateISO?: Mock.ISODate) { return Mock.addLocation(loc, dateISO); }
}

class SupabaseAdapter implements DbAdapter {
	async loadToday(): Promise<Mock.TodayData> {
		// NOTE: placeholder aggregation until real queries are wired
		return Mock.loadToday();
	}
	async addMood(value: number): Promise<Mock.TodayData> {
		if (!supabase) return Mock.addMood(value);
		const user = (await supabase.auth.getUser()).data.user;
		if (!user) return Mock.addMood(value);
		await supabase.from("checkins").insert({ user_id: user.id, score: Math.max(1, Math.min(10, Math.round(value))) });
		return this.loadToday();
	}
	async addExpense(item: Mock.ExpenseItem): Promise<Mock.TodayData> {
		if (!supabase) return Mock.addExpense(item);
		const user = (await supabase.auth.getUser()).data.user;
		if (!user) return Mock.addExpense(item);
		await supabase.from("expenses").insert({ user_id: user.id, amount: Math.max(0, Math.round(item.amount)), category: item.category, note: item.note });
		return this.loadToday();
	}
	async addPhoto(count = 1): Promise<Mock.TodayData> {
		// real upload omitted in Step A; keep mock behavior for now
		return Mock.addPhoto(count);
	}
	async addLocation(loc: Mock.LocationItem): Promise<Mock.TodayData> {
		if (!supabase) return Mock.addLocation(loc);
		const user = (await supabase.auth.getUser()).data.user;
		if (!user) return Mock.addLocation(loc);
		await supabase.from("locations").insert({ user_id: user.id, lat: loc.lat, lng: loc.lng, label: loc.label });
		return this.loadToday();
	}
}

export const db: DbAdapter = hasSupabaseKeys && supabase ? new SupabaseAdapter() : new MockAdapter();
