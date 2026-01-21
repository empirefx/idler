import React from 'react';

function QuantitySlider({ 
  value, 
  onChange, 
  min = 1, 
  max, 
  disabled = false,
  className = ''
}) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className={`quantity-slider ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="slider-input"
      />
      <div className="slider-value">
        {value}
      </div>
    </div>
  );
}

export default QuantitySlider;