import { describe, it, expect, vi, beforeEach } from "vitest";
import { InventoryHandler } from "../../server/inventory.js";
import { INVENTORY_ERRORS } from "../../shared/constants.js";

describe("InventoryHandler", () => {
	let mockRedis;
	let mockLogger;
	let handler;

	beforeEach(() => {
		mockRedis = {
			hget: vi.fn(),
			hset: vi.fn(),
			hdel: vi.fn(),
		};
		mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
		handler = new InventoryHandler(mockRedis, mockLogger);
	});

	const playerInventory = () => ({
		id: "player",
		type: "player",
		maxSlots: 20,
		maxWeight: 100,
		items: [{ id: "item_1", type: "consumable", name: "apple", quantity: 5, weight: 0.5, stats: null, consumable: { heal: 10 } }],
		equipment: {},
	});

	it("should reject action for non-existent session", async () => {
		mockRedis.hget.mockResolvedValue(null);
		const result = await handler.handleAction("session:missing", { action_type: "ADD" });
		expect(result.success).toBe(false);
		expect(result.error).toBe(INVENTORY_ERRORS.SESSION_NOT_FOUND);
	});

	it("should handle ADD action successfully", async () => {
		const inv = playerInventory();
		mockRedis.hget.mockResolvedValue(inv);
		mockRedis.hset.mockResolvedValue(undefined);

		const result = await handler.handleAction("session:abc", {
			action_type: "ADD",
			inventory_id: "player",
			item: { id: "new_item", type: "material", name: "wood", quantity: 3, weight: 2 },
		});
		expect(result.success).toBe(true);
		expect(result.diff.action).toBe("ADD");
	});

	it("should handle REMOVE action", async () => {
		const inv = playerInventory();
		mockRedis.hget.mockResolvedValue(inv);

		const result = await handler.handleAction("session:abc", {
			action_type: "REMOVE",
			inventory_id: "player",
			item_id: "item_1",
			quantity: 2,
		});
		expect(result.success).toBe(true);
		expect(inv.items[0].quantity).toBe(3);
	});

	it("should reject REMOVE with insufficient quantity", async () => {
		const inv = playerInventory();
		mockRedis.hget.mockResolvedValue(inv);

		const result = await handler.handleAction("session:abc", {
			action_type: "REMOVE",
			inventory_id: "player",
			item_id: "item_1",
			quantity: 99,
		});
		expect(result.success).toBe(false);
		expect(result.error).toBe(INVENTORY_ERRORS.INVALID_QUANTITY);
	});

	it("should handle MOVE between inventories", async () => {
		const from = playerInventory();
		const to = { id: "vault_1", type: "place", maxSlots: 30, items: [], equipment: {} };
		mockRedis.hget.mockImplementation((key, field) => {
			if (field === "player") return Promise.resolve(from);
			if (field === "vault_1") return Promise.resolve(to);
			return Promise.resolve(null);
		});

		const result = await handler.handleAction("session:abc", {
			action_type: "MOVE",
			inventory_id: "player",
			to_inventory_id: "vault_1",
			item_id: "item_1",
			quantity: 3,
		});
		expect(result.success).toBe(true);
		expect(from.items[0].quantity).toBe(2);
	});

	it("should handle EQUIP action", async () => {
		const inv = playerInventory();
		inv.items.push({ id: "helm_1", type: "head", name: "Helm", weight: 2, quantity: 1, stats: { defense: 2 }, consumable: null });
		mockRedis.hget.mockResolvedValue(inv);

		const result = await handler.handleAction("session:abc", {
			action_type: "EQUIP",
			inventory_id: "player",
			item_id: "helm_1",
		});
		expect(result.success).toBe(true);
		expect(inv.equipment.head).toBeTruthy();
	});

	it("should handle UNEQUIP action", async () => {
		const inv = playerInventory();
		inv.equipment = { head: { id: "helm_1", type: "head", name: "Helm", weight: 2, quantity: 1 } };
		mockRedis.hget.mockResolvedValue(inv);

		const result = await handler.handleAction("session:abc", {
			action_type: "UNEQUIP",
			inventory_id: "player",
			slot: "head",
		});
		expect(result.success).toBe(true);
		expect(inv.equipment.head).toBeNull();
	});
});
