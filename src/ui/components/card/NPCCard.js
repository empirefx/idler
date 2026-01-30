import React from 'react';

const NPCCard = ({ npc }) => {
  if (!npc || typeof npc !== 'object') {
    return null;
  }

  const { name, description, avatar } = npc;

  return (
    <div className="npc-card">
      <div className={`npc-avatar avatar avatar_${avatar} small`}>
      </div>
      <div className="npc-info">
        <h3>{name}</h3>
        <p>{description}</p>
        {npc.hasInventory && (
          <><h4>Actions</h4><span className="npc-inventory-badge">⇆ Shop</span></>
        )}
      </div>
    </div>
  );
};

export default React.memo(NPCCard);
