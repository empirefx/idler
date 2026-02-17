import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayer, addGold, spendGold } from "../../../store/slices/playerSlice";
import { selectPlayerInventoryById, addItem as addPlayerItem, removeItem as removePlayerItem } from "../../../store/slices/playerInventorySlice";
import { selectNPCById } from "../../../store/slices/npcSlice";
import { selectNpcInventoryById, addItem as addNpcItem, removeItem as removeNpcItem } from "../../../store/slices/npcInventorySlice";
import { questCatalog } from "../../../data/questCatalog";
import {
	selectIsQuestActive,
	selectIsQuestCompleted,
} from "../../../store/slices/questSlice";
import { playerIntentAcceptQuest, playerIntentCompleteQuest } from "../../../game/events";
import InventoryGrid from "./InventoryGrid";
import TradeMessageDialog from "./TradeMessageDialog";
import { itemCatalog } from "../../../data/itemCatalog";

const NPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const dispatch = useDispatch();
	const player = useSelector(selectPlayer);
	const playerInventory = useSelector((state) => selectPlayerInventoryById(state, "player"));
	const npc = useSelector((state) => selectNPCById(state, npcId));
	const npcInventory = useSelector((state) => selectNpcInventoryById(state, npcId));
	const questsState = useSelector((state) => state.quests);
	const dialogRef = useRef(null);

	// Get all quests offered by this NPC
	const npcQuests = npc
		? Object.values(questCatalog).filter(
				(quest) => quest.giverNpcId === npc.id,
		  )
		: [];

	const [questConversationState, setQuestConversationState] = useState(null);
	const [tradeMessage, setTradeMessage] = useState(null);

	// Get player gold amount
	const playerGold = useMemo(() => {
		const goldResource = player.resources?.find(r => r.name === "gold");
		return goldResource?.amount || 0;
	}, [player.resources]);

	// Get the current quest from conversation state
	const currentQuest =
		questConversationState && questCatalog[questConversationState.questId]
			? questCatalog[questConversationState.questId]
			: null;

	const isQuestActive = currentQuest
		? Boolean(questsState?.activeById?.[currentQuest.id])
		: false;
	const isQuestCompleted = currentQuest
		? Boolean(questsState?.completedQuests?.[currentQuest.id])
		: false;

	// Check if quest is ready to complete (all objectives met)
	const isQuestReadyToComplete = useMemo(() => {
		if (!currentQuest || !isQuestActive || isQuestCompleted) return false;
		
		if (!currentQuest.objectives) return false;

		return Object.values(currentQuest.objectives).every((objective) => {
			if (objective.type === "collect") {
				const inventory = playerInventory?.items || [];
				const count = inventory.reduce((total, item) => {
					if (item.itemKey === objective.target) {
						return total + (item.quantity || 1);
					}
					return total;
				}, 0);
				return count >= objective.required;
			}
			const questProgress = questsState?.activeById?.[currentQuest.id]?.progress;
			return (questProgress?.[objective.progressKey] || 0) >= objective.required;
		});
	}, [currentQuest, isQuestActive, isQuestCompleted, questsState, playerInventory]);

	// Handle ESC key and native dialog API
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	// Close on backdrop click
	const handleBackdropClick = (e) => {
		if (e.target === dialogRef.current) {
			onClose();
		}
	};

	const resetQuestConversation = () => {
		setQuestConversationState(null);
		// Reset selected option so normal dialogue goes back to initial
		if (onOptionSelect) {
			onOptionSelect(null);
		}
	};

	const handleAcceptQuestClick = () => {
		if (!currentQuest || !npc) return;
		dispatch(playerIntentAcceptQuest(currentQuest.id, npc.id));
		resetQuestConversation();
	};

	const handleCompleteQuestClick = () => {
		if (!currentQuest || !npc) return;
		dispatch(playerIntentCompleteQuest(currentQuest.id, npc.id));
		resetQuestConversation();
	};

	const handleDeclineQuestClick = () => {
		resetQuestConversation();
	};

	const handleOptionClick = (index) => {
		if (!npc || !npc.dialogue?.options) return;

		const option = npc.dialogue.options[index];

		// If this option starts a quest conversation
		if (option?.startsQuestId) {
			// Look up the quest directly from the startsQuestId
			const questForOption = questCatalog[option.startsQuestId];
			
			// Verify the quest exists and is given by this NPC
			if (questForOption && questForOption.giverNpcId === npc.id) {
				// Check if quest is already completed using current state
			const isThisQuestCompleted = questsState?.completedQuests?.[
					option.startsQuestId
				];
				
				if (!isThisQuestCompleted) {
					setQuestConversationState({
						questId: option.startsQuestId,
						stepIndex: 0,
					});
					// Clear standard selected option to switch into quest conversation mode
					if (onOptionSelect) {
						onOptionSelect(null);
					}
					return;
				}
			}
		}

		// Normal dialogue flow
		if (onOptionSelect) {
			onOptionSelect(index);
		}
	};

	const advanceQuestConversation = () => {
		if (!questConversationState || !currentQuest) return;

		const steps = currentQuest?.conversation || [];
		if (steps.length === 0) {
			resetQuestConversation();
			return;
		}

		const nextIndex = questConversationState.stepIndex + 1;
		if (nextIndex >= steps.length) {
			// Already at or past last step; keep at last
			setQuestConversationState({
				questId: questConversationState.questId,
				stepIndex: steps.length - 1,
			});
			return;
		}

		setQuestConversationState({
			questId: questConversationState.questId,
			stepIndex: nextIndex,
		});
	};

	// Handle selling item from player inventory (right-click)
	const handlePlayerItemSell = (item) => {
		if (!item.sellable?.gold) {
			setTradeMessage({ type: "error", message: "This item cannot be sold." });
			return;
		}
		const sellPrice = item.sellable.gold;
		dispatch(removePlayerItem({ inventoryId: "player", itemId: item.id, quantity: 1 }));
		dispatch(addGold(sellPrice));
		setTradeMessage({ type: "success", message: `Sold ${item.name} for ${sellPrice} gold.` });
	};

	// Handle buying item from NPC inventory (right-click)
	const handleNpcItemBuy = (item) => {
		if (!item.buy?.gold) {
			setTradeMessage({ type: "error", message: "This item cannot be bought." });
			return;
		}
		const buyPrice = item.buy.gold;

		// Validate: enough gold?
		if (playerGold < buyPrice) {
			setTradeMessage({ type: "error", message: "Not enough gold!" });
			return;
		}

		// Validate: inventory space?
		if (playerInventory.items.length >= playerInventory.maxSlots) {
			setTradeMessage({ type: "error", message: "Inventory is full!" });
			return;
		}

		// Execute trade
		dispatch(spendGold(buyPrice));

		// Create new item from catalog using itemFactory pattern
		const catalogItem = itemCatalog[item.itemKey] || item;
		const isStackable = catalogItem.type === "consumable" || catalogItem.type === "material";
		const newItem = {
			...catalogItem,
			itemKey: item.itemKey || catalogItem.id,
			quantity: isStackable ? 1 : undefined,
		};
		dispatch(addPlayerItem({ inventoryId: "player", item: newItem }));

		setTradeMessage({ type: "success", message: `Bought ${item.name} for ${buyPrice} gold.` });
	};

	if (!npc || !isOpen) return null;

	const getResponseText = () => {
		// Quest conversation overrides normal dialogue
		if (questConversationState && currentQuest) {
			const steps = currentQuest?.conversation || [];
			const step =
				steps[questConversationState.stepIndex] ||
				steps[steps.length - 1] ||
				null;

			if (step?.npcText) {
				return step.npcText;
			}
		}

		if (!npc.dialogue) return "This NPC has nothing to say.";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].response;
		}
		return npc.dialogue.initial || "Hello, traveler.";
	};

	const getPlayerText = () => {
		// Quest conversation overrides normal dialogue
		if (questConversationState && currentQuest) {
			const steps = currentQuest?.conversation || [];
			const step =
				steps[questConversationState.stepIndex] ||
				steps[steps.length - 1] ||
				null;

			if (step?.playerText) {
				return step.playerText;
			}
			return "...";
		}

		if (!npc.dialogue || !npc.dialogue.options) return "";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].text;
		}
		return "...";
	};

	return (
		<dialog
			ref={dialogRef}
			className="npc-dialog"
			onClick={handleBackdropClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
		>
		{npc?.hasInventory && npcInventory && (
				<div className="npc-trade-section">
					<div className="trade-inventories">
						<div className="player-inventory-section">
							<h4>Your Inventory</h4>
							<InventoryGrid 
								inventory={playerInventory}
								otherInventory={npcInventory}
								onContextMenu={(e, item) => handlePlayerItemSell(item)}
								columns={5}
							/>
						</div>
						<div className="npc-inventory-section">
							<h4>NPC Inventory</h4>
							<InventoryGrid 
								inventory={npcInventory}
								otherInventory={playerInventory}
								onContextMenu={(e, item) => handleNpcItemBuy(item)}
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
			)}
			<div className="key-bind-container">
				<span className="key-bind">ESC</span>
				<span>escape</span>
			</div>
			<fieldset
				className="npc-dialog-content"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			>
				{/* Bottom section with 2 columns */}
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
						<div className="npc-avatar-name">
							<div
								className={`npc-avatar avatar avatar_${npc.avatar} small`}
							></div>
							<h3>{npc.name}</h3>
						</div>
						<div className="npc-response">{getResponseText()}</div>
						<div className="dialog-options">
							{questConversationState && currentQuest ? (
								// Quest conversation mode: show Continue / Accept / Maybe later
								(() => {
									const steps = currentQuest?.conversation || [];
									const step =
										steps[questConversationState.stepIndex] ||
										steps[steps.length - 1] ||
										null;
									const isFinal = step?.final || false;

									return (
										<>
											{!isFinal && (
												<button
													type="button"
													className="dialog-option-btn"
													onClick={advanceQuestConversation}
												>
													Continue
												</button>
											)}
											{isFinal && (
												<>
													{isQuestReadyToComplete ? (
														<button
															type="button"
															className="dialog-option-btn quest-complete-btn"
															onClick={handleCompleteQuestClick}
														>
															Complete Quest
														</button>
													) : isQuestActive ? (
														<button
															type="button"
															className="dialog-option-btn"
															disabled
														>
															Quest in progress
														</button>
													) : (
														<button
															type="button"
															className="dialog-option-btn"
															onClick={handleAcceptQuestClick}
														>
															Accept quest
														</button>
													)}
													<button
														type="button"
														className="dialog-option-btn"
														onClick={handleDeclineQuestClick}
													>
														Maybe later
													</button>
												</>
											)}
										</>
									);
								})()
							) : npc.dialogue?.options ? (
								npc.dialogue.options.map((option, index) => (
									<button
										key={`option-${option.id || index}`}
										onClick={() => handleOptionClick(index)}
										className="dialog-option-btn"
										type="button"
									>
										{option.text}
									</button>
								))
							) : (
								<button
									disabled
									className="dialog-option-btn"
									style={{ opacity: 0.5 }}
									type="button"
								>
									No dialogue options available
								</button>
							)}
						</div>
					</div>
				</div>
			</fieldset>
			<TradeMessageDialog
				isOpen={!!tradeMessage}
				message={tradeMessage?.message}
				type={tradeMessage?.type}
				onClose={() => setTradeMessage(null)}
			/>
		</dialog>
	);
};

export default NPCDialog;
