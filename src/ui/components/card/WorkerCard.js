import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { assignWorkerToBuilding, unassignWorker } from '../../../store/slices/playerSlice';

const WorkerCard = ({ worker, buildings }) => {
  const dispatch = useDispatch();

  // Handle worker assignment to a building
  const handleAssign = useCallback((buildingId) => {
    dispatch(assignWorkerToBuilding({ workerId: worker.id, buildingId }));
  }, [dispatch, worker.id]);
  
  // Handle worker unassignment from a building
  const handleUnassign = useCallback(() => {
    dispatch(unassignWorker({ workerId: worker.id }));
  }, [dispatch, worker.id]);

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
          <select onChange={(e) => handleAssign(e.target.value)} value="">
            <option value="" disabled>Assign</option>
            {buildings.map(building => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        ) : worker.assignedBuildingId ? (
          <button onClick={handleUnassign}>Unassign</button>
        ) : null}
      </div>
      {worker.assignedBuildingId && (
        <div className="worker-status">
          <span>Working in: {worker.assignedBuildingId}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(WorkerCard);