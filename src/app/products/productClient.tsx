"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Product } from "@/type/product";
import ProductDetailCard from "@/components/products/ProductDetailCard";
import QuantitySelector from "./selectors/QuantitySelector"; 

interface ProductPageClientProps {
  product: Product;
  featuredProducts: Product[];
}

const ProductPageClient = ({ product, featuredProducts }: ProductPageClientProps) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [showAll, setShowAll] = useState(false); 
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.image?.asset?.url,
      quantity,
    };
    addToCart(cartItem);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          Product added to cart successfully!
        </div>
      )}

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image?.asset?.url || "/placeholder-image.jpg"}
            alt={product.title}
            width={500}
            height={500}
            className="object-cover rounded-lg w-full md:h-[400px] lg:h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#272343] mb-6">{product.title}</h1>
          
          {/* Price Section */}
          <div className="flex items-center mb-6">
            <p className="bg-[#029FAE] w-[120px] h-[40px] text-white text-lg text-center justify-center font-semibold py-2 px-4 rounded-full mr-4">
              ${product.price}
              {product.priceWithoutDiscount && (
                <span className="line-through text-gray-500 ml-2">${product.priceWithoutDiscount}</span>
              )}
            </p>

          </div>

          <hr className="my-6 border-t-2 border-gray-300" />
          <p className="text-base md:text-md text-gray-600 mb-4 md:mt-6 max-w-[450px]">{product.description}</p>

          {product.category && (
            <div className="mb-6">
              <span className="font-semibold text-lg">Category: </span>
              <span className="text-sm text-gray-600">{product.category.title}</span>
            </div>
          )}

          {product.tags && (
            <div className="mb-6">
              <span className="font-semibold text-lg">Tags: </span>
              <span className="text-sm text-gray-600">{product.tags.join(", ")}</span>
            </div>
          )}

          <QuantitySelector
            quantity={quantity} 
            setQuantity={setQuantity}
          />

          <button
            className="w-[160px] h-[50px] bg-[#029FAE] text-white font-lg rounded-lg hover:bg-[#027f85] transition-all duration-200 flex items-center justify-center mt-5"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-12 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#272343] mb-6">Featured Products</h2>
        <button
          onClick={handleViewAll}
          className="text-[#029FAE] text-lg font-semibold hover:underline"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {(showAll ? featuredProducts : featuredProducts.slice(0, 5)).map((product) => (
          <ProductDetailCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductPageClient;
