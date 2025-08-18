import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseKeys = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseKeys
	? createClient(supabaseUrl as string, supabaseAnonKey as string, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: true,
		},
	})
	: undefined;
