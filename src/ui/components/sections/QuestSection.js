import { useSelector } from "react-redux";
import {
	selectActiveQuestIds,
	selectQuestProgress,
	selectCompletedQuestIds,
} from "../../../store/slices/questSlice";
import { questCatalog } from "../../../data/questCatalog";

const QuestItem = ({ questId }) => {
	const quest = questCatalog[questId];
	if (!quest) return null;

	// Get progress for each objective
	const progressData =
		quest.objectives &&
		Object.entries(quest.objectives).map(([key, objective]) => {
			const progress = useSelector(
				selectQuestProgress(quest.id, objective.progressKey),
			);
			return {
				key,
				objective,
				progress: progress || 0,
			};
		});

	return (
		<li className="quest-list-item">
			<strong>{quest.title}</strong>
			{quest.requirementSummary ? (
				<span className="quest-summary">
					{" "}
					- {quest.requirementSummary}
				</span>
			) : null}
			{progressData && progressData.length > 0 ? (
				<div className="quest-progress">
					{progressData.map(({ objective, progress }) => {
						if (objective.type === "kill") {
							const targetText =
								objective.target === "any"
									? "any monster"
									: objective.target;
							return (
								<span
									key={objective.progressKey}
									className="quest-progress-item"
								>
									{" "}
									- Kill {targetText}: {progress}/{objective.required}
								</span>
							);
						}
						return null;
					})}
				</div>
			) : null}
		</li>
	);
};

const QuestSection = () => {
	const activeQuestIds = useSelector(selectActiveQuestIds);
	const completedQuestIds = useSelector(selectCompletedQuestIds);

	return (
		<section className="quest-section">
			{!activeQuestIds || activeQuestIds.length === 0 ? (
				<div className="quest-section-empty">
					<p className="no-quests-message">No quest taken.</p>
				</div>
			) : (
				<div className="quest-section-content">
					<h2 className="quest-section-title">Active quests</h2>
					<ul className="quest-list">
						{activeQuestIds.map((questId) => (
							<QuestItem key={questId} questId={questId} />
						))}
					</ul>
				</div>
			)}
			{completedQuestIds && completedQuestIds.length > 0 && (
				<div className="quest-section-content completed-quests">
					<h2 className="quest-section-title">Completed quests</h2>
					<ul className="quest-list">
						{completedQuestIds.map((questId) => {
							const quest = questCatalog[questId];
							if (!quest) return null;
							return (
								<li key={questId} className="quest-list-item completed">
									<strong>{quest.title}</strong>
									{quest.rewards && (
										<span className="quest-rewards">
											{" "}
											- Rewarded: {quest.rewards.gold || 0} gold,{" "}
											{quest.rewards.exp || 0} exp
											{quest.rewards.items &&
												quest.rewards.items.length > 0 &&
												`, ${quest.rewards.items.map((i) => i.itemKey).join(", ")}`}
										</span>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</section>
	);
};

export default QuestSection;

