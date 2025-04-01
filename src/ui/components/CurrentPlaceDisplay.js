import React from 'react';
import { useGameState } from '../hooks/useGameState';

const CurrentPlaceDisplay = () => {
  const { getCurrentPlaceData } = useGameState();
  const currentPlace = getCurrentPlaceData() || 
    { id: 'unknown', name: 'Unknown Location', description: 'Location details not available' };

  return (
    <div className="current-place">
      {/* <h2>Current Location</h2> */}
      <div className="place-info">
        <h3 data-text={currentPlace.name}>{currentPlace.name}</h3>
        {/* <p className="place-description">{currentPlace.description}</p> */}
        {/* <div className="place-id">Location ID: {currentPlace.id}</div> */}
      </div>
    </div>
  );
};

export default CurrentPlaceDisplay;
