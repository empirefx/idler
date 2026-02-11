import { useSelector } from "react-redux";
import { selectActiveQuestIds } from "../../../store/slices/questSlice";
import { questCatalog } from "../../../data/questCatalog";

const QuestSection = () => {
	const activeQuestIds = useSelector(selectActiveQuestIds);

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
						{activeQuestIds.map((questId) => {
							const quest = questCatalog[questId];
							if (!quest) return null;

							return (
								<li key={questId} className="quest-list-item">
									<strong>{quest.title}</strong>
									{quest.requirementSummary ? (
										<span className="quest-summary">
											{" "}
											- {quest.requirementSummary}
										</span>
									) : null}
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

