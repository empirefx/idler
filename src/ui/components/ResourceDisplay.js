import React from 'react';

const ResourceDisplay = ({ resources, gameState }) => {
  const player = gameState?.player;
  
  // Safely get worker count and max workers
  const workerCount = player?.workers?.size ?? 0;
  const maxWorkers = player?.MAX_WORKERS ?? 0;
  
  return (
    <div className="resource-display">
      {player && (
        <div className="resource-item">
          <span className="resource-name">Workers</span>
          <span className="resource-amount">{`${workerCount}/${maxWorkers}`}</span>
        </div>
      )}
      <div className="resource-item">
        <span className="resource-name">Food</span>
        <span className="resource-amount">{Math.floor(resources?.food ?? 0)}</span>
      </div>
      <div className="resource-item">
        <span className="resource-name">Materials</span>
        <span className="resource-amount">{Math.floor(resources?.materials ?? 0)}</span>
      </div>
    </div>
  );
};

export default ResourceDisplay;