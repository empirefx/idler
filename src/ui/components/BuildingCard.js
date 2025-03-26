import React from 'react';

const BuildingCard = ({ building, quantity, onAdd, onRemove }) => {
  return (
    <div className="building-card">
      <h3>{building.name}</h3>
      <p>{building.description}</p>
      <div className="building-stats">
        <span>Production: {building.productionType}</span>
        <span>Worker: {building.assignedWorkerId ? 'Assigned' : 'Unassigned'}</span>
      </div>
      <div className="building-actions">
        <button onClick={onAdd}>Add</button>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default BuildingCard; 