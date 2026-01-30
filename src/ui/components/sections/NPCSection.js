import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import '../../../styles/sections/npc-section.css';
import NPCList from '../list/NPCList';
import { selectNPCsForCurrentPlace, selectAllNPCs } from '../../../store/slices/npcSlice';

const NPCSection = () => {
  const npcs = useSelector(selectNPCsForCurrentPlace);
  const allNpcs = useSelector(selectAllNPCs);

  useEffect(() => {
    console.log('=== NPCSection Debug ===');
    console.log('All NPCs:', allNpcs);
    console.log('NPCs for current place:', npcs);
    console.log('=========================');
  }, [npcs, allNpcs]);

  if (npcs.length === 0) {
    console.log('NPCSection: No NPCs, returning null');
    return null;
  }

  console.log('NPCSection: Rendering section with', npcs.length, 'NPCs');
  return (
    <section className="npc-section">
      <div className="npc-section-content">
        <div className="npcs-grid">
          <NPCList npcs={npcs} />
        </div>
      </div>
    </section>
  );
};

export default NPCSection;
