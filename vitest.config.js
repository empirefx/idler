import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: {
		include: /\.(js|jsx)$/,
		loader: "jsx",
		jsx: "automatic",
	},
	test: {
		globals: true,
		environment: "node",
		coverage: {
			reporter: ["text", "lcov"],
		},
		include: ["_test_/**/*.test.{js,jsx}"],
	},
});
