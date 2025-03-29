import React from 'react';

const BuildingCard = ({ building }) => {
  if (!building) return null;

  return (
    <div className="building-card">
      <h3>{building.name}</h3>
      <p>{building.description}</p>
      <div className="building-stats">
        <span>Production: {building.productionType}</span>
      </div>
    </div>
  );
};

export default BuildingCard;