import Logger from "../utils/Logger";
import { checkQuestEligibility } from "../utils/questValidators";
import {
	questAccepted,
	questProgressUpdated,
	questCompleted,
} from "../../store/slices/questSlice";
import { addGold, gainExp } from "../../store/slices/playerSlice";
import {
	addItem as addPlayerItem,
	removeItem as removePlayerItem,
} from "../../store/slices/inventorySlice";
import {
	addNotification,
	NOTIFICATION_TYPES,
} from "../../store/slices/notificationSlice";
import { questCatalog } from "../../data/questCatalog";
import { itemCatalog } from "../../data/itemCatalog";

class Gameplay {
	constructor(store, dispatch) {
		this.store = store;
		this.dispatch = dispatch;
		this.questHandlers = {
			kill: this.handleKillObjective.bind(this),
		};
	}

	handleQuestAcceptIntent({ questId, npcId }) {
		if (!questId) {
			Logger.warn("Quest accept intent missing questId", 0, "gameplay");
			return { success: false, reasonCode: "MISSING_QUEST_ID" };
		}

		const state = this.store.getState();
		const eligibility = checkQuestEligibility(state, questId, npcId);

		if (!eligibility.canAccept) {
			if (eligibility.message) {
				this.dispatch(
					addNotification(eligibility.message, NOTIFICATION_TYPES.WARNING),
				);
			}

			Logger.log(
				`Quest accept blocked: ${questId} (${eligibility.reasonCode})`,
				0,
				"gameplay",
			);

			return { success: false, reasonCode: eligibility.reasonCode };
		}

		// Accept quest
		this.dispatch(questAccepted(questId));

		if (eligibility.message) {
			this.dispatch(
				addNotification(eligibility.message, NOTIFICATION_TYPES.SUCCESS),
			);
		}

		Logger.log(`Quest accepted: ${questId}`, 0, "gameplay");

		return { success: true, reasonCode: null };
	}

	// Quest helper methods
	getActiveQuests() {
		return this.store.getState().quests?.activeById || {};
	}

	getItemCount(icon) {
		const inventory = this.store.getState().inventory?.player;
		if (!inventory?.items) return 0;

		return inventory.items.reduce((total, item) => {
			if (item.icon === icon) {
				return total + (item.quantity || 1);
			}
			return total;
		}, 0);
	}

	showNotification(message, type = NOTIFICATION_TYPES.INFO) {
		this.dispatch(addNotification(message, type));
	}

	updateQuestProgress(questId, progressKey, increment, required) {
		const currentProgress =
			this.getActiveQuests()[questId]?.progress?.[progressKey] || 0;
		const newProgress = currentProgress + increment;

		this.dispatch(
			questProgressUpdated({
				questId,
				progressKey,
				value: newProgress,
			}),
		);

		Logger.log(
			`Quest progress updated: ${questId} - ${progressKey}: ${newProgress}/${required}`,
			0,
			"gameplay",
		);

		return newProgress;
	}

	isQuestReadyToComplete(questId) {
		const quest = questCatalog[questId];
		if (!quest?.objectives) return false;

		const questProgress = this.getActiveQuests()[questId]?.progress || {};

		return Object.values(quest.objectives).every((objective) => {
			if (objective.type === "collect") {
				const inventoryCount = this.getItemCount(objective.target);
				return inventoryCount >= objective.required;
			}
			const currentProgress = questProgress[objective.progressKey] || 0;
			return currentProgress >= objective.required;
		});
	}

	checkQuestCompletion(questId) {
		const quest = questCatalog[questId];
		if (!quest?.objectives) return false;

		const questProgress = this.getActiveQuests()[questId]?.progress || {};
		const allObjectivesComplete = Object.values(quest.objectives).every(
			(objective) => {
				const currentProgress = questProgress[objective.progressKey] || 0;
				return currentProgress >= objective.required;
			},
		);

		// Don't auto-complete - just notify it's ready
		if (allObjectivesComplete) {
			this.dispatch(
				addNotification(
					`Quest ready to complete: ${quest.title} - Return to ${quest.giverNpcId}`,
					NOTIFICATION_TYPES.INFO,
				),
			);
			return true;
		}
		return false;
	}

	// Quest handlers
	handleKillObjective({ questId, objective, enemyId, enemy }) {
		const isMatch =
			objective.target === "any" ||
			objective.target === enemyId ||
			objective.target === enemy.type;

		if (!isMatch) return;

		const newProgress = this.updateQuestProgress(
			questId,
			objective.progressKey,
			1,
			objective.required,
		);

		if (newProgress >= objective.required) {
			this.checkQuestCompletion(questId);
		}
	}

	processQuestsByType(type, eventData) {
		const activeQuests = this.getActiveQuests();

		Object.entries(activeQuests).forEach(([questId, questState]) => {
			const quest = questCatalog[questId];
			if (!quest?.objectives) return;

			Object.entries(quest.objectives).forEach(([objectiveKey, objective]) => {
				if (objective.type === type) {
					this.questHandlers[type]?.({
						questId,
						objective,
						...eventData,
					});
				}
			});
		});
	}

	distributeQuestRewards(quest) {
		if (!quest?.rewards) return;

		const rewardMessages = [];

		// Distribute gold
		if (quest.rewards.gold) {
			this.dispatch(addGold(quest.rewards.gold));
			rewardMessages.push(`${quest.rewards.gold} gold`);
		}

		// Distribute exp
		if (quest.rewards.exp) {
			this.dispatch(gainExp({ amount: quest.rewards.exp }));
			rewardMessages.push(`${quest.rewards.exp} exp`);
		}

		// Distribute items
		if (quest.rewards.items && Array.isArray(quest.rewards.items)) {
			quest.rewards.items.forEach((itemReward) => {
				const itemData = itemCatalog[itemReward.icon];
				if (itemData) {
					const newItem = {
						...itemData,
						icon: itemReward.icon,
						quantity: itemReward.quantity || 1,
					};
					this.dispatch(
						addPlayerItem({ inventoryId: "player", item: newItem }),
					);
					rewardMessages.push(`${itemReward.quantity || 1}x ${itemData.name}`);
				}
			});
		}

		return rewardMessages;
	}

	completeQuestAtNpc(questId) {
		const quest = questCatalog[questId];
		if (!quest) return { success: false, reason: "QUEST_NOT_FOUND" };

		// Check if already completed
		const state = this.store.getState();
		if (state.quests.completedQuests?.[questId]) {
			return { success: false, reason: "QUEST_ALREADY_COMPLETED" };
		}

		// Check if ready to complete
		if (!this.isQuestReadyToComplete(questId)) {
			return { success: false, reason: "QUEST_NOT_READY" };
		}

		// Consume collected items for collect quests
		if (quest.objectives) {
			Object.values(quest.objectives).forEach((objective) => {
				if (objective.type === "collect") {
					const inventory = state.inventory?.player;
					if (inventory?.items) {
						let itemsToRemove = objective.required;
						[...inventory.items].forEach((item) => {
							if (itemsToRemove <= 0) return;
							if (item.icon === objective.target) {
								const stackQty = item.quantity || 1;
								if (stackQty > itemsToRemove) {
									this.dispatch(
										removePlayerItem({
											inventoryId: "player",
											itemId: item.id,
											quantity: itemsToRemove,
										}),
									);
									itemsToRemove = 0;
								} else {
									this.dispatch(
										removePlayerItem({
											inventoryId: "player",
											itemId: item.id,
											quantity: stackQty,
										}),
									);
									itemsToRemove -= stackQty;
								}
							}
						});
					}
				}
			});
		}

		// Distribute rewards
		const rewardMessages = this.distributeQuestRewards(quest);

		// Mark quest as completed with rewards
		this.dispatch(questCompleted({ questId, rewards: quest.rewards }));

		this.dispatch(
			addNotification(
				`Quest completed: ${quest.title}! Rewards: ${rewardMessages.join(", ")}`,
				NOTIFICATION_TYPES.SUCCESS,
			),
		);

		Logger.log(`Quest completed at NPC: ${questId}`, 0, "gameplay");

		return { success: true, rewards: rewardMessages };
	}

	// Legacy method - kept for compatibility but now just marks ready
	handleEnemyDeath({ enemyId, placeId, enemy }) {
		Logger.log(
			`Enemy died: ${enemy.name || enemyId} at place ${placeId}`,
			0,
			"gameplay",
		);

		this.processQuestsByType("kill", { enemyId, enemy });
	}

	requestQuestAccept({ questId, npcId }) {
		return this.handleQuestAcceptIntent({ questId, npcId });
	}

	requestQuestComplete({ questId, npcId }) {
		return this.completeQuestAtNpc(questId);
	}

	handleQuestProgressUpdated({ questId, progressKey, progress, required }) {
		this.dispatch(
			questProgressUpdated({
				questId,
				progressKey,
				value: progress,
			}),
		);

		Logger.log(
			`Quest progress updated: ${questId} - ${progressKey}: ${progress}/${required}`,
			0,
			"gameplay",
		);
	}

	handleQuestObjectiveCompleted({ questId, progressKey }) {
		this.checkQuestCompletion(questId);
	}
}

export default Gameplay;
