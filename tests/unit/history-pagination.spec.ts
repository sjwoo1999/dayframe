import { describe, it, expect } from 'vitest';
import { buildHistoryKey } from '@/features/history/pagination';

describe('buildHistoryKey', () => {
  it('builds minimal key with page and size', () => {
    expect(buildHistoryKey({ page: 0, pageSize: 10 })).toBe('history:list:page=0:pageSize=10');
  });
  it('normalizes and sorts filters deterministically', () => {
    const k1 = buildHistoryKey({ page: 1, pageSize: 20, start: '2025-01-01', end: '2025-01-31', tags: [' work', 'life '], category: ' cafe ', todayOnly: true });
    const k2 = buildHistoryKey({ page: 1, pageSize: 20, end: '2025-01-31', start: '2025-01-01', tags: ['life', 'work'], category: 'cafe', todayOnly: true });
    expect(k1).toBe(k2);
    expect(k1).toContain('tags=life,work');
    expect(k1).toContain('todayOnly=true');
  });
});
