import React from "react";

type SizeSelectorProps = {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  availableSizes: string[];
};

const SizeSelector = ({ selectedSize, setSelectedSize, availableSizes }: SizeSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="text-gray-700 font-medium">Size</label>
      <div className="flex items-center gap-4 mt-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-16 h-10 bg-gray-200 text-gray-700 rounded-md border-2 border-transparent hover:border-[#029FAE] hover:bg-[#029FAE] hover:text-white transition-all duration-300 ${selectedSize === size ? 'bg-[#029FAE] text-white' : ''}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
