import Logger from "../utils/Logger";
import { checkQuestEligibility } from "../quests/questValidators";
import { questAccepted, questProgressUpdated, questCompleted } from "../../store/slices/questSlice";
import {
	addNotification,
	NOTIFICATION_TYPES,
} from "../../store/slices/notificationSlice";
import { questCatalog } from "../../data/questCatalog";

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
					addNotification(
						eligibility.message,
						NOTIFICATION_TYPES.WARNING,
					),
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
				addNotification(
					eligibility.message,
					NOTIFICATION_TYPES.SUCCESS,
				),
			);
		}

		Logger.log(`Quest accepted: ${questId}`, 0, "gameplay");

		return { success: true, reasonCode: null };
	}

	// Quest helper methods
	getActiveQuests() {
		return this.store.getState().quests?.activeById || {};
	}

	showNotification(message, type = NOTIFICATION_TYPES.INFO) {
		this.dispatch(addNotification(message, type));
	}

	updateQuestProgress(questId, progressKey, increment, required) {
		const currentProgress = this.getActiveQuests()[questId]?.progress?.[progressKey] || 0;
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
			"gameplay"
		);
		
		return newProgress;
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
		
		if (allObjectivesComplete) {
			this.completeQuest(questId);
			return true;
		}
		return false;
	}

	// Quest handlers
	handleKillObjective({ questId, objective, enemyId, enemy }) {
		const isMatch = objective.target === "any" || 
						objective.target === enemyId || 
						objective.target === enemy.type;
		
		if (!isMatch) return;
		
		const newProgress = this.updateQuestProgress(
			questId,
			objective.progressKey,
			1,
			objective.required
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

	completeQuest(questId) {
		const quest = questCatalog[questId];
		if (!quest) return;

		this.dispatch(questCompleted(questId));
		this.dispatch(
			addNotification(
				`Quest completed: ${quest.title}`,
				NOTIFICATION_TYPES.SUCCESS,
			),
		);

		Logger.log(`Quest completed: ${questId}`, 0, "gameplay");
	}

	handleEnemyDeath({ enemyId, placeId, enemy }) {
		Logger.log(`Enemy died: ${enemy.name || enemyId} at place ${placeId}`, 0, "gameplay");
		
		this.processQuestsByType("kill", { enemyId, enemy });
	}

	requestQuestAccept({ questId, npcId }) {
		return this.handleQuestAcceptIntent({ questId, npcId });
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
