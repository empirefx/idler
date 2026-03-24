import { useSelector, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { selectInventoryById } from "../../../store/slices/inventorySlice";
import { selectPlayerSkills } from "../../../store/slices/playerSlice";
import {
	resolveStats,
	getMaxHealth,
	rollHit,
	rollCrit,
	calculatePhysicalDamage,
	calculateMagicDamage,
	calculateRangedDamage,
} from "../../../game/core/combatCalculator";
import { getWeaponProfile } from "../../../game/utils/combatResolvers";

const selectPlayerData = createSelector(
	[(state) => selectInventoryById(state, "player"), (state) => state.player],
	(playerInventory, playerState) => ({
		playerInventory: playerInventory || { equipment: {}, items: [] },
		playerState,
	}),
);

const DerivedStatsList = ({ player }) => {
	const { playerInventory, playerState } = useSelector(
		selectPlayerData,
		shallowEqual,
	);
	const playerSkills = useSelector(selectPlayerSkills);

	const equipment = playerInventory?.equipment || {};
	const activeBuffs = playerState?.activeBuffs || [];

	const equippedWeapon = equipment["main-weapon"] || null;
	const equippedArmor = Object.values(equipment).filter(
		(item) =>
			item && item.type !== "main-weapon" && item.type !== "second-weapon",
	);

	const playerData = player || playerState;
	const finalStats = resolveStats(
		playerData,
		equippedWeapon,
		equippedArmor,
		activeBuffs,
		playerSkills,
	);
	const maxHealth = getMaxHealth(
		playerData.baseHealth || 100,
		finalStats.vitality || 0,
	);

	const { hitChance } = rollHit(finalStats.agility || 0, 0);
	const { critChance } = rollCrit(finalStats.agility || 0);

	const weaponProfile = getWeaponProfile(equippedWeapon);
	const damageType = weaponProfile.damageType || "physical";
	const flatDamage = weaponProfile.flatDamage || 0;

	const dummyEnemyStats = { defense: 0, agility: 0, wisdom: 0 };

	let damage;
	if (damageType === "magic") {
		damage = calculateMagicDamage(finalStats, dummyEnemyStats, flatDamage, false);
	} else if (damageType === "ranged") {
		damage = calculateRangedDamage(finalStats, dummyEnemyStats, flatDamage, false);
	} else {
		damage = calculatePhysicalDamage(finalStats, dummyEnemyStats, flatDamage, false);
	}

	return (
		<ul>
			<li>
				<span>Health</span>
				<b>{maxHealth}</b>
			</li>
			<li>
				<span>{damageType} Dmg</span>
				<b>{damage}</b>
			</li>
			<li>
				<span>Hit</span>
				<b>{hitChance.toFixed(0)}%</b>
			</li>
			<li>
				<span>Crit</span>
				<b>{critChance.toFixed(1)}%</b>
			</li>
			<li>
				<span>Defense</span>
				<b>{finalStats.defense || 0}</b>
			</li>
		</ul>
	);
};

export default DerivedStatsList;
