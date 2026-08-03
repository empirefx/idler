import { useSelector } from "react-redux";

import "../../../styles/sections/places-section.css";
import { selectInventoryByPlaceId } from "../../../store/slices/inventorySlice";
import {
	selectAvailableConnections,
	selectCurrentPlace,
} from "../../../store/slices/placesSlice";
import PlaceCard from "../card/PlaceCard";
import InventoryDisplay from "../display/InventoryDisplay";

const PlacesSection = () => {
	const currentPlace = useSelector(selectCurrentPlace);
	const vault = useSelector((state) =>
		currentPlace ? selectInventoryByPlaceId(state, currentPlace.id) : null,
	);
	const availableConnections = useSelector(selectAvailableConnections);

	return (
		<section className="places-section">
			{currentPlace && vault && currentPlace.id && (
				<div className="place-vault">
					<h3>Vault</h3>
					<InventoryDisplay
						inventoryId={vault?.id}
						otherInventoryId="player"
					/>
				</div>
			)}
			<h2>Locations</h2>
			<div className="places-grid">
				{availableConnections.map((place) => (
					<PlaceCard key={place.id} place={place} />
				))}
			</div>
		</section>
	);
};

export default PlacesSection;
