import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	test: {
		environment: "jsdom",
		include: ["tests/unit/**/*.spec.ts"],
		exclude: ["tests/e2e/**", "node_modules/**"],
		testSetupFiles: [resolve(__dirname, "tests/setup.ts")],
		coverage: {
			reporter: ["text", "html"],
		},
	},
});
