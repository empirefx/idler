import React from 'react';

// Modal-style dialog for level-up choices
const NewLevelDialog = ({ onChoose, onCancel }) => (
  <div className="dialog" onClick={onCancel}>
    <p>Choose bonus:</p>
    <div className="player-options" onClick={e => e.stopPropagation()}>
      <button className="select-btn" onClick={() => onChoose({ strength: 1 })}>+1 STR</button>
      <button className="select-btn" onClick={() => onChoose({ defense: 2 })}>+2 DEF</button>
      <button className="select-btn" onClick={() => onChoose({ agility: 1 })}>+1 AGI</button>
      <button className="select-btn" onClick={() => onChoose({ vitality: 3 })}>+3 VIT</button>
    </div>

    <button onClick={onCancel}>Cancel</button>
  </div>
);

export default NewLevelDialog;
