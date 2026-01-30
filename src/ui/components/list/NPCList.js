import React from 'react';

import NPCCard from '../card/NPCCard';

const NPCList = ({ npcs }) => (
  <div className="npc-list">
    {npcs.length > 0 ? (
      npcs.map(npc => <NPCCard key={npc.id} npc={npc} />)
    ) : (
      <p className="no-npcs-message">No NPCs available in this location</p>
    )}
  </div>
);

export default NPCList;
