import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  assignWorkerToBuilding,
  unassignWorker,
  assignWorkerToBuildingWithEvent,
  unassignWorkerWithEvent,
} from "../../../store/slices/playerSlice";

const WorkerCard = ({ worker, buildings }) => {
  const dispatch = useDispatch();

  // Handle worker assignment to a building
  const handleAssign = useCallback(
    (buildingId) => {
      const building = buildings.find((b) => b.id === buildingId);
      dispatch(
        assignWorkerToBuildingWithEvent(worker.id, buildingId, building?.name),
      );
    },
    [dispatch, worker.id, buildings],
  );

  // Handle worker unassignment from a building
  const handleUnassign = useCallback(() => {
    if (worker.assignedBuildingId) {
      const building = buildings.find(
        (b) => b.id === worker.assignedBuildingId,
      );
      dispatch(unassignWorkerWithEvent(worker.id, building?.name));
    }
  }, [dispatch, worker.id, worker.assignedBuildingId, buildings]);

  return (
    <div className="worker-card">
      <div className="worker-avatar">
        <img
          src={`assets/avatars/${worker.avatar}`}
          alt={worker.name}
          className={worker.assignedBuildingId ? "bg-red" : "bg-green"}
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
            <option value="" disabled>
              Assign
            </option>
            {buildings.map((building) => (
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
