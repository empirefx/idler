import React, { useState } from 'react';

const ToolTip = ({ item, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="tooltip-box">
          <p><strong>{item.name}</strong></p>
          <p><em>"{item.description}"</em></p>
          {item.type === 'consumable' && (
            <p style={{color:'green'}}>heal: {item.consumable?.heal}</p>
          )}
          <hr></hr>
          <p>weight: {item.weight}</p>
          {item.stats && (
            <div className="tooltip-stats">
              {Object.entries(item.stats).map(([stat, value]) => (
                <p key={stat}>{stat}: +{value}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
