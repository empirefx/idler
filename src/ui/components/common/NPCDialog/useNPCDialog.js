import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemCatalog } from "../../../../../shared/data/itemCatalog";
import { questCatalog } from "../../../../../shared/data/questCatalog";
import {
	selectInventoryById,
	selectInventoryByNpcId,
} from "../../../../store/slices/inventorySlice";
import { selectNPCById } from "../../../../store/slices/npcSlice";
import {
	selectPlayer,
} from "../../../../store/slices/playerSlice";
import { getWs } from "../../../../store/ws";
import useDialog from "../useDialog";

const useNPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const dispatch = useDispatch();

	const player = useSelector(selectPlayer);
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);
	const npc = useSelector((state) => selectNPCById(state, npcId));
	const npcInventory = useSelector((state) =>
		selectInventoryByNpcId(state, npcId),
	);
	const questsState = useSelector((state) => state.quests);

	const [questConversationState, setQuestConversationState] = useState(null);
	const [tradeMessage, setTradeMessage] = useState(null);
	const [tradePending, setTradePending] = useState(false);

	const [prevDialogState, setPrevDialogState] = useState({ isOpen, npcId });
	if (prevDialogState.isOpen !== isOpen || prevDialogState.npcId !== npcId) {
		setPrevDialogState({ isOpen, npcId });
		if (isOpen) {
			setQuestConversationState(null);
			setTradeMessage(null);
			setTradePending(false);
		}
	}

	const { dialogRef, handleBackdropClick } = useDialog({ isOpen, onClose });

	// Get player gold amount
	const playerGold = player.gold || 0;

	// Listen for trade results from server
	useEffect(() => {
		if (!isOpen) return;
		const ws = getWs();
		if (!ws) return;

		const handler = (event) => {
			const data = JSON.parse(event.data);
			if (data.type === "TRADE_RESULT") {
				setTradePending(false);
				setTradeMessage({ type: data.data?.success ? "success" : "error", message: data.data?.message || "Trade completed" });
			} else if (data.type === "ERROR" && tradePending) {
				setTradePending(false);
				setTradeMessage({ type: "error", message: data.data?.message || data.message || "Trade failed" });
			}
		};

		ws.addEventListener("message", handler);
		return () => ws.removeEventListener("message", handler);
	}, [isOpen, tradePending]);

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
					if (item.icon === objective.target) {
						return total + (item.quantity || 1);
					}
					return total;
				}, 0);
				return count >= objective.required;
			}
			const questProgress =
				questsState?.activeById?.[currentQuest.id]?.progress;
			return (
				(questProgress?.[objective.progressKey] || 0) >= objective.required
			);
		});
	}, [
		currentQuest,
		isQuestActive,
		isQuestCompleted,
		questsState,
		playerInventory,
	]);

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
					if (item.icon === objective.target) {
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

	const resetQuestConversation = useCallback(() => {
		setQuestConversationState(null);
		if (onOptionSelect) {
			onOptionSelect(null);
		}
	}, [onOptionSelect]);

	const handleAcceptQuestClick = useCallback(() => {
		if (!currentQuest || !npc) return;
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "ACCEPT_QUEST", questId: currentQuest.id }));
		}
		resetQuestConversation();
		if (onClose) onClose();
	}, [currentQuest, npc, resetQuestConversation, onClose]);

	const handleCompleteQuestClick = useCallback(() => {
		if (!currentQuest || !npc) return;
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "COMPLETE_QUEST", questId: currentQuest.id }));
		}
		resetQuestConversation();
		if (onClose) onClose();
	}, [currentQuest, npc, resetQuestConversation, onClose]);

	const handleDeclineQuestClick = useCallback(() => {
		resetQuestConversation();
	}, [resetQuestConversation]);

	const handleOptionClick = useCallback(
		(index) => {
			if (!npc?.dialogue?.options) return;

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
			const ws = getWs();
			if (ws) {
				setTradePending(true);
				ws.send(JSON.stringify({
					type: "SELL_ITEM",
					itemId: item.id,
					quantity: 1,
				}));
			}
		},
		[],
	);

	const handleNpcItemBuy = useCallback(
		(_event, item) => {
			let buyPrice = null;
			if (item?.buy && typeof item.buy.gold === "number") {
				buyPrice = item.buy.gold;
			}
			else if (
				item?.icon &&
				itemCatalog[item.icon] &&
				itemCatalog[item.icon].buy &&
				typeof itemCatalog[item.icon].buy.gold === "number"
			) {
				buyPrice = itemCatalog[item.icon].buy.gold;
			}

			if (buyPrice === null || buyPrice === undefined) {
				setTradeMessage({
					type: "error",
					message: "This item cannot be bought.",
				});
				return;
			}

			const ws = getWs();
			if (ws) {
				setTradePending(true);
				ws.send(JSON.stringify({
					type: "BUY_ITEM",
					itemId: item.id,
					quantity: 1,
					npcId: npc?.id,
				}));
			}
		},
		[playerGold, npc],
	);

	const getConversationStep = useCallback(() => {
		if (!questConversationState || !currentQuest) return null;
		const steps = currentQuest?.conversation || [];
		return (
			steps[questConversationState.stepIndex] || steps[steps.length - 1] || null
		);
	}, [questConversationState, currentQuest]);

	// Text getters
	const getResponseText = useCallback(() => {
		const step = getConversationStep();
		if (step?.npcText) {
			return step.npcText;
		}

		if (!npc.dialogue) return "This NPC has nothing to say.";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].response;
		}
		return npc.dialogue.initial || "Hello, traveler.";
	}, [getConversationStep, npc, selectedOption]);

	const getPlayerText = useCallback(() => {
		const step = getConversationStep();
		if (step?.playerText) {
			return step.playerText;
		}

		if (!npc.dialogue?.options) return "";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].text;
		}
		return "...";
	}, [getConversationStep, npc, selectedOption]);

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
		tradePending,
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
