import Logger from "../utils/Logger";
import { checkQuestEligibility } from "../quests/questValidators";
import { questAccepted } from "../../store/slices/questSlice";
import {
	addNotification,
	NOTIFICATION_TYPES,
} from "../../store/slices/notificationSlice";

class Gameplay {
	constructor(store, dispatch) {
		this.store = store;
		this.dispatch = dispatch;
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

	// Convenience alias if we ever call directly instead of via intent
	requestQuestAccept({ questId, npcId }) {
		return this.handleQuestAcceptIntent({ questId, npcId });
	}
}

export default Gameplay;

