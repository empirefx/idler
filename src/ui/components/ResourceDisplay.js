import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

// selectors
const selectResources = state => state.player.resources || {};
const selectWorkers = state => state.player.workers || [];
const selectMaxWorkers = state => state.player.MAX_WORKERS || 0;

// Memoized selector
const selectWorkerCount = createSelector(
  [selectWorkers],
  (workers) => workers.length
);

const ResourceDisplay = () => {
  // Use selectors to get data directly from Redux store
  const resources = useSelector(selectResources);
  const workerCount = useSelector(selectWorkerCount);
  const maxWorkers = useSelector(selectMaxWorkers);

  return (
    <div className="resource-display">
      <div className="resource-item">
        <span className="resource-name">Workers</span>
        <span className="resource-amount">{`${workerCount}/${maxWorkers}`}</span>
      </div>
      <div className="resource-item">
        <span className="resource-name">Food</span>
        <span className="resource-amount">{Math.floor(resources.food || 0)}</span>
      </div>
      <div className="resource-item">
        <span className="resource-name">Materials</span>
        <span className="resource-amount">{Math.floor(resources.materials || 0)}</span>
      </div>
      <div className="resource-item">
        <span className="resource-name">Gold</span>
        <span className="resource-amount">{Math.floor(resources.gold || 0)}</span>
      </div>
    </div>
  );
};

export default ResourceDisplay;