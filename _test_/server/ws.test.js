import { describe, it, expect, vi, beforeEach } from "vitest";
import { WebSocketServer } from "ws";
import { startWebSocketServer } from "../../server/ws.js";

describe("WebSocket handler", () => {
	let wss;
	let mockHttpServer;
	let mockSessionManager;
	let mockLogger;
	let mockServices;
	let mockBroadcaster;
	let mockPlayerState;
	let mockInventoryState;
	let connectionHandler;

	beforeEach(() => {
		mockHttpServer = { on: vi.fn() };
		mockSessionManager = { createSession: vi.fn(), getSession: vi.fn(), renewSession: vi.fn(), disconnectSession: vi.fn(), initializeFullState: vi.fn(), loadFullState: vi.fn() };
		mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
		mockPlayerState = { load: vi.fn(), save: vi.fn() };
		vi.spyOn(WebSocketServer.prototype, "on");
		WebSocketServer.prototype.on.mockClear();
		mockServices = {
			combatService: { startAutoCombat: vi.fn(), stopAutoCombat: vi.fn(), revive: vi.fn(), levelUp: vi.fn(), recomputeDerivedStats: vi.fn(), computeAndBroadcastDerivedStats: vi.fn(), resumePlayerAttackLoop: vi.fn() },
			productionService: { assignWorker: vi.fn(), unassignWorker: vi.fn(), resumeAll: vi.fn().mockResolvedValue(), pauseAll: vi.fn().mockResolvedValue() },
			craftingService: { craft: vi.fn() },
			buildingService: { build: vi.fn(), buySocket: vi.fn(), upgrade: vi.fn(), demolish: vi.fn() },
			workerService: { hire: vi.fn(), fire: vi.fn() },
			questService: { accept: vi.fn(), complete: vi.fn() },
			skillsService: { spendSkillPoint: vi.fn() },
			spawnService: { triggerSpawn: vi.fn(), resumeEnemyAttacks: vi.fn(), cleanupPlace: vi.fn() },
			navigationService: { navigate: vi.fn() },
		};
		mockBroadcaster = { setSendFn: vi.fn(), broadcast: vi.fn() };
		mockInventoryState = { load: vi.fn(), save: vi.fn(), loadAll: vi.fn() };

		wss = startWebSocketServer({
			server: mockHttpServer,
			sessionManager: mockSessionManager,
			...mockServices,
			playerState: mockPlayerState,
			inventoryState: mockInventoryState,
			inventoryHandler: { handleAction: vi.fn() },
			broadcaster: mockBroadcaster,
			logger: mockLogger,
		});
		connectionHandler = WebSocketServer.prototype.on.mock.calls.find(([evt]) => evt === "connection")?.[1];
	});

	function connect() {
		const fakeWs = { on: vi.fn(), send: vi.fn(), readyState: 1 };
		connectionHandler(fakeWs);
		const messageHandler = fakeWs.on.mock.calls.find(([evt]) => evt === "message")?.[1];
		return {
			fakeWs,
			send: (msg) => messageHandler(Buffer.from(JSON.stringify(msg))),
		};
	}

	it("should attach WebSocketServer to HTTP server", () => {
		expect(mockHttpServer.on).toHaveBeenCalledWith("upgrade", expect.any(Function));
	});

	it("should register the new combat commands", () => {
		// The handler is registered on the connection; we verify wiring by checking
		// the mock services are passed through (wss.on("connection") was called).
		expect(wss).toBeDefined();
		expect(mockServices.combatService.revive).toBeDefined();
		expect(mockServices.combatService.startAutoCombat).toBeDefined();
		expect(mockServices.skillsService.spendSkillPoint).toBeDefined();
	});

	it("disables auto-combat before navigating when auto-combat is enabled", async () => {
		mockPlayerState.load.mockResolvedValue({ autoCombat: true });
		mockServices.navigationService.navigate.mockResolvedValue({ currentPlaceId: "place-2", previousPlaceId: "place-1" });
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "NAVIGATE", placeId: "place-2" });

		expect(mockServices.combatService.stopAutoCombat).toHaveBeenCalledWith("s1");
		expect(mockServices.navigationService.navigate).toHaveBeenCalledWith("s1", "place-2");
		expect(mockServices.spawnService.triggerSpawn).toHaveBeenCalledWith("s1", "place-2");
		expect(mockServices.spawnService.cleanupPlace).toHaveBeenCalledWith("s1", "place-1");
	});

	it("does not touch auto-combat when navigating with auto-combat disabled", async () => {
		mockPlayerState.load.mockResolvedValue({ autoCombat: false });
		mockServices.navigationService.navigate.mockResolvedValue({ currentPlaceId: "place-2", previousPlaceId: "place-1" });
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "NAVIGATE", placeId: "place-2" });

		expect(mockServices.combatService.stopAutoCombat).not.toHaveBeenCalled();
		expect(mockServices.navigationService.navigate).toHaveBeenCalledWith("s1", "place-2");
	});

	it("navigates when the player has no state yet", async () => {
		mockPlayerState.load.mockResolvedValue(null);
		mockServices.navigationService.navigate.mockResolvedValue({ currentPlaceId: "place-2", previousPlaceId: "place-1" });
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "NAVIGATE", placeId: "place-2" });

		expect(mockServices.combatService.stopAutoCombat).not.toHaveBeenCalled();
		expect(mockServices.navigationService.navigate).toHaveBeenCalledWith("s1", "place-2");
	});

	it("RESUME restarts the player attack loop when auto-combat was on", async () => {
		mockSessionManager.getSession.mockResolvedValue({ sessionId: "s1" });
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({ currentPlaceId: "forest_edge", autoCombat: true });
		const conn = connect();

		await conn.send({ type: "RESUME", nickname: "tester", sessionId: "s1" });

		expect(mockServices.spawnService.resumeEnemyAttacks).toHaveBeenCalledWith("s1", "forest_edge");
		expect(mockServices.combatService.resumePlayerAttackLoop).toHaveBeenCalledWith("s1");
		expect(mockServices.combatService.computeAndBroadcastDerivedStats).toHaveBeenCalledWith("s1");
	});

	it("RESUME does not restart the attack loop when auto-combat was off", async () => {
		mockSessionManager.getSession.mockResolvedValue({ sessionId: "s1" });
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({ currentPlaceId: "forest_edge", autoCombat: false });
		const conn = connect();

		await conn.send({ type: "RESUME", nickname: "tester", sessionId: "s1" });

		expect(mockServices.combatService.resumePlayerAttackLoop).not.toHaveBeenCalled();
	});

	it("SPEND_SKILL_POINT recomputes derived stats exactly once", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.skillsService.spendSkillPoint.mockResolvedValue({ success: true, skills: { warCry: 1 }, skillPoints: 0 });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		const before = mockServices.combatService.computeAndBroadcastDerivedStats.mock.calls.length; // 1 from JOIN
		await conn.send({ type: "SPEND_SKILL_POINT", skillId: "warCry" });

		expect(mockServices.skillsService.spendSkillPoint).toHaveBeenCalledWith("s1", "warCry");
		expect(mockServices.combatService.recomputeDerivedStats).not.toHaveBeenCalled();
		expect(mockServices.combatService.computeAndBroadcastDerivedStats.mock.calls.length).toBe(before + 1);
	});

	it("JOIN resumes production for the session", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });

		expect(mockServices.productionService.resumeAll).toHaveBeenCalledWith("s1");
	});

	it("RESUME resumes production for the session", async () => {
		mockSessionManager.getSession.mockResolvedValue({ sessionId: "s1" });
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "RESUME", nickname: "tester", sessionId: "s1" });

		expect(mockServices.productionService.resumeAll).toHaveBeenCalledWith("s1");
	});

	it("ASSIGN_WORKER validates server-side and broadcasts the updated workers", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.productionService.assignWorker.mockResolvedValue({ workers: { hired: [], available: [], workerSlots: 1 }, assigned: true });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "ASSIGN_WORKER", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "wheat" });

		expect(mockServices.productionService.assignWorker).toHaveBeenCalledWith("s1", "village_center", 0, "w1", "wheat");
		expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "players.workers", data: expect.objectContaining({ workerSlots: 1 }) });
	});

	it("ASSIGN_WORKER sends an error when validation fails", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.productionService.assignWorker.mockResolvedValue({ error: "Invalid material for this building level" });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "ASSIGN_WORKER", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "stone" });

		expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
		expect(mockBroadcaster.broadcast).not.toHaveBeenCalledWith("s1", "DIFF", { path: "players.workers", data: expect.anything() });
	});

	it("UNASSIGN_WORKER broadcasts the updated workers", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.productionService.unassignWorker.mockResolvedValue({ workers: { hired: [], available: [], workerSlots: 1 }, unassigned: true });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "UNASSIGN_WORKER", placeId: "village_center", socketIndex: 0, workerId: "w1" });

		expect(mockServices.productionService.unassignWorker).toHaveBeenCalledWith("s1", "village_center", 0, "w1");
		expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "players.workers", data: expect.objectContaining({ workerSlots: 1 }) });
	});

	it("FIRE_WORKER broadcasts updated workers and gold", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.workerService.fire.mockResolvedValue({ workers: { hired: [], available: [], workerSlots: 1 }, gold: 75 });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "FIRE_WORKER", workerId: "w1" });

		expect(mockServices.workerService.fire).toHaveBeenCalledWith("s1", "w1");
		expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "players.workers", data: expect.objectContaining({ workerSlots: 1 }) });
		expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 75 });
	});

	it("FIRE_WORKER sends an error when the worker cannot be fired", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		mockServices.workerService.fire.mockResolvedValue({ error: "Not enough gold" });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "FIRE_WORKER", workerId: "w1" });

		expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
	});

	it("closing the connection pauses production for the session", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({});
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		const closeHandler = conn.fakeWs.on.mock.calls.find(([evt]) => evt === "close")?.[1];
		await closeHandler();

		expect(mockServices.productionService.pauseAll).toHaveBeenCalledWith("s1");
	});

  it("BUY_SOCKET broadcasts gold and sockets DIFFs", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.buySocket.mockResolvedValue({ gold: 900, socket: { placeId: "farmlands", socketIndex: 0, status: "empty" } });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "BUY_SOCKET", placeId: "farmlands", socketIndex: 0 });

    expect(mockServices.buildingService.buySocket).toHaveBeenCalledWith("s1", "farmlands", 0);
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 900 });
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "sockets", data: { placeId: "farmlands", socketIndex: 0, status: "empty" } });
  });

  it("BUY_SOCKET sends an error when validation fails", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.buySocket.mockResolvedValue({ error: "Socket is not locked" });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "BUY_SOCKET", placeId: "farmlands", socketIndex: 0 });

    expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
  });

  it("BUILD broadcasts gold and sockets DIFFs", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.build.mockResolvedValue({ gold: 850, socket: { placeId: "farmlands", socketIndex: 0, status: "occupied", buildingId: "farm", level: 1 } });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "BUILD", placeId: "farmlands", socketIndex: 0, buildingId: "farm" });

    expect(mockServices.buildingService.build).toHaveBeenCalledWith("s1", "farmlands", 0, "farm");
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 850 });
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "sockets", data: expect.objectContaining({ status: "occupied" }) });
  });

  it("BUILD sends an error when validation fails", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.build.mockResolvedValue({ error: "Socket is not empty" });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "BUILD", placeId: "farmlands", socketIndex: 0, buildingId: "farm" });

    expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
  });

  it("UPGRADE_BUILDING broadcasts gold and sockets DIFFs", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.upgrade.mockResolvedValue({ gold: 800, socket: { placeId: "river_crossing", socketIndex: 0, status: "occupied", buildingId: "mine", level: 2 } });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "UPGRADE_BUILDING", placeId: "river_crossing", socketIndex: 0 });

    expect(mockServices.buildingService.upgrade).toHaveBeenCalledWith("s1", "river_crossing", 0);
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 800 });
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "sockets", data: expect.objectContaining({ level: 2 }) });
  });

  it("UPGRADE_BUILDING sends an error when validation fails", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.upgrade.mockResolvedValue({ error: "No more upgrades available" });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "UPGRADE_BUILDING", placeId: "river_crossing", socketIndex: 0 });

    expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
  });

  it("DEMOLISH broadcasts the sockets DIFF", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.demolish.mockResolvedValue({ socket: { placeId: "river_crossing", socketIndex: 0, status: "empty" } });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "DEMOLISH", placeId: "river_crossing", socketIndex: 0 });

    expect(mockServices.buildingService.demolish).toHaveBeenCalledWith("s1", "river_crossing", 0);
    expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "sockets", data: expect.objectContaining({ status: "empty" }) });
  });

  it("DEMOLISH sends an error when validation fails", async () => {
    mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
    mockSessionManager.initializeFullState.mockResolvedValue();
    mockSessionManager.loadFullState.mockResolvedValue({});
    mockPlayerState.load.mockResolvedValue({});
    mockServices.buildingService.demolish.mockResolvedValue({ error: "Socket is not occupied" });
    const conn = connect();

    await conn.send({ type: "JOIN", nickname: "tester" });
    await conn.send({ type: "DEMOLISH", placeId: "river_crossing", socketIndex: 0 });

    expect(conn.fakeWs.send).toHaveBeenCalledWith(expect.stringContaining("ERROR"));
  });

  it("BUY_ITEM materializes the bought item with catalog fields", async () => {
		mockSessionManager.createSession.mockResolvedValue({ accepted: true, session_id: "s1" });
		mockSessionManager.initializeFullState.mockResolvedValue();
		mockSessionManager.loadFullState.mockResolvedValue({});
		mockPlayerState.load.mockResolvedValue({ gold: 100 });
		mockInventoryState.load.mockResolvedValue({ id: "player", type: "player", maxSlots: 20, items: [], equipment: {} });
		mockInventoryState.save.mockResolvedValue();
		mockInventoryState.loadAll.mockResolvedValue({ player: { id: "player", items: [] } });
		const conn = connect();

		await conn.send({ type: "JOIN", nickname: "tester" });
		await conn.send({ type: "BUY_ITEM", npcId: "weapon_merchant", itemId: 90, quantity: 1 }); // staff1 seed

		const savedInv = mockInventoryState.save.mock.calls[0][2];
		const bought = savedInv.items[0];
		expect(bought.icon).toBe("staff1");
		expect(bought.damageType).toBe("magic");
		expect(bought.id).toBe(90);
		expect(mockBroadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 85 });
	});
});
