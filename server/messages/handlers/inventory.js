// server/messages/handlers/inventory.js
export const inventoryHandlers = [
  {
    type: "MOVE_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, inventoryHandler } = ctx;
      const result = await inventoryHandler.handleAction(sessionId, {
        action_type: "MOVE",
        inventory_id: msg.fromInventoryId,
        to_inventory_id: msg.toInventoryId,
        item_id: msg.itemId,
        quantity: msg.quantity,
      });
      if (result.success) {
        send(ws, "INVENTORY_UPDATE", { inventories: result.inventories });
      } else {
        send(ws, "ERROR", { message: "Failed to move item" });
      }
    },
  },
  {
    type: "EQUIP_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, inventoryHandler, combatService } = ctx;
      const result = await inventoryHandler.handleAction(sessionId, {
        action_type: "EQUIP",
        inventory_id: msg.inventoryId,
        item_id: msg.itemId,
      });
      if (result.success) {
        send(ws, "INVENTORY_UPDATE", { inventories: result.inventories });
        await combatService.recomputeDerivedStats(sessionId);
        await combatService.computeAndBroadcastDerivedStats(sessionId);
      } else {
        send(ws, "ERROR", { message: "Failed to equip item" });
      }
    },
  },
  {
    type: "UNEQUIP_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, inventoryHandler, combatService } = ctx;
      const result = await inventoryHandler.handleAction(sessionId, {
        action_type: "UNEQUIP",
        inventory_id: msg.inventoryId,
        slot: msg.slot,
      });
      if (result.success) {
        send(ws, "INVENTORY_UPDATE", { inventories: result.inventories });
        await combatService.recomputeDerivedStats(sessionId);
        await combatService.computeAndBroadcastDerivedStats(sessionId);
      } else {
        send(ws, "ERROR", { message: "Failed to unequip item" });
      }
    },
  },
];
