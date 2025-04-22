import React from 'react';
import { useSelector } from 'react-redux';

import '../../../styles/sections/resources-section.css';
import { selectResources } from '../../../store/slices/playerSlice';
import ResourceDisplay from '../display/ResourceDisplay';

const ResourcesSection = ({ clearCache }) => {
  const resources = useSelector(selectResources);
  return (
    <section className="resources-section">
      <ResourceDisplay resources={resources} />
      <button onClick={clearCache} className="clear-cache-btn">Clear Cache</button>
    </section>
  );
};

export default ResourcesSection;
