import React from 'react';

const ResourceDisplay = ({ resources, gameState }) => {
  const player = gameState?.player;
  console.log('ResourceDisplay - player:', player);
  console.log('ResourceDisplay - resources:', resources);
  
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
      {Object.entries(resources || {}).map(([resource, amount]) => (
        <div key={resource} className="resource-item">
          <span className="resource-name">{resource}</span>
          <span className="resource-amount">{`${Math.floor(amount) || 0}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourceDisplay;