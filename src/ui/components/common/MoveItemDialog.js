// src/ui/components/MoveItemDialog.js
import React from 'react';

function MoveItemDialog({ item, onConfirm, onCancel }) {
  return (
    <div className="dialog" onClick={onCancel}>
      <div className="move-item-dialog">
        <div>
          Move "{item.name}" to {item.isVault ? 'inventory' : 'vault'}?
        </div>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default MoveItemDialog;