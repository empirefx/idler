import { itemCatalog } from "../../../../data/itemCatalog";

const NPCDialogQuestPanel = ({ objectives, rewards }) => (
	<div className="quest-details-panel">
		<div className="quest-objectives-display">
			<h4>Objectives:</h4>
			<ul>
				{objectives.map((obj, i) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: objectives list is static, never reordered
						key={i}
						className={obj.current >= obj.required ? "completed" : ""}
					>
						{obj.type === "collect"
							? `Collect: ${obj.current}/${obj.required} ${obj.targetName}`
							: obj.type === "kill"
								? `Defeat: ${obj.current}/${obj.required} ${obj.target} monster`
								: `${obj.progressKey}: ${obj.current}/${obj.required}`}
					</li>
				))}
			</ul>
		</div>
		{rewards && (
			<div className="quest-rewards-display">
				<h4>Rewards:</h4>
				<ul>
					{rewards.gold && <li>🪙 {rewards.gold} gold</li>}
					{rewards.exp && <li>✨ {rewards.exp} exp</li>}
					{rewards.items?.map((item, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: rewards list is static, never reordered
						<li key={i}>
							📦 {itemCatalog[item.icon]?.name} x{item.quantity}
						</li>
					))}
				</ul>
			</div>
		)}
	</div>
);

export default NPCDialogQuestPanel;
