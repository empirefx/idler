const PartyMemberCard = ({ member }) => {
	const { nickname, avatar = "1", hp = 0, maxHp = 0, isLeader } = member;
	const percent = maxHp > 0 ? Math.round((hp / maxHp) * 100) : 100;

	return (
		<div className="party-member-card">
			<img
				className="party-member-card__avatar"
				src={`assets/avatars/players/${avatar}-avatar.png`}
				draggable="false"
				alt={nickname}
			/>
			<div className="party-member-card__info">
				<span className="party-member-card__name">{nickname}</span>
				<div className="party-member-card__hp">
					<div
						className="party-member-card__hp-fill"
						style={{ width: `${percent}%` }}
					></div>
				</div>
			</div>
			{isLeader && <span className="party-member-card__crown">👑</span>}
		</div>
	);
};

export default PartyMemberCard;
