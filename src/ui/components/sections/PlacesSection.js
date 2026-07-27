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
		selectInventoryByPlaceId(state, currentPlace.id),
	);
	const availableConnections = useSelector(selectAvailableConnections);

	return (
		<section className="places-section">
			{currentPlace && vault && (
				<div className="place-vault">
					<h3>Vault</h3>
					<InventoryDisplay
						inventoryId={currentPlace.id}
						otherInventoryId="player"
						isVault={true}
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
