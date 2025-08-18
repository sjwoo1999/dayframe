import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().or(z.literal("")),
	SUPABASE_SERVICE_ROLE: z.string().optional().or(z.literal("")),
	OPENAI_API_KEY: z.string().optional().or(z.literal("")),
	OPENAI_MODEL: z.string().default("gpt-4o-mini"),
	NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().or(z.literal("")),
	NEXT_PUBLIC_POSTHOG_HOST: z.string().url().default("https://app.posthog.com"),
});

export const env = EnvSchema.parse({
	NODE_ENV: process.env.NODE_ENV,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE,
	OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	OPENAI_MODEL: process.env.OPENAI_MODEL,
	NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
	NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export type Env = z.infer<typeof EnvSchema>;
