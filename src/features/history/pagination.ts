export type HistoryFilters = {
  start?: string; // yyyy-mm-dd
  end?: string;   // yyyy-mm-dd
  tags?: string[];
  category?: string;
  todayOnly?: boolean;
};

export type HistoryKeyParams = HistoryFilters & {
  page: number;
  pageSize: number;
};

function normalizeDate(input?: string): string | undefined {
  if (!input) return undefined;
  return input.trim();
}

export function buildHistoryKey(params: HistoryKeyParams): string {
  const { page, pageSize } = params;
  const normalized = {
    start: normalizeDate(params.start),
    end: normalizeDate(params.end),
    tags: (params.tags ?? []).map(t => t.trim()).filter(Boolean).sort(),
    category: params.category?.trim(),
    todayOnly: params.todayOnly ?? false,
  };
  const parts = [
    `page=${page}`,
    `pageSize=${pageSize}`,
  ];
  if (normalized.start) parts.push(`start=${normalized.start}`);
  if (normalized.end) parts.push(`end=${normalized.end}`);
  if (normalized.tags.length) parts.push(`tags=${normalized.tags.join(',')}`);
  if (normalized.category) parts.push(`category=${normalized.category}`);
  if (normalized.todayOnly) parts.push(`todayOnly=true`);
  return `history:list:${parts.join(':')}`;
}
