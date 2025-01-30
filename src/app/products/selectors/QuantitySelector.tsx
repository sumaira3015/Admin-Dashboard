import React from "react";

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const QuantitySelector = ({ quantity, setQuantity }: QuantitySelectorProps) => {
  return (
    <div className="mb-6">
      <label className="text-gray-700 font-medium">Quantity</label>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full hover:bg-[#029FAE] hover:text-white transition-all duration-300"
          disabled={quantity <= 1}
        >
          -
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 h-10 text-center bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#029FAE]"
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full hover:bg-[#029FAE] hover:text-white transition-all duration-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
