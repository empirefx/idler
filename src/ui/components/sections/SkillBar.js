import { useSelector } from "react-redux";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import { selectEnemiesForCurrentPlace } from "../../../store/slices/enemiesSlice";
import { selectPlayerSkills } from "../../../store/slices/playerSlice";
import { useSkillCooldownState } from "../../hooks/useSkillCooldownState";
import { skillsCatalog, SKILL_COLUMNS, getSkillById } from "../../../data/skillsData";
import { DAMAGE_TYPES, SKILL_TYPES } from "../../../data/combatTypes";
import { useEffect, useState } from "react";

import "../../../styles/sections/skill-bar.css";

const SkillBar = () => {
	const currentPlace = useSelector(selectCurrentPlace);
	const enemies = useSelector(selectEnemiesForCurrentPlace);
	const playerSkills = useSelector(selectPlayerSkills);
	const { activeCooldowns, pausedCooldowns, isCooldownPaused } = useSkillCooldownState();
	const equippedWeapon = useSelector(
		(state) => state.inventory.player?.equipment?.["main-weapon"],
	);

	const [currentTime, setCurrentTime] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(Date.now());
		}, 100);
		return () => clearInterval(interval);
	}, []);

	if (!currentPlace.spawn) return null;

	const getCurrentColumn = () => {
		if (!equippedWeapon) return null;
		return equippedWeapon.damageType || DAMAGE_TYPES.PHYSICAL;
	};

	const currentColumn = getCurrentColumn();
	const allSkillIds = currentColumn ? SKILL_COLUMNS[currentColumn] || [] : [];
	const activeSkillIds = allSkillIds.filter((skillId) => {
		const skill = getSkillById(skillId);
		return skill && skill.type !== SKILL_TYPES.PASSIVE;
	});
	const MAX_SLOTS = 5;
	const emptySlots = Math.max(0, MAX_SLOTS - activeSkillIds.length);

	const getSkillStatus = (skillId) => {
		const skill = getSkillById(skillId);
		if (!skill) return null;

		const rank = playerSkills[skillId] || 0;
		if (rank === 0) return null;

		if (isCooldownPaused && pausedCooldowns[skillId]) {
			return { 
				status: "paused", 
				remaining: pausedCooldowns[skillId], 
				max: skill.cooldown 
			};
		}

		const cooldownEnd = activeCooldowns[skillId];
		if (cooldownEnd) {
			const remaining = Math.max(0, cooldownEnd - currentTime);
			const maxCooldown = skill.cooldown;
			return { status: remaining > 0 ? "cooldown" : "ready", remaining, max: maxCooldown };
		}

		return { status: "ready", remaining: 0, max: skill.cooldown };
	};

	const formatCooldown = (ms) => {
		if (ms <= 0) return "";
		const seconds = Math.ceil(ms / 1000);
		return `${seconds}s`;
	};

	const getProgressPercent = (remaining, max) => {
		if (!max || max <= 0) return 100;
		return Math.max(0, ((max - remaining) / max) * 100);
	};

	return (
		<div className="skill-bar">
			<div className="skill-bar-slots">
				{activeSkillIds.map((skillId) => {
					const skill = getSkillById(skillId);
					if (!skill) return null;

					const status = getSkillStatus(skillId);
					const rank = playerSkills[skillId] || 0;

					if (!status) {
						return (
							<div key={skillId} className="skill-slot skill-slot--locked">
								<div className="skill-icon skill-icon--locked">
									{skill.name.charAt(0)}
								</div>
								<div className="skill-name">Locked</div>
							</div>
						);
					}

					const isPaused = status.status === "paused";
					const isCooldown = status.status === "cooldown";
					const isReady = status.status === "ready";
					const progress = isCooldown || isPaused
						? getProgressPercent(status.remaining, status.max)
						: 100;

					return (
						<div
							key={skillId}
							className={`skill-slot ${
								isPaused
									? "skill-slot--paused"
									: isCooldown
										? "skill-slot--cooldown"
										: "skill-slot--ready"
							}`}
						>
							<div className="skill-icon-container">
								<div className="skill-icon">{skill.name.charAt(0)}</div>
									<div
									className={`skill-cooldown-overlay ${
										isCooldown || isPaused ? "skill-cooldown-overlay--active" : ""
									}`}
									style={{
										background: `conic-gradient(transparent ${100 - progress}%, rgba(0,0,0,0.7) ${
											100 - progress
										}%)`,
									}}
								/>
								{(isCooldown || isPaused) && (
									<div className="skill-cooldown-text">
										{isPaused ? "PAUSED" : formatCooldown(status.remaining)}
									</div>
								)}
								{isReady && <div className="skill-ready-indicator" />}
							</div>
							<div className="skill-name">{skill.name}</div>
							<div className="skill-rank">Rank {rank}</div>
						</div>
					);
				})}
				{Array.from({ length: emptySlots }).map((_, index) => (
					<div key={`empty-${index}`} className="skill-slot skill-slot--empty">
						<div className="skill-icon-container">
							<div className="skill-icon skill-icon--empty">?</div>
						</div>
						<div className="skill-name">Empty</div>
						<div className="skill-rank">-</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillBar;
