"use client";

import React, { useState, useEffect } from "react";
import { useWishlist } from "@/context/WishListContext";
import { useCart } from "@/context/CartContext";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string | number;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      price: typeof product.price === "number" ? product.price.toString() : product.price,
      quantity: 1,
    };
    addToCart(cartItem);
    removeFromWishlist(product.id);
  };

  const formatPrice = (price: string | number): string => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    return parseFloat(price.replace("$", "")).toFixed(2);
  };

  return (
    <div className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-[#272343] mb-8">My Wishlist</h2>

      {isClient && wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition duration-300"
            >
              <Link href={`/products/${product.id}`} className="w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover rounded mb-4"
                />
              </Link>

              <div className="w-full text-center">
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  ${formatPrice(product.price)}
                </p>
                <p className="text-xs text-[#FFD700] mb-3">★ 4.5 (120 reviews)</p>
              </div>

              <div className="flex space-x-2 w-full">
                <button
                  className="flex-1 py-2 bg-[#029FAE] text-white rounded hover:bg-[#027b89] transition"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCartIcon className="w-5 h-5 inline-block mr-2" />
                  Add to Cart
                </button>

                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <TrashIcon className="w-5 h-5 inline-block mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Image
            src="/images/empty-wishlist.png"
            alt="Empty Wishlist"
            width={200}
            height={200}
            className="w-48 h-48 mx-auto mb-6"
          />
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Your wishlist is empty!
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Browse our amazing collection and add items to your wishlist.
          </p>
          <Link
            href="/"
            className="py-3 px-6 bg-[#029FAE] text-white rounded hover:bg-[#027b89] transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
