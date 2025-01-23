"use client";

import { useState, useCallback } from "react";

interface PriceFilterProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    isSale: boolean;
    isInStock: boolean;
    isNewArrival: boolean;
  }) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isSale, setIsSale] = useState(false);
  const [isInStock, setIsInStock] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);

  // Debounced filter change using useCallback
  const handleFilterChange = useCallback(() => {
    if (minPrice > maxPrice) {
      alert("Minimum price cannot be greater than maximum price.");
      return;
    }

    onFilterChange({ minPrice, maxPrice, isSale, isInStock, isNewArrival });
  }, [minPrice, maxPrice, isSale, isInStock, isNewArrival, onFilterChange]);

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md sticky top-0 bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isSale}
              onChange={() => setIsSale(!isSale)}
              className="mr-2"
            />
            On Sale
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isInStock}
              onChange={() => setIsInStock(!isInStock)}
              className="mr-2"
            />
            In Stock
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={() => setIsNewArrival(!isNewArrival)}
              className="mr-2"
            />
            New Arrival
          </label>
        </div>
        <button
          onClick={handleFilterChange}
          className="w-full py-2 px-4 bg-[#029FAE] text-white rounded-md hover:bg-[#028C8A]"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;

