"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type WishlistItem = Product;

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();
  const router = useRouter();

  const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);
  const formatPrice = (price: string | number | undefined): string => {
    if (price === undefined || isNaN(Number(price))) {
      return "$0.00"; 
    }
    const numericPrice = Number(price);
    return numericPrice.toFixed(2);
  };

  const totalPrice = cart.reduce((total, product: Product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleCheckout = (): void => {
    router.push("/checkout");
  };

  const handleQuantityChange = (id: string, quantity: number): void => {
    if (quantity > 0) updateQuantity(id, quantity);
  };

  const handleAddToWishlist = (product: Product): void => {
    const wishlistItem: WishlistItem = { ...product };
    addToWishlist(wishlistItem);
    setIsAddedToWishlist(true);

    setTimeout(() => {
      setIsAddedToWishlist(false);
    }, 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="w-full max-w-[1920px] mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <section className="col-span-1 md:col-span-2">
        <h2 className="text-2xl md:text-3xl font-bold text-[#272343] mb-8">Bag</h2>
        {cart.length > 0 ? (
          cart.map((product: Product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-6"
            >
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-cover rounded"
                />
                <div className="text-center md:text-left">
                  <p className="text-lg font-bold mb-2">{product.name}</p>
                  <p className="text-base font-bold mb-4">
                    ${formatPrice(product.price)} x {product.quantity}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold hover:bg-gray-300"
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="text-lg">{product.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold hover:bg-gray-300"
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <HeartIcon
                  className="w-6 h-6 text-gray-500 hover:text-[#027b89] cursor-pointer"
                  onClick={() => handleAddToWishlist(product)}
                />
                <TrashIcon
                  className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => removeFromCart(product.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center md:text-left">Your cart is empty.</p>
        )}
      </section>

      <aside className="bg-white shadow rounded-lg p-6 sticky top-20 h-fit">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#272343]">Summary</h2>
        {isAddedToWishlist && (
          <div className="text-green-500 font-semibold mb-4 text-center">
            Product successfully added to wishlist!
          </div>
        )}
        <div className="flex justify-between text-sm mb-4">
          <span>Subtotal</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full p-2 border rounded-lg"
          />
          <button className="bg-[#029FAE] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#027b89]">
            Apply
          </button>
        </div>
        <button
          className="w-full bg-[#029FAE] text-white py-3 rounded-lg font-semibold hover:bg-[#027b89]"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </aside>
    </div>
  );
};

export default CartPage;
