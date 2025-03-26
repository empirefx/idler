import React from 'react';

const BuildingCard = ({ building, quantity }) => {
  return (
    <div className="building-card">
      <h3>{building.name}</h3>
      <p>{building.description}</p>
      <div className="building-stats">
        <span>Production: {building.productionType}</span>
        <span>Worker: {building.assignedWorkerId ? 'Assigned' : 'Unassigned'}</span>
      </div>
    </div>
  );
};

export default BuildingCard;