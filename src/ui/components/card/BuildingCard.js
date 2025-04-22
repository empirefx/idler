import React from 'react';

const BuildingCard = ({ building }) => {
  if (!building) return null;

  return (
    <div className="building-card" >
      <img src={`assets/icons/buildings/${building.icon}`} alt={building.name} width={100} height={100} />
    </div>
  );
};

export default React.memo(BuildingCard);