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

const WorkerInfo = ({ name }) => (
  <div className="worker-info">
    <p>{name}</p>
  </div>
);

const WorkerCard = ({
  worker,
  availableSocketIndexes,
  occupiedSockets,
  getSocketMaterials,
  isAssigned = false,
}) => {
  const dispatch = useDispatch();

  const handleMaterialClick = useCallback(
    (socketIndex, material) => {
      if (isAssigned && worker.assignedSocketIndex === socketIndex && worker.assignedMaterial === material) {
        dispatch(unassignWorkerFromSocketWithEvent(worker.id));
      } else if (!isAssigned) {
        dispatch(assignWorkerToSocketWithEvent(worker.id, socketIndex, material));
      }
    },
    [dispatch, worker, isAssigned]
  );

  const materials = useMemo(() => {
    if (isAssigned && worker.assignedMaterial) {
      const item = itemCatalog[worker.assignedMaterial];
      return [{
        socketIndex: worker.assignedSocketIndex,
        mat: {
          material: worker.assignedMaterial,
          icon: item?.icon || worker.assignedMaterial,
        },
      }];
    }
    return availableSocketIndexes.flatMap((socketIndex) =>
      getSocketMaterials(socketIndex).map((mat) => ({ socketIndex, mat }))
    );
  }, [isAssigned, worker, availableSocketIndexes, getSocketMaterials]);

  return (
    <div className={`worker-card${isAssigned ? " assigned" : ""}`}>
      <WorkerAvatar avatar={worker.avatar} name={worker.name} bgClass={isAssigned ? "bg-red" : "bg-green"} />
      <WorkerInfo name={worker.name} />
      <span>{isAssigned ? "Working on ⏷" : "Select material ⏷"}</span>
      <div className="worker-materials">
        {materials.map(({ socketIndex, mat }) => (
          <Item
            key={`${socketIndex}-${mat.material}`}
            item={{ icon: mat.icon, name: mat.material }}
            showItemInfo={false}
            onClick={() => handleMaterialClick(socketIndex, mat.material)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(WorkerCard);