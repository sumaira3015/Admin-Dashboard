"use client";
import * as React from "react";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
};

export const Slider = ({ value, onValueChange, min, max, step, className }: SliderProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value), value[1]])}
      className={`w-full appearance-none bg-gray-300 h-2 rounded-lg ${className}`}
    />
  );
};
