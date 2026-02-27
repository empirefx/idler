import React, { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import Item from "../common/Item";
import { itemCatalog } from "../../../data/itemCatalog";
import {
  assignWorkerToSocketWithEvent,
  unassignWorkerFromSocketWithEvent,
} from "../../../store/slices/playerSlice";

const WorkerAvatar = ({ avatar, name, bgClass }) => (
  <div className="worker-avatar">
    <img
      src={`assets/avatars/${avatar}`}
      alt={name}
      className={bgClass}
      width={45}
      height={45}
    />
  </div>
);

const WorkerInfo = ({ name }) => {
  const firstName = name ? name.split(" ")[0] : name;
  return (
    <div className="worker-info">
      <p>{firstName}</p>
    </div>
  );
};

const WorkerCard = ({
  worker,
  placeId,
  availableSocketIndexes,
  occupiedSocketIndexes,
  socketData,
  getSocketMaterials,
  isAssigned = false,
}) => {
  const dispatch = useDispatch();

  const handleMaterialClick = useCallback(
    (socketIndex, material, assignmentPlaceId) => {
      if (isAssigned) {
        dispatch(unassignWorkerFromSocketWithEvent(worker.id, assignmentPlaceId));
      } else {
        dispatch(assignWorkerToSocketWithEvent(worker.id, placeId, socketIndex, material));
      }
    },
    [dispatch, worker, isAssigned, placeId]
  );

  const materials = useMemo(() => {
    if (isAssigned && worker.assignments) {
      const assignments = Object.entries(worker.assignments);
      if (assignments.length > 0) {
        const [assignmentPlaceId, assignment] = assignments[0];
        const item = itemCatalog[assignment.material];
        return [{
          socketIndex: assignment.socketIndex,
          mat: {
            material: assignment.material,
            icon: item?.icon || assignment.material,
          },
          assignmentPlaceId,
        }];
      }
    }
    
    if (!availableSocketIndexes || availableSocketIndexes.length === 0) {
      return [];
    }
    return availableSocketIndexes.flatMap((socketIndex) =>
      getSocketMaterials(socketIndex).map((mat) => ({ socketIndex, mat }))
    );
  }, [isAssigned, worker, placeId, availableSocketIndexes, getSocketMaterials, socketData]);

  return (
    <div className={`worker-card${isAssigned ? " assigned" : ""}`}>
      <WorkerAvatar avatar={worker.avatar} name={worker.name} bgClass={isAssigned ? "bg-red" : "bg-green"} />
      <WorkerInfo name={worker.name} />
      {(isAssigned || materials.length > 0) && (
      <span>{isAssigned ? "Working on ⏵ " : "Select material ⏷"}</span>
      )}
      {materials.length > 0 && (
      <div className="worker-materials">
        {materials.map(({ socketIndex, mat, assignmentPlaceId }) => (
          <Item
            key={`${socketIndex}-${mat.material}`}
            item={{ icon: mat.icon, name: mat.material }}
            showItemInfo={false}
            onClick={() => handleMaterialClick(socketIndex, mat.material, assignmentPlaceId)}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default WorkerCard;
