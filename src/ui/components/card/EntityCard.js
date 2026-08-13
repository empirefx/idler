import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { setTarget } from "../../../store/ws";
import CircularProgressTimer from "../common/CircularProgressTimer";
import ProgressBar from "../common/ProgressBar";
import useEnemyCountdown from "../../hooks/useEnemyCountdown";

const EntityCard = ({ entity, avatarFolder = "enemies" }) => {
	const targetId = useSelector((s) => s.player?.targetEnemyId);
	const playerId = useSelector((s) => s.player?.id);

	const { remaining, nextAttackAt, nextAttackDelay } = useEnemyCountdown(entity);

	const timerProps = useMemo(() => {
		if (!nextAttackAt) return null;
		return {
			time: remaining,
			maxTime: nextAttackDelay || remaining,
			isRunning: remaining > 0,
			size: 20,
			displayText: false,
			onComplete: () => {
				// Attack fires server-side; the countdown resets on ENEMY_ATTACK.
			},
		};
	}, [remaining, nextAttackAt, nextAttackDelay]);

	if (!entity || typeof entity !== "object") {
		return (
			<div className="entity-card error">
				<div className="block-gradient"></div>
				<h3>Loading or Invalid Data</h3>
			</div>
		);
	}

	const hp = entity.hp ?? entity.health ?? 0;
	const maxHp = entity.maxHp ?? entity.maxHealth ?? 100;
	const {
		name,
		avatar = "1.png",
		attackPattern,
	} = entity;

	const isStaggered = attackPattern === "staggered";
	const isDead = hp <= 0 || entity.isDead;
	const isTargeted = !isDead && entity?.id === targetId;

	const handleClick = () => {
		if (isDead || entity.id === playerId) return;
		setTarget(entity.id);
	};

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
			className={`entity-card ${isDead ? "dead" : ""} ${isTargeted ? "targeted" : ""}`}
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
