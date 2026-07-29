import { describe, it, expect, vi, beforeEach } from "vitest";
import { startWebSocketServer } from "../../server/ws.js";

describe("WebSocket handler", () => {
	let wss;
	let mockHttpServer;
	let mockSessionManager;
	let mockInventoryHandler;
	let mockLogger;

	beforeEach(() => {
		mockHttpServer = { on: vi.fn() };
		mockSessionManager = { createSession: vi.fn(), renewSession: vi.fn(), disconnectSession: vi.fn() };
		mockInventoryHandler = { handleAction: vi.fn(), initializePlayerInventory: vi.fn() };
		mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };

		wss = startWebSocketServer({
			server: mockHttpServer,
			sessionManager: mockSessionManager,
			inventoryHandler: mockInventoryHandler,
			logger: mockLogger,
		});
	});

	it("should attach WebSocketServer to HTTP server", () => {
		expect(mockHttpServer.on).toHaveBeenCalledWith("upgrade", expect.any(Function));
	});
});
