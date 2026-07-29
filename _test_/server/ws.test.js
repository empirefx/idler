import { describe, it, expect, vi, beforeEach } from "vitest";
import { startWebSocketServer } from "../../server/ws.js";

describe("WebSocket handler", () => {
	let wss;
	let mockHttpServer;
	let mockSessionManager;
	let mockLogger;
	let mockServices;
	let mockBroadcaster;

	beforeEach(() => {
		mockHttpServer = { on: vi.fn() };
		mockSessionManager = { createSession: vi.fn(), renewSession: vi.fn(), disconnectSession: vi.fn() };
		mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
		mockServices = {
			combatService: { handlePlayerAttack: vi.fn() },
			productionService: { assignWorker: vi.fn(), unassignWorker: vi.fn() },
			craftingService: { craft: vi.fn() },
			buildingService: { build: vi.fn() },
			workerService: { hire: vi.fn() },
			questService: { accept: vi.fn(), complete: vi.fn() },
			skillsService: { activateSkill: vi.fn() },
			spawnService: { triggerSpawn: vi.fn() },
			navigationService: { navigate: vi.fn() },
		};
		mockBroadcaster = { setSendFn: vi.fn() };

		wss = startWebSocketServer({
			server: mockHttpServer,
			sessionManager: mockSessionManager,
			...mockServices,
			broadcaster: mockBroadcaster,
			logger: mockLogger,
		});
	});

	it("should attach WebSocketServer to HTTP server", () => {
		expect(mockHttpServer.on).toHaveBeenCalledWith("upgrade", expect.any(Function));
	});
});
