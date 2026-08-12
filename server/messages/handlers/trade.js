// server/messages/handlers/trade.js
import { itemCatalog } from "../../../shared/data/itemCatalog.js";
import { inventoryData } from "../../../shared/data/inventory.js";
import { applyAddItem, applyRemoveItem, materializeItem, validateSlotLimit } from "../../../shared/inventory.js";
import { INVENTORY_ERRORS } from "../../../shared/constants.js";

export const tradeHandlers = [
  {
    type: "BUY_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, inventoryState, broadcaster } = ctx;
      const { itemId, quantity = 1, npcId } = msg;
      const playerData = await playerState.load(sessionId);
      if (!playerData) { send(ws, "TRADE_RESULT", { success: false, message: "Player not found" }); return; }

      const npcInv = inventoryData[npcId];
      if (!npcInv || npcInv.type !== "npc") { send(ws, "TRADE_RESULT", { success: false, message: "NPC not found" }); return; }

      const stockItem = npcInv.items?.find((i) => i.id === itemId || i.id === Number(itemId));
      if (!stockItem) { send(ws, "TRADE_RESULT", { success: false, message: "Item not available" }); return; }

      const buyPrice =
        stockItem.buy?.gold ??
        (stockItem.icon ? itemCatalog[stockItem.icon]?.buy?.gold : null);

      if (buyPrice == null) { send(ws, "TRADE_RESULT", { success: false, message: "This item cannot be bought" }); return; }

      const totalCost = buyPrice * quantity;
      if (playerData.gold < totalCost) { send(ws, "TRADE_RESULT", { success: false, message: "Not enough gold" }); return; }

      const inv = await inventoryState.load(sessionId, "player");
      if (!inv) { send(ws, "TRADE_RESULT", { success: false, message: "Inventory not found" }); return; }

      const item = materializeItem({ ...stockItem, quantity });
      const slotCheck = validateSlotLimit(inv, 1);
      if (!slotCheck.isValid) { send(ws, "TRADE_RESULT", { success: false, message: INVENTORY_ERRORS.INVENTORY_FULL }); return; }

      applyAddItem(inv, item);
      playerData.gold -= totalCost;

      await inventoryState.save(sessionId, "player", inv);
      await playerState.save(sessionId, { gold: playerData.gold });

      const allInv = await inventoryState.loadAll(sessionId);
      broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
      broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: playerData.gold });

      send(ws, "TRADE_RESULT", { success: true, message: `Purchased ${stockItem.name || itemId} for ${totalCost} gold` });
    },
  },
  {
    type: "SELL_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, inventoryState, broadcaster } = ctx;
      const { itemId, quantity = 1 } = msg;
      const playerData = await playerState.load(sessionId);
      if (!playerData) { send(ws, "TRADE_RESULT", { success: false, message: "Player not found" }); return; }

      const inv = await inventoryState.load(sessionId, "player");
      if (!inv) { send(ws, "TRADE_RESULT", { success: false, message: "Inventory not found" }); return; }
      const itemIdx = inv.items.findIndex((i) => i.id === itemId || i.id === Number(itemId));
      if (itemIdx === -1) { send(ws, "TRADE_RESULT", { success: false, message: "Item not found in inventory" }); return; }

      const sellPrice =
        inv.items[itemIdx].sellable?.gold ??
        (inv.items[itemIdx].icon ? itemCatalog[inv.items[itemIdx].icon]?.sellable?.gold : null);

      if (sellPrice == null) { send(ws, "TRADE_RESULT", { success: false, message: "This item cannot be sold" }); return; }

      const itemName = inv.items[itemIdx]?.name || itemId;
      const totalValue = sellPrice * quantity;
      applyRemoveItem(inv, itemId, quantity);
      playerData.gold += totalValue;

      await inventoryState.save(sessionId, "player", inv);
      await playerState.save(sessionId, { gold: playerData.gold });

      const allInv = await inventoryState.loadAll(sessionId);
      broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
      broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: playerData.gold });

      send(ws, "TRADE_RESULT", { success: true, message: `Sold ${itemName} for ${totalValue} gold` });
    },
  },
  {
    type: "USE_ITEM",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, inventoryState, broadcaster } = ctx;
      const { itemId } = msg;
      const inv = await inventoryState.load(sessionId, "player");
      if (!inv) { send(ws, "ERROR", { message: "Inventory not found" }); return; }

      const itemIdx = inv.items.findIndex((i) => i.id === itemId || i.id === Number(itemId));
      if (itemIdx === -1) { send(ws, "ERROR", { message: "Item not found" }); return; }

      const item = inv.items[itemIdx];
      if (item.type !== "consumable" || !item.consumable?.heal) {
        send(ws, "ERROR", { message: "This item cannot be used" });
        return;
      }

      const playerData = await playerState.load(sessionId);
      if (!playerData) { send(ws, "ERROR", { message: "Player not found" }); return; }

      const healAmount = item.consumable.heal;
      const newHp = Math.min(playerData.maxHp, playerData.hp + healAmount);

      applyRemoveItem(inv, item.id, 1);
      await inventoryState.save(sessionId, "player", inv);
      await playerState.save(sessionId, { hp: newHp });

      const allInv = await inventoryState.loadAll(sessionId);
      broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
      broadcaster.broadcast(sessionId, "DIFF", { path: "player.hp", data: newHp });

      const itemName = item.name || itemId;
      send(ws, "USE_RESULT", { success: true, message: `Used ${itemName}, restored ${healAmount} HP` });
    },
  },
];
