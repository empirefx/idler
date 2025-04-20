import React from 'react';

const ProgressBar = ({ value, max }) => {
  const percent = Math.round((value / max) * 100);
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${percent}%` }}
      >
        <span>{value}</span>
      </div>
      {value < max && (
        <div className="progress-bar__remain">
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
