import { test, expect } from '@playwright/test';

test('Today happy path: view card and add mood', async ({ page }) => {
	await page.goto('/today');
	await expect(page.getByRole('heading', { name: 'Today', level: 2 })).toBeVisible();
	await page.waitForLoadState('networkidle');
	await expect(page.getByText('감정', { exact: true })).toBeVisible({ timeout: 10000 });
	await expect(page.getByText('지출', { exact: true })).toBeVisible({ timeout: 10000 });
	await expect(page.getByText('사진', { exact: true })).toBeVisible({ timeout: 10000 });
	await expect(page.getByText('위치', { exact: true })).toBeVisible({ timeout: 10000 });

	await page.getByText('감정', { exact: true }).click();
	const numberInputs = page.locator('input[type="number"]');
	await numberInputs.first().fill('7');
	await page.getByRole('button', { name: '저장' }).click();

	await expect(page.getByText('감정 저장')).toBeVisible();
});
