"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/type/product";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch Featured Products
  const fetchFeaturedProducts = async () => {
    const query = `
      *[_type == "products"] | order(_createdAt desc)[0..7] {
        _id,
        title,
        price,
        priceWithoutDiscount,
        badge,
        image {
          asset-> {
            _id,
            url
          }
        },
        category-> {
          title
        },
        inventory,
        tags
      }
    `;

    try {
      const products: Product[] = await client.fetch(query);
      setFeaturedProducts(products);
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setFeaturedProducts([]);
    }
  };

  // useEffect to call the fetch function
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#272343]">Featured Products</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#029FAE] font-medium hover:underline"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {featuredProducts.slice(0, showAll ? featuredProducts.length : 5).map((product) => (
          <div key={product._id} className="p-4 flex flex-col justify-between">
            <Image
              src={product.image?.asset?.url || "/images/placeholder.png"}
              alt={product.title || "Product Image"}
              width={400}
              height={400}
              className="hover:scale-[1.03] transition-transform duration-300 w-full h-auto"
            />
            <div className="flex justify-between items-center mt-2">
              <Link
                href={`/products/${product._id}`}
                className="text-base font-semibold text-[#272343] hover:text-[#029FAE] transition-colors duration-200 cursor-pointer"
              >
                {product.title}
              </Link>
              <div className="text-xl text-[#029FAE] font-semibold">
                ${product.priceWithoutDiscount || product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
