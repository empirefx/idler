import React from 'react';
import { useDispatch } from 'react-redux';
import { navigateToPlace } from '../../../store/slices/placesSlice';

const PlaceCard = ({ place }) => {
  const dispatch = useDispatch();

  const handleMove = () => {
    dispatch(navigateToPlace(place.id));
  };

  return (
    <div className="place-card" style={{ 
      backgroundImage: `url('assets/background/${place["background-image"]}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="place-top">
        <div className="place-top-left">
          <h3>{place.name}</h3>
          {/* <p className="place-description">{place.description}</p> */}
        </div>

        <div className="place-top-right">
          <button className="action-btn" onClick={handleMove}>Move</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
