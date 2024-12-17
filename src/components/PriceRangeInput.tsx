import React from 'react';

interface PriceRangeInputProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export const PriceRangeInput: React.FC<PriceRangeInputProps> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range (₹)</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinChange(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-gray-100"
            min="0"
            step="1000"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-gray-100"
            min={minPrice}
            step="1000"
          />
        </div>
      </div>
    </div>
  );
};