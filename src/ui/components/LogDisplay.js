import React from 'react';
import { useSelector } from 'react-redux';

export default function LogDisplay() {
  const logs = useSelector(state => state.logs);
  return (
    <div className="log-display">
      {logs.map(l => (
        <div key={l.id} className="log-entry">
          <small>{new Date(l.ts).toLocaleTimeString()}</small>&nbsp;{l.message}
        </div>
      ))}
    </div>
  );
}
