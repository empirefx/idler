let ws = null;
export function setWs(newWs) { ws = newWs; }
export function getWs() { return ws; }

export function sendWsMessage(msg) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(msg));
	}
}

export function moveItem(fromInventoryId, toInventoryId, itemId, quantity) {
	sendWsMessage({ type: "MOVE_ITEM", fromInventoryId, toInventoryId, itemId, quantity });
}

export function equipItem(inventoryId, itemId) {
	sendWsMessage({ type: "EQUIP_ITEM", inventoryId, itemId });
}

export function unequipItem(inventoryId, slot) {
	sendWsMessage({ type: "UNEQUIP_ITEM", inventoryId, slot });
}

export function useItem(itemId) {
	sendWsMessage({ type: "USE_ITEM", itemId });
}

export function toggleAutoCombat() {
	sendWsMessage({ type: "TOGGLE_AUTO_COMBAT" });
}

export function revive() {
	sendWsMessage({ type: "REVIVE" });
}

export function spendSkillPoint(skillId) {
	sendWsMessage({ type: "SPEND_SKILL_POINT", skillId });
}

export function levelUp(bonuses) {
	sendWsMessage({ type: "LEVEL_UP", bonuses });
}
