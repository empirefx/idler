import { describe, it, expect, vi } from "vitest";
import { createServerLogger } from "../../server/logger.js";

describe("server logger", () => {
	it("should log messages with timestamp", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		const logger = createServerLogger({ debug: true });
		logger.log("test message", "INFO");
		expect(spy).toHaveBeenCalledOnce();
		const call = spy.mock.calls[0][0];
		expect(call).toContain("test message");
		expect(call).toContain("INFO");
		spy.mockRestore();
	});

	it("should not log debug messages when debug is false", () => {
		const spy = vi.spyOn(console, "log").mockImplementation(() => {});
		const logger = createServerLogger({ debug: false });
		logger.log("debug message", "DEBUG");
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});

	it("should always log errors regardless of debug flag", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});
		const logger = createServerLogger({ debug: false });
		logger.error("error message");
		expect(spy).toHaveBeenCalledOnce();
		spy.mockRestore();
	});
});
