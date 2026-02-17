const NPCDialogProfile = ({ player, npc, getResponseText, getPlayerText, children }) => (
	<div className="dialog-bottom-section">
		{/* Left: Player Profile */}
		<div
			className="player-profile"
			style={{
				"--player-avatar-url": `url(./assets/avatars/players/${player.avatar})`,
			}}
		>
			<div className="player-background-image"></div>
			<div className="player-content-overlay">
				<div className="player-avatar-name">
					<h3>{player.name}</h3>
				</div>
				<div className="player-text">{getPlayerText()}</div>
			</div>
		</div>

		{/* Right: NPC Profile with Options */}
		<div className="npc-profile">
			<div
				className={`npc-background-image portrait portrait_${npc.avatar}`}
			></div>
			<div className="npc-content-overlay">
				<div className="npc-avatar-name">
					<div className={`npc-avatar avatar avatar_${npc.avatar} small`}></div>
					<h3>{npc.name}</h3>
				</div>
				<div className="npc-response">{getResponseText()}</div>
				{children}
			</div>
		</div>
	</div>
);

export default NPCDialogProfile;
