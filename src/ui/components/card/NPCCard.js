import React from "react";

const NPCCard = ({ npc, onClick }) => {
	if (!npc || typeof npc !== "object") {
		return null;
	}

	const { name, description, avatar } = npc;

	const handleClick = () => {
		if (onClick && npc.id) {
			onClick(npc.id);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			className="npc-card"
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
		>
			<div className={`npc-avatar avatar avatar_${avatar} small`}></div>
			<div className="npc-info">
				<h3>{name}</h3>
				<p>{description}</p>
				{(npc.hasInventory || npc.hasQuestToGive) && (
					<>
						<h4>Actions</h4>
						{npc.hasInventory && <span className="npc-badge"><span className="icon" role="img">⇆</span> Shop</span>}
						{npc.hasQuestToGive && <span className="npc-badge"><span className="icon" role="img">🗪</span> Quest</span>}
					</>
				)}
			</div>
		</div>
	);
};

export default React.memo(NPCCard);
