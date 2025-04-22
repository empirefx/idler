import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function LogDisplay() {
  const logs = useSelector(state => state.logs);
  const containerRef = useRef(null);

  // Scroll to bottom on update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="log-display" ref={containerRef}>
      {logs.map(l => (
        <div key={l.id} className="log-entry">
          <small>{new Date(l.ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</small>&nbsp;{l.message}
        </div>
      ))}
    </div>
  );
}
