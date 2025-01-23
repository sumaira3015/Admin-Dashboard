import React from "react";

type SizeSelectorProps = {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
};

const SizeSelector = ({ selectedSize, setSelectedSize }: SizeSelectorProps) => {
  const sizes = ["S", "M", "L", "XL"];
  return (
    <div className="mb-6">
      <label className="text-gray-700 font-medium">Size</label>
      <div className="flex gap-4 mt-2">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-md text-white font-bold ${
              selectedSize === size ? "bg-[#029FAE] scale-110" : "bg-gray-200 hover:bg-[#027f85] transition-all"
            }`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
