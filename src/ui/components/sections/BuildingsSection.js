import React from 'react';
import { useSelector } from 'react-redux';
import BuildingCard from '../BuildingCard';
import { selectAllBuildings } from '../../../store/slices/buildingsSlice';
import { selectCurrentPlaceBuildings } from '../../../store/slices/placesSlice';

const BuildingsSection = () => {
  const buildings = useSelector(selectAllBuildings);
  const currentBuildings = useSelector(selectCurrentPlaceBuildings);

  return (
    <section className="buildings-section">
      <div className="buildings-grid">
        {currentBuildings.map(id => {
          const building = buildings[id];
          return building ? <BuildingCard key={id} building={building} /> : null;
        })}
      </div>
    </section>
  );
};

export default BuildingsSection;
