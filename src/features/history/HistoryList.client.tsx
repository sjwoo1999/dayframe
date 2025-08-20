"use client";

import * as React from "react";
import Link from "next/link";
import { type HistoryFilters } from "@/features/history/pagination";

export type HistoryItem = { date: string; title: string };

function mockFetch(page: number, pageSize: number, filters?: HistoryFilters): Promise<{ items: HistoryItem[]; hasMore: boolean }>{
  // generate descending dates from 2025-01-31
  const start = new Date("2025-01-31");
  let all = Array.from({ length: 60 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, title: `${iso} — Today Card` };
  });
  // apply filters
  if (filters?.todayOnly) {
    const today = new Date().toISOString().slice(0, 10);
    all = all.filter(it => it.date === today);
  }
  if (filters?.start) {
    all = all.filter(it => it.date >= filters.start!);
  }
  if (filters?.end) {
    all = all.filter(it => it.date <= filters.end!);
  }
  const offset = page * pageSize;
  const slice = all.slice(offset, offset + pageSize);
  return Promise.resolve({ items: slice, hasMore: offset + pageSize < all.length });
}

export function HistoryListClient() {
  const [page, setPage] = React.useState(0);
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<HistoryFilters>({ todayOnly: false });

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    mockFetch(page, 10, filters).then(({ items: next, hasMore }) => {
      if (!mounted) return;
      setItems(prev => page === 0 ? next : [...prev, ...next]);
      setHasMore(hasMore);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [page, filters]);

  // refresh when broadcasted update happens
  React.useEffect(() => {
    const handler = () => setPage(0);
    window.addEventListener('dayframe:updated', handler);
    return () => window.removeEventListener('dayframe:updated', handler);
  }, []);

  // handlers
  function onToggleTodayOnly() {
    setPage(0);
    setFilters(prev => ({ ...prev, todayOnly: !prev.todayOnly }));
  }
  function onChangeStart(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value || undefined;
    setPage(0);
    setFilters(prev => ({ ...prev, start: v }));
  }
  function onChangeEnd(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value || undefined;
    setPage(0);
    setFilters(prev => ({ ...prev, end: v }));
  }

  const showEmpty = !loading && items.length === 0;

  return (
    <div className="mt-3 space-y-3 text-sm">
      <div className="flex items-end gap-2">
        <label className="inline-flex items-center gap-2 text-xs">
          <input type="checkbox" checked={!!filters.todayOnly} onChange={onToggleTodayOnly} aria-label="Today only" />
          Today only
        </label>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs" htmlFor="start-date">Start</label>
          <input id="start-date" type="date" className="rounded-[--radius-sm] border border-[--color-border] px-2 py-1" value={filters.start ?? ""} onChange={onChangeStart} />
          <label className="text-xs" htmlFor="end-date">End</label>
          <input id="end-date" type="date" className="rounded-[--radius-sm] border border-[--color-border] px-2 py-1" value={filters.end ?? ""} onChange={onChangeEnd} />
        </div>
      </div>

      {showEmpty ? (
        <div className="grid place-items-center py-12 text-center text-[--ll-gray-600]">
          <p className="mb-3">조건에 맞는 카드가 없어요.</p>
          <Link href="/capture" className="rounded-[--radius-md] border border-[--color-border] px-3 py-2">오늘 기록 추가</Link>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map(it => (
              <li key={it.date} className="flex items-center justify-between border-b border-[--color-border] pb-2">
                <Link className="underline" href={`/history/${it.date}`}>{it.date}</Link>
                <span className="text-[--color-muted]">{it.title}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button className="w-full rounded-[--radius-md] border border-[--color-border] py-2 disabled:opacity-60" onClick={() => setPage(p => p + 1)} disabled={loading}>
              {loading ? 'Loading…' : 'Load more'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
