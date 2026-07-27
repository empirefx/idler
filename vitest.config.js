import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: {
		include: /\.js$/,
  	loader: 'jsx',
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
