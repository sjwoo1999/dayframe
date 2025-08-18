"use client";

import * as React from "react";
import Link from "next/link";

export type HistoryItem = { date: string; title: string };

function mockFetch(page: number, pageSize: number): Promise<{ items: HistoryItem[]; hasMore: boolean }>{
  // generate descending dates from 2025-01-31
  const start = new Date("2025-01-31");
  const all = Array.from({ length: 60 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, title: `${iso} — Today Card` };
  });
  const offset = page * pageSize;
  const slice = all.slice(offset, offset + pageSize);
  return Promise.resolve({ items: slice, hasMore: offset + pageSize < all.length });
}

export function HistoryListClient() {
  const [page, setPage] = React.useState(0);
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    mockFetch(page, 10).then(({ items: next, hasMore }) => {
      if (!mounted) return;
      setItems(prev => page === 0 ? next : [...prev, ...next]);
      setHasMore(hasMore);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [page]);

  return (
    <div className="mt-3 space-y-2 text-sm">
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
    </div>
  );
}
