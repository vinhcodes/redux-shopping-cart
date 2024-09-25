import React, { useState } from "react";
import "./index.css"; // Import necessary CSS

interface SliderBarProps {
  min: number;
  max: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onPriceChange: (min: number, max: number) => void;
}

const SliderBar: React.FC<SliderBarProps> = ({
  min,
  max,
  defaultMinValue = min,
  defaultMaxValue = max,
  onPriceChange,
}) => {
  const [minValue, setMinValue] = useState<number>(defaultMinValue);
  const [maxValue, setMaxValue] = useState<number>(defaultMaxValue);

  // Handle min value change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1); // Ensure min handle can't overlap max handle
    setMinValue(value);
    onPriceChange(value, maxValue);
  };

  // Handle max value change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1); // Ensure max handle can't overlap min handle
    setMaxValue(value);
    onPriceChange(minValue, value);
  };

  return (
    <div className="price-range-slider">
      <div className="slider-track">
        {/* Full range background */}
        <div className="slider-background"></div>

        {/* Min and Max sliders */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="slider-thumb min-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="slider-thumb max-thumb"
        />

        {/* The highlighted range between the two thumbs */}
        <div
          className="slider-range"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        ></div>
      </div>

      {/* Display Min and Max Prices */}
      <div className="slider-values">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
    </div>
  );
};

export default SliderBar;


