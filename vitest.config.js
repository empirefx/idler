import { defineConfig } from "vitest/config";
import esbuild from "esbuild";

export default defineConfig({
	plugins: [
		{
			name: "treat-js-as-jsx",
			enforce: "pre",
			async transform(code, id) {
				if (!id.endsWith(".js") || id.includes("node_modules")) return null;
				const result = await esbuild.transform(code, {
					loader: "jsx",
					jsx: "automatic",
				});
				return { code: result.code, map: result.map || null };
			},
		},
	],
	esbuild: {
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
