export const buildingsToSocketUpdates = (buildings) => {
	if (!buildings) return [];
	return Object.entries(buildings).map(([field, building]) => {
		const [placeId, socketIndex] = field.split(":");
		return {
			placeId,
			socketIndex: Number(socketIndex),
			data: { status: "occupied", buildingId: building.id, level: building.level },
		};
	});
};
