import React from 'react';

const WorkerCard = ({ worker, buildings, onAssign, onUnassign }) => {
  return (
    <div className="worker-card">
      <h3>{worker.name}</h3>
      <div className="worker-status">
        <span>Status: {worker.isAssigned() ? 'Assigned' : 'Available'}</span>
        {worker.isAssigned() && (
          <span>Building: {buildings.find(b => b.id === worker.assignedBuildingId)?.name}</span>
        )}
      </div>
      <div className="worker-actions">
        {!worker.isAssigned() && buildings && buildings.length > 0 ? (
          <select 
            onChange={(e) => onAssign(worker.id, e.target.value)}
            value=""
          >
            <option value="" disabled>Assign to building...</option>
            {buildings.map(building => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        ) : worker.isAssigned() ?(
          <button onClick={() => onUnassign(worker.id)}>Unassign</button>
        ) : null }
      </div>
    </div>
  );
};

export default WorkerCard; 