import {
	GameMessage, ErrorResponse, Stats, DerivedStats, Buff, Buffs, Cooldowns, SkillsRanks,
	Player, Item, Inventory, Building, Socket, Enemy, Assignment, Worker, Workers,
	QuestEntry, CompletedQuest, Quests, Rewards,
	JoinRequest, ResumeRequest, ToggleAutoCombat, ReviveRequest, SpendSkillPoint, SetTargetRequest,
	LevelUpRequest, NavigateRequest, BuySocket, BuildRequest, UpgradeBuilding, Demolish,
	AssignWorker, UnassignWorker, FireWorker, CraftRequest, HireWorker, RerollWorkers,
	BuyWorkerSlot, BuyItem, SellItem, AcceptQuest, CompleteQuest, MoveItem, EquipItem,
	UnequipItem, UseItemRequest, StateSync, Diff, PlayerStats, CombatDiff, EnemyAttack,
	EnemySpawn, ProductionTick, QuestUpdate, InventoryUpdate, Notification, TradeResult, UseResult,
	PresenceUpdate, PokeRequest, Poked, PokeAck,
} from "../proto/game.mjs";

export const PROTOCOL_VERSION = 1;

const toObjectOpts = { defaults: true, longs: Number, enums: String };

function sanitizeInventory(inv) {
	if (!inv || typeof inv !== "object") return inv;
	const equipment = inv.equipment;
	if (!equipment || typeof equipment !== "object") return inv;
	const clean = {};
	for (const [slot, item] of Object.entries(equipment)) {
		if (item != null) clean[slot] = item;
	}
	return { ...inv, equipment: clean };
}

function sanitizeInventoriesMap(map) {
	if (!map || typeof map !== "object") return map;
	const clean = {};
	for (const [key, inv] of Object.entries(map)) {
		clean[key] = sanitizeInventory(inv);
	}
	return clean;
}

function normalizeWorkers(workers) {
	if (!workers || typeof workers !== "object") return workers;
	for (const key of ["hired", "available"]) {
		if (Array.isArray(workers[key])) {
			workers[key] = workers[key].map((w) => {
				if (w && !w.assignment) w.assignment = null;
				return w;
			});
		}
	}
	return workers;
}

function simple(Message, { encode: encodeFn, decode: decodeFn } = {}) {
	return {
		encode: (p) => (encodeFn ? encodeFn(p) : Message.encode(p).finish()),
		decode: (b) => (decodeFn ? decodeFn(b) : Message.toObject(Message.decode(b), toObjectOpts)),
	};
}

const encodeWithStringItemId = (Message) => (p) =>
	Message.encode({ ...p, itemId: p.itemId == null ? p.itemId : String(p.itemId) }).finish();

const encodeInventory = (p) => Inventory.encode(sanitizeInventory(p)).finish();
const encodeStateSync = (p) => StateSync.encode({ ...p, inventory: sanitizeInventoriesMap(p?.inventory) }).finish();
const encodeInventoryUpdate = (p) => InventoryUpdate.encode({ ...p, inventories: sanitizeInventoriesMap(p?.inventories) }).finish();
const decodeStateSync = (b) => {
	const obj = StateSync.toObject(StateSync.decode(b), toObjectOpts);
	obj.workers = normalizeWorkers(obj.workers);
	return obj;
};
const decodeWorkers = (b) => normalizeWorkers(Workers.toObject(Workers.decode(b), toObjectOpts));

function encodeDiff(payload) {
	const value = payload.data !== undefined ? payload.data : payload.value;
	const diff = { path: payload.path };
	if (value === undefined || value === null) return Diff.encode(diff).finish();
	if (typeof value === "number") {
		diff[Number.isInteger(value) ? "intValue" : "doubleValue"] = value;
	} else if (typeof value === "boolean") {
		diff.boolValue = value;
	} else if (typeof value === "string") {
		diff.stringValue = value;
	} else if (typeof value === "object") {
		const path = payload.path;
		if (path === "sockets") diff.socket = value;
		else if (path.startsWith("players.")) diff.workers = value;
		else if (path === "inventory.player") diff.inventory = sanitizeInventory(value);
		else if (path.endsWith(".stats")) diff.stats = value;
		else if (path.endsWith(".derivedStats")) diff.derivedStats = value;
		else if (path.endsWith(".skills")) diff.skills = { ranks: value };
		else if (path.endsWith(".activeBuffs")) diff.activeBuffs = { buffs: value };
		else if (path.endsWith(".activeCooldowns")) diff.activeCooldowns = { cooldowns: value };
		else if (path.endsWith(".pausedCooldowns")) diff.pausedCooldowns = { cooldowns: value };
		else throw new Error(`Unsupported DIFF value shape for path: ${path}`);
	}
	return Diff.encode(diff).finish();
}

function decodeDiff(buffer) {
	const m = Diff.toObject(Diff.decode(buffer), toObjectOpts);
	let data;
	if (m.intValue !== undefined) data = m.intValue;
	else if (m.doubleValue !== undefined) data = m.doubleValue;
	else if (m.boolValue !== undefined) data = m.boolValue;
	else if (m.stringValue !== undefined) data = m.stringValue;
	else if (m.stats) data = m.stats;
	else if (m.derivedStats) data = m.derivedStats;
	else if (m.skills) data = m.skills.ranks;
	else if (m.activeBuffs) data = m.activeBuffs.buffs;
	else if (m.activeCooldowns) data = m.activeCooldowns.cooldowns;
	else if (m.pausedCooldowns) data = m.pausedCooldowns.cooldowns;
	else if (m.inventory) data = m.inventory;
	else if (m.workers) data = normalizeWorkers(m.workers);
	else if (m.socket) data = m.socket;
	else if (m.questEntry) data = m.questEntry;
	return { path: m.path, data };
}

const codecs = {
	// client -> server
	JOIN: simple(JoinRequest),
	RESUME: simple(ResumeRequest),
	TOGGLE_AUTO_COMBAT: simple(ToggleAutoCombat),
	SET_TARGET: simple(SetTargetRequest),
	REVIVE: simple(ReviveRequest),
	SPEND_SKILL_POINT: simple(SpendSkillPoint),
	LEVEL_UP: simple(LevelUpRequest),
	NAVIGATE: simple(NavigateRequest),
	BUY_SOCKET: simple(BuySocket),
	BUILD: simple(BuildRequest),
	UPGRADE_BUILDING: simple(UpgradeBuilding),
	DEMOLISH: simple(Demolish),
	ASSIGN_WORKER: simple(AssignWorker),
	UNASSIGN_WORKER: simple(UnassignWorker),
	FIRE_WORKER: simple(FireWorker),
	CRAFT: simple(CraftRequest),
	HIRE_WORKER: simple(HireWorker),
	REROLL_WORKERS: simple(RerollWorkers),
	BUY_WORKER_SLOT: simple(BuyWorkerSlot),
	BUY_ITEM: simple(BuyItem, { encode: encodeWithStringItemId(BuyItem) }),
	SELL_ITEM: simple(SellItem, { encode: encodeWithStringItemId(SellItem) }),
	ACCEPT_QUEST: simple(AcceptQuest),
	COMPLETE_QUEST: simple(CompleteQuest),
	MOVE_ITEM: simple(MoveItem, { encode: encodeWithStringItemId(MoveItem) }),
	EQUIP_ITEM: simple(EquipItem, { encode: encodeWithStringItemId(EquipItem) }),
	UNEQUIP_ITEM: simple(UnequipItem),
	USE_ITEM: simple(UseItemRequest, { encode: encodeWithStringItemId(UseItemRequest) }),
	POKE: simple(PokeRequest),
	// server -> client
	STATE_SYNC: { encode: encodeStateSync, decode: decodeStateSync },
	DIFF: { encode: encodeDiff, decode: decodeDiff },
	COMBAT_DIFF: simple(CombatDiff),
	ENEMY_ATTACK: simple(EnemyAttack),
	ENEMY_SPAWN: simple(EnemySpawn),
	INVENTORY_UPDATE: { encode: encodeInventoryUpdate, decode: simple(InventoryUpdate).decode },
	PRODUCTION_TICK: simple(ProductionTick),
	QUEST_UPDATE: simple(QuestUpdate),
	NOTIFICATION: simple(Notification),
	TRADE_RESULT: simple(TradeResult),
	USE_RESULT: simple(UseResult),
	PRESENCE_UPDATE: simple(PresenceUpdate),
	POKED: simple(Poked),
	POKE_ACK: simple(PokeAck),
	ERROR: simple(ErrorResponse),
};

export const CLIENT_MESSAGES = Object.freeze([
	"JOIN", "RESUME", "TOGGLE_AUTO_COMBAT", "SET_TARGET", "REVIVE", "SPEND_SKILL_POINT", "LEVEL_UP", "NAVIGATE",
	"BUY_SOCKET", "BUILD", "UPGRADE_BUILDING", "DEMOLISH", "ASSIGN_WORKER", "UNASSIGN_WORKER",
	"FIRE_WORKER", "CRAFT", "HIRE_WORKER", "REROLL_WORKERS", "BUY_WORKER_SLOT", "BUY_ITEM",
	"SELL_ITEM", "ACCEPT_QUEST", "COMPLETE_QUEST", "MOVE_ITEM", "EQUIP_ITEM", "UNEQUIP_ITEM", "USE_ITEM",
	"POKE",
]);

export const SERVER_MESSAGES = Object.freeze([
	"STATE_SYNC", "DIFF", "COMBAT_DIFF", "ENEMY_ATTACK", "ENEMY_SPAWN", "INVENTORY_UPDATE",
	"PRODUCTION_TICK", "QUEST_UPDATE", "NOTIFICATION", "TRADE_RESULT", "USE_RESULT", "ERROR",
	"PRESENCE_UPDATE", "POKED", "POKE_ACK",
]);

export function encode(type, payload = {}) {
	const codec = codecs[type];
	if (!codec) throw new Error(`Unknown message type: ${type}`);
	return GameMessage.encode({ type, payload: codec.encode(payload) }).finish();
}

export function decode(buffer) {
	const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
	const gm = GameMessage.decode(data);
	const codec = codecs[gm.type];
	return { type: gm.type, data: codec ? codec.decode(gm.payload) : undefined };
}
