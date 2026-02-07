import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "../common/ProgressBar";
import CircularProgressTimer from "../common/CircularProgressTimer";

const EntityCard = ({ entity, avatarFolder = "enemies" }) => {
	const dispatch = useDispatch();
	const targetId = useSelector((s) => s.combat?.targetEnemyId);
	const isTargeted = entity?.id === targetId;

	// Handle case where entity is null/undefined (still loading)
	if (!entity || typeof entity !== "object" || entity.health === undefined) {
		return (
			<div className="entity-card error">
				<div className="block-gradient"></div>
				<h3>Loading or Invalid Data</h3>
			</div>
		);
	}

	const handleClick = () => {
		if (isDead) return;
		dispatch({ type: "combat/setTarget", payload: entity.id });
	};

	// Memoize timer props to prevent unnecessary re-renders
	const timerProps = useMemo(() => {
		const { countdown, isCountdownActive, maxCountdown } = entity;
		return {
			time: countdown,
			maxTime: maxCountdown || countdown,
			isRunning: Boolean(isCountdownActive && countdown > 0),
			size: 20,
			displayText: false,
			onComplete: () => {
				// Enemy will perform an attack - could trigger attack event here if needed
			},
		};
	}, [entity.countdown, entity.isCountdownActive, entity.maxCountdown]);

	const {
		name,
		health = 0,
		maxHealth = 100,
		avatar = "default.png",
		attackPattern,
	} = entity;

	const isStaggered = attackPattern === "staggered";
	const canAttack =
		isStaggered && entity.isCountdownActive && entity.countdown <= 0;
	const isDead = health <= 0 || entity.isDead;

	return (
		<div
			onClick={handleClick}
			className={`entity-card ${canAttack ? "ready-to-attack" : ""} ${isDead ? "dead" : ""} ${isTargeted ? "targeted" : ""}`}
			data-enemy-id={entity.id}
		>
			<div className="block-gradient"></div>
			<img
				src={`assets/avatars/${avatarFolder}/${avatar}`}
				alt={name}
				draggable="false"
			/>
			<h3>{name}</h3>

			{!isDead && <ProgressBar value={health} max={maxHealth} />}
			{!isDead && isStaggered && <CircularProgressTimer {...timerProps} />}
		</div>
	);
};

export default React.memo(EntityCard);
