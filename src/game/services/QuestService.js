// QuestService: handles quest progress tracking and completion
import Logger from "../utils/Logger";
import { questProgressUpdated, questCompleted } from "../../store/slices/questSlice";
import { questCatalog } from "../../data/questCatalog";
import {
	addNotification,
	NOTIFICATION_TYPES,
} from "../../store/slices/notificationSlice";

export class QuestService {
	constructor(store, dispatch, eventBusService) {
		this.store = store;
		this.dispatch = dispatch;
		this.eventBusService = eventBusService;

		// Listen for enemy death events
		if (this.eventBusService) {
			// Listen to all enemyDead events (for any place)
			this.eventBusService.on("enemyDead", (data) => {
				this.handleEnemyKilled(data);
			});
		}
	}

	handleEnemyKilled({ enemy, placeId }) {
		if (!enemy) return;

		const state = this.store.getState();
		const activeQuests = state.quests?.activeById || {};

		// Check all active quests for kill objectives
		Object.keys(activeQuests).forEach((questId) => {
			const quest = questCatalog[questId];
			if (!quest || !quest.objectives) return;

			// Check kill objectives
			Object.keys(quest.objectives).forEach((objectiveKey) => {
				const objective = quest.objectives[objectiveKey];
				if (objective.type === "kill") {
					// Check if this kill matches the objective
					if (
						objective.target === "any" ||
						objective.target === enemy.type ||
						objective.target === enemy.id
					) {
						this.updateQuestProgress(questId, objective.progressKey);
					}
				}
			});
		});
	}

	updateQuestProgress(questId, progressKey) {
		const state = this.store.getState();
		const quest = questCatalog[questId];
		if (!quest || !quest.objectives) return;

		// Find the objective for this progress key
		const objective = Object.values(quest.objectives).find(
			(obj) => obj.progressKey === progressKey,
		);
		if (!objective) return;

		const currentProgress =
			state.quests?.activeById?.[questId]?.progress?.[progressKey] ?? 0;
		const newProgress = currentProgress + 1;

		// Update progress
		this.dispatch(
			questProgressUpdated({
				questId,
				progressKey,
				value: newProgress,
			}),
		);

		Logger.log(
			`Quest progress updated: ${questId} - ${progressKey}: ${newProgress}/${objective.required}`,
			0,
			"quest",
		);

		// Check if quest is complete
		if (newProgress >= objective.required) {
			this.completeQuest(questId);
		}
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

		Logger.log(`Quest completed: ${questId}`, 0, "quest");
	}
}
