import React from 'react';

const ControlDisplay = ({ isInCombat, onToggleCombat }) => (
  <div className="control-display">
    <div className="combat">
      <button
        onClick={onToggleCombat}
        className={`combat-btn ${isInCombat ? 'stop' : 'engage'}`}
      >
        {isInCombat ? 'Stop Combat' : 'Engage Combat'}
      </button>
    </div>
  </div>
);

export default ControlDisplay;
