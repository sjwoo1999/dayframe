import { test, expect } from '@playwright/test';

test('History: loads list and can load more', async ({ page }) => {
  await page.goto('/history');
  await expect(page.getByRole('heading', { name: 'History', level: 1 })).toBeVisible();
  const items = page.locator('main ul li');
  const initial = await items.count();
  expect(initial).toBeGreaterThanOrEqual(10);
  await page.getByRole('button', { name: /load more/i }).click();
  await expect(async () => {
    const after = await items.count();
    expect(after).toBeGreaterThan(initial);
  }).toPass({ timeout: 10000 });
});
