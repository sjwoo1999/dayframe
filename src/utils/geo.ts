export function maskCoordinates(lat?: number, lng?: number): { lat?: number; lng?: number } {
	if (lat === undefined || lng === undefined) return { lat, lng };
	const rnd = (n: number) => Math.round(n * 100) / 100; // mask to 2 decimals (~1km)
	return { lat: rnd(lat), lng: rnd(lng) };
}
