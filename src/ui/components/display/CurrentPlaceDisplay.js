import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";

const CurrentPlaceDisplay = () => {
  const currentPlace = useSelector(selectCurrentPlace);
  return (
    <div className="current-place">
      <div className="place-info">
        <h3 data-text={currentPlace.name}>{currentPlace.name}</h3>
      </div>
    </div>
  );
};

export default CurrentPlaceDisplay;
