import { describe, it, expect, vi } from 'vitest';

describe('env schema', () => {
  it('parses defaults and allows empty optionals', async () => {
    const original = { ...process.env };
    try {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      delete process.env.SUPABASE_SERVICE_ROLE;
      delete process.env.OPENAI_API_KEY;
      delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
      delete process.env.OPENAI_MODEL;
      delete process.env.NEXT_PUBLIC_POSTHOG_HOST;

      // dynamic import to re-evaluate schema with current process.env
      const mod = await import('@/lib/env');
      expect(mod.env.NODE_ENV).toBeDefined();
      expect(typeof mod.env.OPENAI_MODEL).toBe('string');
    } finally {
      process.env = original;
    }
  });
});

