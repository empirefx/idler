import { useState } from "react";
import { useDispatch } from "react-redux";

import InventoryDisplay from "../display/InventoryDisplay";
import EquipmentDisplay from "../display/EquipmentDisplay";
import BaseStatsList from "../list/BaseStatsList";
import DerivedStatsList from "../list/DerivedStatsList";
import NewLevelDialog from "../common/NewLevelDialog";
import QuestSection from "../sections/QuestSection";
import SkillsSection from "../sections/SkillsSection";
import { levelUp } from "../../../store/slices/playerSlice";

const PlayerCard = ({ player, vaultId }) => {
	const dispatch = useDispatch();
	const [showLevelUp, setShowLevelUp] = useState(false);
	const [activeTab, setActiveTab] = useState("character");

	const handleLevelChoice = (bonuses) => {
		dispatch(levelUp(bonuses));
		setShowLevelUp(false);
	};

	if (!player) return null;

	return (
		<div className="player-card">
			<div className="player-grid">
				<div className="player-display">
					<div className="player-avatar"></div>
					<h1>{player.level}</h1>
					<h1>{player.name}</h1>
					<div className="player-options">
						{player.exp >= player.expToNext && (
							<button
								type="button"
								className="select-btn"
								onClick={() => setShowLevelUp((prev) => !prev)}
							>
								Level Up
							</button>
						)}
						{showLevelUp && (
							<NewLevelDialog
								onChoose={handleLevelChoice}
								onCancel={() => setShowLevelUp(false)}
							/>
						)}
					</div>
				</div>

				<div className="player-panel">
					<div className="player-tabs">
						<button
							type="button"
							className={`player-tab-button${
								activeTab === "character" ? " player-tab-button--active" : ""
							}`}
							onClick={() => setActiveTab("character")}
						>
							Character
						</button>
						<button
							type="button"
							className={`player-tab-button${
								activeTab === "quests" ? " player-tab-button--active" : ""
							}`}
							onClick={() => setActiveTab("quests")}
						>
							Quests
						</button>
						<button
							type="button"
							className={`player-tab-button${
								activeTab === "skills" ? " player-tab-button--active" : ""
							}`}
							onClick={() => setActiveTab("skills")}
						>
							Skills
						</button>
					</div>

					<div className="player-tab-content">
						{activeTab === "character" && (
							<div className="player-character-layout">
								<div className="player-Equipment">
									<EquipmentDisplay />
								</div>

								<div className="player-stats">
									<div className="stats-columns">
										<div className="stats-column">
											{player.stats && (
												<BaseStatsList
													baseStats={player.stats}
													exp={player.exp}
													expToNext={player.expToNext}
												/>
											)}
										</div>
										<div className="stats-column">
											<DerivedStatsList player={player} />
										</div>
									</div>
								</div>

								<div className="player-inventory">
									<h3>Inventory</h3>
									<InventoryDisplay
										inventoryId="player"
										otherInventoryId={vaultId}
										isVault={false}
									/>
								</div>
							</div>
						)}

						{activeTab === "quests" && (
							<div className="player-quests">
								<QuestSection />
							</div>
						)}

						{activeTab === "skills" && (
							<div className="player-skills-tab">
								<SkillsSection />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
