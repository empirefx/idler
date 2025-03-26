import React from 'react';

const ResourceDisplay = ({ resources }) => {
  return (
    <div className="resource-display">
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