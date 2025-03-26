import React from 'react';

const ResourceDisplay = ({ resources, gameState }) => {
  const player = gameState?.player;
  
  return (
    <div className="resource-display">
      {player && (
        <div className="resource-item">
          <span className="resource-name">Workers</span>
          <span className="resource-amount">{player.workers.size}/{player.MAX_WORKERS}</span>
        </div>
      )}
      {Object.entries(resources).map(([resource, amount]) => (
        <div key={resource} className="resource-item">
          <span className="resource-name">{resource}</span>
          <span className="resource-amount">{Math.floor(amount)}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourceDisplay; 