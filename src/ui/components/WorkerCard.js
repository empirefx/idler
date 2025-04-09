import React from 'react';

const WorkerCard = ({ worker, buildings, onAssign, onUnassign }) => {
  return (
    <div className="worker-card">
      <div className="worker-avatar">
        <img 
          src={`assets/avatars/${worker.avatar}`} 
          alt={worker.name} 
          className={worker.assignedBuildingId ? 'bg-red' : 'bg-green'}
          width={45}
          height={45}
        />
      </div>
      <div className="worker-info">
        <p>{worker.name}</p>
      </div>
      <div className="worker-actions">
        {!worker.assignedBuildingId && buildings && buildings.length > 0 ? (
          <select 
            onChange={(e) => onAssign(worker.id, e.target.value)}
            value=""
          >
            <option value="" disabled>Assign</option>
            {buildings.map(building => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        ) : worker.assignedBuildingId ?(
          <button onClick={() => onUnassign(worker.id)}>Unassign</button>
        ) : null }
      </div>
      {worker.assignedBuildingId && (
        <div className="worker-status">
          <span>Working in: {worker.assignedBuildingId}</span>
        </div>
      )}
    </div>
  );
};

export default WorkerCard; 