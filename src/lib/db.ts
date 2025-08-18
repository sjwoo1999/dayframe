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
		// TODO: Implement real aggregation across tables; use mock for now
		return Mock.loadToday();
	}
	async addMood(value: number): Promise<Mock.TodayData> {
		// TODO: Insert into checkins, return aggregated today data
		return Mock.addMood(value);
	}
	async addExpense(item: Mock.ExpenseItem): Promise<Mock.TodayData> {
		// TODO: Insert into expenses
		return Mock.addExpense(item);
	}
	async addPhoto(count = 1): Promise<Mock.TodayData> {
		// TODO: Upload to storage and record rows; mock count
		return Mock.addPhoto(count);
	}
	async addLocation(loc: Mock.LocationItem): Promise<Mock.TodayData> {
		// TODO: Insert into locations
		return Mock.addLocation(loc);
	}
}

export const db: DbAdapter = hasSupabaseKeys && supabase ? new SupabaseAdapter() : new MockAdapter();
