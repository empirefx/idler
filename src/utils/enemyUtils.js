import { enemyCatalog } from "../data/enemyCatalog";

/**
 * Get enemy display name from Redux state by enemy ID
 * @param {Object} state - Redux state
 * @param {string} enemyId - Enemy instance ID
 * @returns {string} - Enemy display name or 'Unknown Enemy'
 */
export const getEnemyDisplayName = (state, enemyId) => {
	if (!enemyId || enemyId === "player") {
		return "Player";
	}

	const enemy = state.enemies?.byId?.[enemyId];
	return enemy?.name || "Unknown Enemy";
};

/**
 * Get enemy display name from enemy catalog by type
 * @param {string} enemyType - Enemy type ID (e.g., 'forest_beast')
 * @returns {string} - Enemy display name or 'Unknown Enemy'
 */
export const getEnemyTypeDisplayName = (enemyType) => {
	if (!enemyType || enemyType === "player") {
		return "Player";
	}

	return enemyCatalog[enemyType]?.name || "Unknown Enemy";
};
