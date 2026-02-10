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
			className="npc-card" 
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleClick();
				}
			}}
		>
			<div className={`npc-avatar avatar avatar_${avatar} small`}></div>
			<div className="npc-info">
				<h3>{name}</h3>
				<p>{description}</p>
				{npc.hasInventory && (
					<>
						<h4>Actions</h4>
						<span className="npc-inventory-badge">⇆ Shop</span>
					</>
				)}
			</div>
		</div>
	);
};

export default React.memo(NPCCard);
