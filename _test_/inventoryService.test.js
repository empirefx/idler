import { describe, it, expect, vi } from "vitest";
import { InventoryService } from "../src/game/services/InventoryService";

describe("InventoryService", () => {
	it("getInventory returns correct inventory or undefined", () => {
		const state = { inventory: { p1: { items: [] } } };
		expect(InventoryService.getInventory(state, "p1")).toEqual({
			items: [],
		});
		expect(
			InventoryService.getInventory(state, "unknown"),
		).toBeUndefined();
	});

	it("addItemToInventory dispatches correct action", () => {
		const store = {
			dispatch: vi.fn(),
			getState: () => ({
				inventory: { p1: { items: [], maxSlots: 20, maxWeight: 100, type: "place" } },
			}),
		};
		const item = { id: 1 };
		InventoryService.addItemToInventory(store, "p1", item);
		expect(store.dispatch).toHaveBeenCalledWith({
			type: "inventory/addItem",
			payload: { inventoryId: "p1", item },
		});
	});
});
