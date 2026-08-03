import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTarget } from "../../../store/slices/combatSlice";
import CircularProgressTimer from "../common/CircularProgressTimer";
import ProgressBar from "../common/ProgressBar";

const EntityCard = ({ entity, avatarFolder = "enemies" }) => {
	const dispatch = useDispatch();
	const targetId = useSelector((s) => s.combat?.targetEnemyId);
	const playerId = useSelector((s) => s.player?.id);
	const isTargeted = entity?.id === targetId;

	// Memoize timer props to prevent unnecessary re-renders
	const timerProps = useMemo(() => {
		if (!entity || typeof entity !== "object") {
			return null;
		}
		const { countdown, isCountdownActive, maxCountdown } = entity;
		if (countdown === undefined && isCountdownActive === undefined) return null;
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
	}, [entity]);

	if (!entity || typeof entity !== "object") {
		return (
			<div className="entity-card error">
				<div className="block-gradient"></div>
				<h3>Loading or Invalid Data</h3>
			</div>
		);
	}

	const handleClick = () => {
		if (isDead || entity.id === playerId) return;
		dispatch(setTarget(entity.id));
	};

	const hp = entity.hp ?? entity.health ?? 0;
	const maxHp = entity.maxHp ?? entity.maxHealth ?? 100;
	const {
		name,
		avatar = "1.png",
		attackPattern,
	} = entity;

	const isStaggered = attackPattern === "staggered";
	const canAttack =
		isStaggered && entity.isCountdownActive && entity.countdown <= 0;
	const isDead = hp <= 0 || entity.isDead;

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
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

			{!isDead && <ProgressBar value={hp} max={maxHp} />}
			{!isDead && isStaggered && timerProps && (
				<CircularProgressTimer {...timerProps} />
			)}
		</div>
	);
};

export default React.memo(EntityCard);
