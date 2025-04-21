import React from 'react';
import { useSelector } from 'react-redux';
import InventoryDisplay from '../display/InventoryDisplay';
import PlaceCard from '../PlaceCard';
import { selectCurrentPlace, selectAvailableConnections } from '../../../store/slices/placesSlice';
import { selectVaultByPlaceId } from '../../../store/slices/inventorySlice';

const PlacesSection = () => {
  const currentPlace = useSelector(selectCurrentPlace);
  const vault = useSelector(state => selectVaultByPlaceId(state, currentPlace.id));
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
        {availableConnections.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default PlacesSection;
