import InventoryGrid from "../InventoryGrid";

const NPCDialogTrade = ({
	playerInventory,
	npcInventory,
	playerGold,
	onPlayerItemSell,
	onNpcItemBuy,
}) => (
	<div className="npc-trade-section">
		<div className="trade-inventories">
			<div className="player-inventory-section">
				<h4>Your Inventory</h4>
				<InventoryGrid
					inventory={playerInventory}
					otherInventory={npcInventory}
					onContextMenu={onPlayerItemSell}
					columns={5}
				/>
			</div>
			<div className="npc-inventory-section">
				<h4>NPC Inventory</h4>
				<InventoryGrid
					inventory={npcInventory}
					otherInventory={playerInventory}
					onContextMenu={onNpcItemBuy}
					columns={5}
					showBuyPrice={true}
				/>
			</div>
		</div>
		<div className="trade-gold-display">
			<span className="gold-icon">🪙</span>
			<span className="gold-amount">Your Gold: {playerGold}</span>
		</div>
	</div>
);

export default NPCDialogTrade;
