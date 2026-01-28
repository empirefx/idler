import React, { useEffect, useRef } from 'react';
import './../../../styles/components/CircularProgressTimer.css';

const CircularProgressTimer = ({
  time = 0,
  isRunning = false,
  enemyId,
  onComplete,
  size = 30,
  primaryColor = '#5081FF',
  secondaryColor = '#eee'
}) => {
  const startTimeRef = useRef(time || 1);
  const prevTimeRef = useRef(time);

  // Detect new cycle (countdown reset)
  useEffect(() => {
    if (time > prevTimeRef.current) {
      startTimeRef.current = time || 1;
    }
    if (time === 0) onComplete?.();
    prevTimeRef.current = time;
  }, [time, enemyId, onComplete]);

  const start = startTimeRef.current;
  const progress = Math.min(100, Math.max(0, ((start - time) / start) * 100));

  console.log('PROGRESS:', progress);

  const active = isRunning && time > 0;

  return (
    <div className="circular-progress-timer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        className="timer"
        style={{
          "--size": size,
          "--progress": active ? progress : 0,
          "--primary-color": active ? primaryColor : '#eee',
          "--secondary-color": secondaryColor,
          opacity: active ? 1 : 0.3
        }}
      />
      <div style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>
        {Math.round(time)}ms
      </div>
    </div>
  );
};

export default CircularProgressTimer;
