export function ariaNumber(value: number | undefined | null): string | undefined {
	if (value === undefined || value === null || Number.isNaN(value)) return undefined;
	return String(value);
}

export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}
