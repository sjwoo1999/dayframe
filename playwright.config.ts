import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 30 * 1000,
	expect: { timeout: 5000 },
	fullyParallel: true,
	reporter: [['list']],
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
		video: 'retain-on-failure',
	},
	projects: [
		{ name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
	],
	webServer: {
		command: 'node ./node_modules/next/dist/bin/next dev -p 3000',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
