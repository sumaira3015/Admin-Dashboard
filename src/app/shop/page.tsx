"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import FeaturedProducts from "../components/ProductListing/FeaturedProducts";
import OurProducts from "../components/ProductListing/OurProducts";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext"; 

const Shop = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1); 
  const { addToCart } = useCart();  

  const handleSizeChange = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const handleQuantityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(event.target.value));  
    setQuantity(value);
  }, []);

  // Handle add to cart functionality
  const handleAddToCart = useCallback(() => {
    const product = {
      id: "product-id",  
      name: "Library Stool Chair",  
      price: "$99.99",  
      image: "/images/product-02.png", 
      quantity,
    };
    addToCart(product); 
  }, [addToCart, quantity]);

  return (
    <div className="w-full py-10">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-10 space-y-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <Image
              src="/images/product-02.png"
              alt="Library Stool Chair"
              width={675}
              height={607}
              className="object-cover rounded-lg w-full md:h-[400px] lg:h-auto"
              loading="lazy" 
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 lg:pl-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#272343] mb-6 md:mb-4 lg:mb-4 leading-[1.2] md:leading-[1.2] md:max-w-[70%] lg:leading-[1.2]">
              Library Stool Chair
            </h1>

            <div className="flex justify-center items-center w-[110px] h-[35px] bg-[#029FAE] text-white text-sm font-semibold py-2 px-4 rounded-full mb-6 md:mb-8">
              $99.99
            </div>

            <div className="border-t border-gray-300 mb-6 md:mb-8">
              <p className="text-base md:text-md text-gray-600 mb-4 md:mt-6 max-w-[450px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim. 
                Lorem ipsum dolor sit amet, consectetur adipiscing.
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <label htmlFor="size" className="text-gray-700 font-medium">Size</label>
                <div className="flex gap-4 mt-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <div
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-md text-white font-bold ${
                        selectedSize === size
                          ? "bg-[#029FAE] scale-110"
                          : "bg-gray-200 hover:bg-[#027f85] transition-all duration-200"
                      }`}
                      role="button"
                      aria-pressed={selectedSize === size ? "true" : "false"}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity</label>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-[#027f85] hover:text-white transition-all duration-200"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>

                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-20 h-10 text-center bg-gray-100 border border-gray-300 rounded-md"
                    aria-label="Quantity"
                  />

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-[#027f85] hover:text-white transition-all duration-200"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-[180px] h-[50px] bg-[#029FAE] text-white font-medium rounded-lg hover:bg-[#027f85] transition-all flex items-center justify-center"
                aria-label="Add item to cart"
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2 text-white" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#272343]">All Products</h2>
            <button
              onClick={() => setShowAll(true)} 
              className="text-[#029FAE] font-medium hover:underline"
              aria-label="View all products"
            >
              View All
            </button>
          </div>
          <FeaturedProducts /> 
        </div>

        {/* Show All Products */}
        {showAll && (
          <div className="space-y-6">
            <OurProducts /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
