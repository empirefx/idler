import { useSelector, useDispatch } from "react-redux";
import {
	selectSkillPoints,
	selectPlayerSkills,
	spendSkillPoint,
} from "../../../store/slices/playerSlice";
import {
	skillsCatalog,
	SKILL_COLUMNS,
	getSkillById,
} from "../../../data/skillsData";
import { DAMAGE_TYPES } from "../../../data/combatTypes";

const SkillsSection = () => {
	const dispatch = useDispatch();
	const skillPoints = useSelector(selectSkillPoints);
	const playerSkills = useSelector(selectPlayerSkills);
	const equippedWeapon = useSelector(
		(state) => state.inventory.player?.equipment?.["main-weapon"],
	);

	const getCurrentColumn = () => {
		if (!equippedWeapon) return null;
		return equippedWeapon.damageType || DAMAGE_TYPES.PHYSICAL;
	};

	const currentColumn = getCurrentColumn();
	const skillIds = currentColumn ? SKILL_COLUMNS[currentColumn] || [] : [];

	const handleUpgradeSkill = (skillId) => {
		const currentRank = playerSkills[skillId] || 0;
		if (skillPoints > 0 && currentRank < 3) {
			dispatch(spendSkillPoint({ skillId, currentRank }));
		}
	};

	const renderSkillIcon = (skillId) => {
		const skill = getSkillById(skillId);
		if (!skill) return null;
		return (
			<div className="skill-icon" title={skill.name}>
				{skill.name.charAt(0)}
			</div>
		);
	};

	return (
		<div className="player-skills">
			<div className="skills-header">
				<h3>Skills</h3>
				<div className="skill-points">
					<span>Available Points: </span>
					<span className="skill-points-value">{skillPoints}</span>
				</div>
			</div>

			<div className="skills-column-info">
				<span>Active Column: </span>
				<span className="column-name">{currentColumn || "None"}</span>
			</div>

			{currentColumn === null ? (
				<div className="skills-no-weapon">
					<p>Equip a weapon to unlock skills</p>
				</div>
			) : (
				<div className="skills-list">
					{skillIds.map((skillId) => {
						const skill = getSkillById(skillId);
						if (!skill) return null;

						const currentRank = playerSkills[skillId] || 0;
						const canUpgrade = skillPoints > 0 && currentRank < 3;
						const currentRankData = skill.ranks[currentRank - 1];

						return (
							<div key={skillId} className="skill-row">
								<div className="skill-info">
									{renderSkillIcon(skillId)}
									<div className="skill-details">
										<div className="skill-name">{skill.name}</div>
										<div className="skill-description">{skill.description}</div>
										{currentRank > 0 && currentRankData && (
											<div className="skill-effect">
												Effect:{" "}
												{currentRankData.statBonus
													? `+${currentRankData.statBonus.value} ${currentRankData.statBonus.stat}`
													: `Damage x${currentRankData.damageMultiplier}`}
											</div>
										)}
									</div>
								</div>

								<div className="skill-rank">
									<div className="rank-dots">
										{[1, 2, 3].map((rank) => (
											<span
												key={rank}
												className={`rank-dot ${
													rank <= currentRank ? "rank-dot--filled" : ""
												} ${rank === currentRank + 1 && canUpgrade ? "rank-dot--next" : ""}`}
											/>
										))}
									</div>
									<button
										type="button"
										className={`upgrade-btn ${canUpgrade ? "upgrade-btn--active" : ""}`}
										onClick={() => handleUpgradeSkill(skillId)}
										disabled={!canUpgrade}
									>
										+
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{currentColumn !== null && (
				<div className="skills-note">
					<p>Only skills from your weapon's damage type column are active.</p>
				</div>
			)}
		</div>
	);
};

export default SkillsSection;
