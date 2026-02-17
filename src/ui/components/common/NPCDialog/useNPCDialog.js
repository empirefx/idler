import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPlayer,
	addGold,
	spendGold,
} from "../../../../store/slices/playerSlice";
import {
	selectPlayerInventoryById,
	addItem as addPlayerItem,
	removeItem as removePlayerItem,
} from "../../../../store/slices/playerInventorySlice";
import { selectNPCById } from "../../../../store/slices/npcSlice";
import {
	selectNpcInventoryById,
	addItem as addNpcItem,
	removeItem as removeNpcItem,
} from "../../../../store/slices/npcInventorySlice";
import { questCatalog } from "../../../../data/questCatalog";
import {
	playerIntentAcceptQuest,
	playerIntentCompleteQuest,
} from "../../../../game/events";
import { itemCatalog } from "../../../../data/itemCatalog";

const useNPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const dispatch = useDispatch();
	const dialogRef = useRef(null);

	const player = useSelector(selectPlayer);
	const playerInventory = useSelector((state) =>
		selectPlayerInventoryById(state, "player"),
	);
	const npc = useSelector((state) => selectNPCById(state, npcId));
	const npcInventory = useSelector((state) =>
		selectNpcInventoryById(state, npcId),
	);
	const questsState = useSelector((state) => state.quests);

	const [questConversationState, setQuestConversationState] = useState(null);
	const [tradeMessage, setTradeMessage] = useState(null);

	// Reset conversation state when switching NPCs
	useEffect(() => {
		setQuestConversationState(null);
		setTradeMessage(null);
	}, [npcId]);

	// Get player gold amount
	const playerGold = useMemo(() => {
		const goldResource = player.resources?.find((r) => r.name === "gold");
		return goldResource?.amount || 0;
	}, [player.resources]);

	// Visible dialogue options (filter completed quests)
	const visibleDialogueOptions = useMemo(
		() =>
			npc?.dialogue?.options?.filter(
				(o) =>
					!o.startsQuestId || !questsState?.completedQuests?.[o.startsQuestId],
			) ?? [],
		[npc?.dialogue?.options, questsState?.completedQuests],
	);

	// Current quest from conversation
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

	// Check if quest is ready to complete
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
			const questProgress =
				questsState?.activeById?.[currentQuest.id]?.progress;
			return (
				(questProgress?.[objective.progressKey] || 0) >=
				objective.required
			);
		});
	}, [currentQuest, isQuestActive, isQuestCompleted, questsState, playerInventory]);

	// Get quest objectives with current progress
	const questObjectivesWithProgress = useMemo(() => {
		if (!currentQuest?.objectives) return [];

		return Object.values(currentQuest.objectives).map((objective) => {
			let current = 0;
			let targetName = objective.target;
			if (objective.type === "collect") {
				const itemData = itemCatalog[objective.target];
				if (itemData) targetName = itemData.name;
				const inventory = playerInventory?.items || [];
				current = inventory.reduce((total, item) => {
					if (item.itemKey === objective.target) {
						return total + (item.quantity || 1);
					}
					return total;
				}, 0);
			} else {
				current =
					questsState?.activeById?.[currentQuest.id]?.progress?.[
						objective.progressKey
					] || 0;
			}
			return { ...objective, current, targetName };
		});
	}, [currentQuest, playerInventory, questsState]);

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
	const handleBackdropClick = useCallback(
		(e) => {
			if (e.target === dialogRef.current && onClose) {
				onClose();
			}
		},
		[onClose],
	);

	const resetQuestConversation = useCallback(() => {
		setQuestConversationState(null);
		if (onOptionSelect) {
			onOptionSelect(null);
		}
	}, [onOptionSelect]);

	const handleAcceptQuestClick = useCallback(() => {
		if (!currentQuest || !npc) return;
		dispatch(playerIntentAcceptQuest(currentQuest.id, npc.id));
		resetQuestConversation();
		if (onClose) onClose();
	}, [currentQuest, npc, dispatch, resetQuestConversation, onClose]);

	const handleCompleteQuestClick = useCallback(() => {
		if (!currentQuest || !npc) return;
		dispatch(playerIntentCompleteQuest(currentQuest.id, npc.id));
		resetQuestConversation();
		if (onClose) onClose();
	}, [currentQuest, npc, dispatch, resetQuestConversation, onClose]);

	const handleDeclineQuestClick = useCallback(() => {
		resetQuestConversation();
	}, [resetQuestConversation]);

	const handleOptionClick = useCallback(
		(index) => {
			if (!npc || !npc.dialogue?.options) return;

			const option = npc.dialogue.options[index];

			if (option?.startsQuestId) {
				const questForOption = questCatalog[option.startsQuestId];

				if (questForOption && questForOption.giverNpcId === npc.id) {
					const isThisQuestCompleted =
						questsState?.completedQuests?.[option.startsQuestId];

					if (!isThisQuestCompleted) {
						setQuestConversationState({
							questId: option.startsQuestId,
							stepIndex: 0,
						});
						if (onOptionSelect) {
							onOptionSelect(null);
						}
						return;
					}
				}
			}

			if (onOptionSelect) {
				onOptionSelect(index);
			}
		},
		[npc, questsState, onOptionSelect],
	);

	const advanceQuestConversation = useCallback(() => {
		if (!questConversationState || !currentQuest) return;

		const steps = currentQuest?.conversation || [];
		if (steps.length === 0) {
			resetQuestConversation();
			return;
		}

		const nextIndex = questConversationState.stepIndex + 1;
		if (nextIndex >= steps.length) {
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
	}, [questConversationState, currentQuest, resetQuestConversation]);

	// Trade handlers
	const handlePlayerItemSell = useCallback(
		(_event, item) => {
			if (!item.sellable?.gold) {
				setTradeMessage({ type: "error", message: "This item cannot be sold." });
				return;
			}
			const sellPrice = item.sellable.gold;
			dispatch(
				removePlayerItem({ inventoryId: "player", itemId: item.id, quantity: 1 }),
			);
			dispatch(addGold(sellPrice));
			setTradeMessage({
				type: "success",
				message: `Sold ${item.name} for ${sellPrice} gold.`,
			});
		},
		[dispatch],
	);

	const handleNpcItemBuy = useCallback(
		(_event, item) => {
			// Try direct item.buy first
			let buyPrice = null;
			if (item && item.buy && typeof item.buy.gold === "number") {
				buyPrice = item.buy.gold;
			} 
			// Fallback to itemCatalog
			else if (item && item.itemKey && itemCatalog[item.itemKey] && itemCatalog[item.itemKey].buy && typeof itemCatalog[item.itemKey].buy.gold === "number") {
				buyPrice = itemCatalog[item.itemKey].buy.gold;
			}

			if (buyPrice === null || buyPrice === undefined) {
				setTradeMessage({
					type: "error",
					message: "This item cannot be bought.",
				});
				return;
			}

			if (playerGold < buyPrice) {
				setTradeMessage({ type: "error", message: "Not enough gold!" });
				return;
			}

			if (playerInventory.items.length >= playerInventory.maxSlots) {
				setTradeMessage({ type: "error", message: "Inventory is full!" });
				return;
			}

			dispatch(spendGold(buyPrice));

			// Create new item from catalog for proper structure
			const catalogItem = itemCatalog[item.itemKey] || item;
			const isStackable =
				catalogItem.type === "consumable" || catalogItem.type === "material";
			const newItem = {
				...catalogItem,
				itemKey: item.itemKey || catalogItem.id,
				quantity: isStackable ? 1 : undefined,
			};
			dispatch(addPlayerItem({ inventoryId: "player", item: newItem }));

			setTradeMessage({
				type: "success",
				message: `Bought ${item.name} for ${buyPrice} gold.`,
			});
		},
		[dispatch, playerGold, playerInventory, itemCatalog],
	);

	// Text getters
	const getResponseText = useCallback(() => {
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
	}, [questConversationState, currentQuest, npc, selectedOption]);

	const getPlayerText = useCallback(() => {
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
	}, [questConversationState, currentQuest, npc, selectedOption]);

	return {
		// Data
		npc,
		player,
		playerInventory,
		npcInventory,
		playerGold,
		currentQuest,
		isQuestActive,
		isQuestCompleted,
		isQuestReadyToComplete,
		visibleDialogueOptions,
		questObjectivesWithProgress,
		questConversationState,
		tradeMessage,
		setTradeMessage,
		// Handlers
		handleAcceptQuestClick,
		handleCompleteQuestClick,
		handleDeclineQuestClick,
		handleOptionClick,
		handlePlayerItemSell,
		handleNpcItemBuy,
		advanceQuestConversation,
		getResponseText,
		getPlayerText,
		// Refs
		dialogRef,
		handleBackdropClick,
		// Close
		onClose,
	};
};

export default useNPCDialog;
