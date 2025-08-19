export const UPDATED_EVENT = 'dayframe:updated';

export function broadcastUpdated(): void {
	if (typeof window === 'undefined') return;
	window.dispatchEvent(new Event(UPDATED_EVENT));
}

export function onUpdated(listener: () => void): () => void {
	if (typeof window === 'undefined') return () => {};
	window.addEventListener(UPDATED_EVENT, listener);
	return () => window.removeEventListener(UPDATED_EVENT, listener);
}
