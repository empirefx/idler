import { WebSocketServer } from "ws";
import { itemCatalog } from "../shared/data/itemCatalog.js";
import { inventoryData } from "../shared/data/inventory.js";
import { applyAddItem, applyRemoveItem, materializeItem, validateSlotLimit } from "../shared/inventory.js";
import { INVENTORY_ERRORS } from "../shared/constants.js";
import { InventoryState } from "./state/InventoryState.js";

export function startWebSocketServer({ server, sessionManager, combatService, productionService, craftingService, buildingService, workerService, questService, skillsService, spawnService, navigationService, inventoryHandler, playerState, inventoryState, broadcaster, logger }) {
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Map();

  // Wire up broadcaster to send only to the owning session's client(s)
  broadcaster.setSendFn((sessionId, payload) => {
    for (const ws of clients.values()) {
      if (ws.readyState === 1 && ws.sessionId === sessionId) ws.send(payload);
    }
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  function send(ws, payload) {
    if (ws.readyState !== 1) return;
    ws.send(JSON.stringify(payload));
  }

  async function handleBuyItem(sessionId, msg) {
    const { itemId, quantity = 1, npcId } = msg;
    const playerData = await playerState.load(sessionId);
    if (!playerData) return { success: false, message: "Player not found" };

    const npcInv = inventoryData[npcId];
    if (!npcInv || npcInv.type !== "npc") return { success: false, message: "NPC not found" };

    const stockItem = npcInv.items?.find((i) => i.id === itemId || i.id === Number(itemId));
    if (!stockItem) return { success: false, message: "Item not available" };

    const buyPrice =
      stockItem.buy?.gold ??
      (stockItem.icon ? itemCatalog[stockItem.icon]?.buy?.gold : null);

    if (buyPrice == null) {
      return { success: false, message: "This item cannot be bought" };
    }

    const totalCost = buyPrice * quantity;
    if (playerData.gold < totalCost) {
      return { success: false, message: "Not enough gold" };
    }

    const inv = await inventoryState.load(sessionId, "player");
    if (!inv) return { success: false, message: "Inventory not found" };

    const item = materializeItem({ ...stockItem, quantity });
    const slotCheck = validateSlotLimit(inv, 1);
    if (!slotCheck.isValid) {
      return { success: false, message: INVENTORY_ERRORS.INVENTORY_FULL };
    }

    applyAddItem(inv, item);
    playerData.gold -= totalCost;

    await inventoryState.save(sessionId, "player", inv);
    await playerState.save(sessionId, { gold: playerData.gold });

    const allInv = await inventoryState.loadAll(sessionId);
    broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
    broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: playerData.gold });

    return { success: true, message: `Purchased ${stockItem.name || itemId} for ${totalCost} gold` };
  }

  async function handleSellItem(sessionId, msg) {
    const { itemId, quantity = 1 } = msg;
    const playerData = await playerState.load(sessionId);
    if (!playerData) return { success: false, message: "Player not found" };

    const inv = await inventoryState.load(sessionId, "player");
    if (!inv) return { success: false, message: "Inventory not found" };
    const itemIdx = inv.items.findIndex((i) => i.id === itemId);
    if (itemIdx === -1) return { success: false, message: "Item not found in inventory" };

    const sellPrice =
      inv.items[itemIdx].sellable?.gold ??
      (inv.items[itemIdx].icon ? itemCatalog[inv.items[itemIdx].icon]?.sellable?.gold : null);

    if (sellPrice == null) {
      return { success: false, message: "This item cannot be sold" };
    }

    const itemName = inv.items[itemIdx]?.name || itemId;
    const totalValue = sellPrice * quantity;
    applyRemoveItem(inv, itemId, quantity);
    playerData.gold += totalValue;

    await inventoryState.save(sessionId, "player", inv);
    await playerState.save(sessionId, { gold: playerData.gold });

    const allInv = await inventoryState.loadAll(sessionId);
    broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
    broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: playerData.gold });

    return { success: true, message: `Sold ${itemName} for ${totalValue} gold` };
  }

  async function handleUseItem(sessionId, msg) {
    const { itemId } = msg;
    const inv = await inventoryState.load(sessionId, "player");
    if (!inv) return { success: false, message: "Inventory not found" };

    const itemIdx = inv.items.findIndex((i) => i.id === itemId || i.id === Number(itemId));
    if (itemIdx === -1) return { success: false, message: "Item not found" };

    const item = inv.items[itemIdx];
    if (item.type !== "consumable" || !item.consumable?.heal) {
      return { success: false, message: "This item cannot be used" };
    }

    const playerData = await playerState.load(sessionId);
    if (!playerData) return { success: false, message: "Player not found" };

    const healAmount = item.consumable.heal;
    const newHp = Math.min(playerData.maxHp, playerData.hp + healAmount);

    applyRemoveItem(inv, item.id, 1);
    await inventoryState.save(sessionId, "player", inv);
    await playerState.save(sessionId, { hp: newHp });

    const allInv = await inventoryState.loadAll(sessionId);
    broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
    broadcaster.broadcast(sessionId, "DIFF", { path: "player.hp", data: newHp });

    const itemName = item.name || itemId;
    return { success: true, message: `Used ${itemName}, restored ${healAmount} HP` };
  }

  wss.on("connection", (ws) => {
    let currentNickname = null;
    let currentSessionId = null;

    ws.on("message", async (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        switch (msg.type) {
          case "JOIN": {
            const result = await sessionManager.createSession(msg.nickname);
            if (result.accepted) {
              currentNickname = msg.nickname;
              currentSessionId = result.session_id;
              ws.sessionId = currentSessionId;
              clients.set(msg.nickname, ws);
              await sessionManager.initializeFullState(currentSessionId);
              const fullState = await sessionManager.loadFullState(currentSessionId);
              send(ws, { type: "STATE_SYNC", data: { sessionId: currentSessionId, ...fullState } });
              const player = await playerState.load(currentSessionId);
              if (player?.currentPlaceId) {
                await spawnService.resumeEnemyAttacks(currentSessionId, player.currentPlaceId);
              }
              await combatService.computeAndBroadcastDerivedStats(currentSessionId);
            } else {
              send(ws, { type: "ERROR", message: result.error === "NICKNAME_TAKEN" ? "Nickname already taken" : "Join failed" });
            }
            logger.log(`JOIN: ${msg.nickname} accepted=${result.accepted}`, "WS");
            break;
          }
          case "RESUME": {
            const session = await sessionManager.getSession(msg.nickname);
            if (session && session.sessionId === msg.sessionId) {
              currentNickname = msg.nickname;
              currentSessionId = msg.sessionId;
              ws.sessionId = currentSessionId;
              clients.set(msg.nickname, ws);
              await sessionManager.renewSession(msg.nickname);
              const fullState = await sessionManager.loadFullState(currentSessionId);
              send(ws, { type: "STATE_SYNC", data: { sessionId: currentSessionId, ...fullState } });
              const player = await playerState.load(currentSessionId);
              if (player?.currentPlaceId) {
                await spawnService.resumeEnemyAttacks(currentSessionId, player.currentPlaceId);
              }
              if (player?.autoCombat) {
                await combatService.resumePlayerAttackLoop(currentSessionId);
              }
              await combatService.computeAndBroadcastDerivedStats(currentSessionId);
              logger.log(`RESUME: ${msg.nickname} session restored`, "WS");
            } else {
              send(ws, { type: "ERROR", message: "Session expired" });
              logger.log(`RESUME: ${msg.nickname} session not found`, "WS");
            }
            break;
          }
          case "TOGGLE_AUTO_COMBAT": {
            const player = await playerState.load(currentSessionId);
            const result = player?.autoCombat
              ? await combatService.stopAutoCombat(currentSessionId)
              : await combatService.startAutoCombat(currentSessionId);
            if (result.error) {
              send(ws, { type: "ERROR", message: result.error });
            }
            break;
          }
          case "REVIVE": {
            const result = await combatService.revive(currentSessionId);
            if (result.error) {
              send(ws, { type: "ERROR", message: result.error });
            }
            break;
          }
          case "SPEND_SKILL_POINT": {
            const result = await skillsService.spendSkillPoint(currentSessionId, msg.skillId);
            if (result.error) {
              send(ws, { type: "ERROR", message: result.error });
            } else {
              await combatService.computeAndBroadcastDerivedStats(currentSessionId);
            }
            break;
          }
          case "LEVEL_UP": {
            const result = await combatService.levelUp(currentSessionId, msg.bonuses || {});
            if (result.error) {
              send(ws, { type: "ERROR", message: result.error });
            }
            break;
          }
          case "NAVIGATE": {
            const player = await playerState.load(currentSessionId);
            if (player?.autoCombat) {
              await combatService.stopAutoCombat(currentSessionId);
            }
            const result = await navigationService.navigate(currentSessionId, msg.placeId);
            await spawnService.cleanupPlace(currentSessionId, result.previousPlaceId);
            send(ws, { type: "DIFF", data: { path: "player.currentPlaceId", value: msg.placeId } });
            await spawnService.triggerSpawn(currentSessionId, msg.placeId);
            break;
          }
          case "BUILD": {
            const result = await buildingService.build(currentSessionId, msg.placeId, msg.socketIndex, msg.buildingId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "ASSIGN_WORKER": {
            const result = await productionService.assignWorker(currentSessionId, msg.placeId, msg.socketIndex, msg.worker, msg.building);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "UNASSIGN_WORKER": {
            const result = await productionService.unassignWorker(currentSessionId, msg.placeId, msg.socketIndex);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "CRAFT": {
            const result = await craftingService.craft(currentSessionId, msg.recipeId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "HIRE_WORKER": {
            const result = await workerService.hire(currentSessionId, msg.workerId);
            if (result.error) {
              send(ws, { type: "ERROR", message: result.error });
            } else {
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "players.workers", data: result.workers });
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "player.gold", data: result.gold });
            }
            break;
          }
          case "REROLL_WORKERS": {
            const rerollResult = await workerService.reroll(currentSessionId);
            if (rerollResult.error) {
              send(ws, { type: "ERROR", message: rerollResult.error });
            } else {
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "players.workers", data: rerollResult.workers });
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "player.gold", data: rerollResult.gold });
            }
            break;
          }
          case "BUY_WORKER_SLOT": {
            const slotResult = await workerService.buySlot(currentSessionId);
            if (slotResult.error) {
              send(ws, { type: "ERROR", message: slotResult.error });
            } else {
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "players.workers", data: slotResult.workers });
              broadcaster.broadcast(currentSessionId, "DIFF", { path: "player.gold", data: slotResult.gold });
            }
            break;
          }
          case "BUY_ITEM": {
            const buyData = await handleBuyItem(currentSessionId, msg);
            send(ws, { type: "TRADE_RESULT", data: buyData });
            break;
          }
          case "SELL_ITEM": {
            const sellData = await handleSellItem(currentSessionId, msg);
            send(ws, { type: "TRADE_RESULT", data: sellData });
            break;
          }
          case "ACCEPT_QUEST": {
            const result = await questService.accept(currentSessionId, msg.questId);
            send(ws, { type: "QUEST_UPDATE", data: result });
            break;
          }
          case "COMPLETE_QUEST": {
            const result = await questService.complete(currentSessionId, msg.questId);
            send(ws, { type: "QUEST_UPDATE", data: result });
            break;
          }
          case "MOVE_ITEM": {
            const result = await inventoryHandler.handleAction(currentSessionId, {
              action_type: "MOVE",
              inventory_id: msg.fromInventoryId,
              to_inventory_id: msg.toInventoryId,
              item_id: msg.itemId,
              quantity: msg.quantity,
            });
            if (result.success) {
              send(ws, { type: "INVENTORY_UPDATE", data: { inventories: result.inventories } });
            } else {
              send(ws, { type: "ERROR", message: "Failed to move item" });
            }
            break;
          }
          case "EQUIP_ITEM": {
            const result = await inventoryHandler.handleAction(currentSessionId, {
              action_type: "EQUIP",
              inventory_id: msg.inventoryId,
              item_id: msg.itemId,
            });
            if (result.success) {
              send(ws, { type: "INVENTORY_UPDATE", data: { inventories: result.inventories } });
              await combatService.recomputeDerivedStats(currentSessionId);
              await combatService.computeAndBroadcastDerivedStats(currentSessionId);
            } else {
              send(ws, { type: "ERROR", message: "Failed to equip item" });
            }
            break;
          }
          case "UNEQUIP_ITEM": {
            const result = await inventoryHandler.handleAction(currentSessionId, {
              action_type: "UNEQUIP",
              inventory_id: msg.inventoryId,
              slot: msg.slot,
            });
            if (result.success) {
              send(ws, { type: "INVENTORY_UPDATE", data: { inventories: result.inventories } });
              await combatService.recomputeDerivedStats(currentSessionId);
              await combatService.computeAndBroadcastDerivedStats(currentSessionId);
            } else {
              send(ws, { type: "ERROR", message: "Failed to unequip item" });
            }
            break;
          }
          case "USE_ITEM": {
            const useData = await handleUseItem(currentSessionId, msg);
            send(ws, { type: useData.success ? "USE_RESULT" : "ERROR", data: useData });
            break;
          }
          default:
            logger.warn(`Unknown message type: ${msg.type}`);
        }
      } catch (err) {
        logger.error(`Message handling error: ${err.message}`);
        send(ws, { type: "ERROR", message: err.message });
      }
    });

    ws.on("close", async () => {
      if (currentNickname) {
        clients.delete(currentNickname);
        await sessionManager.disconnectSession(currentNickname);
        logger.log(`DISCONNECT: ${currentNickname}`, "WS");
      }
    });
  });

  return wss;
}
