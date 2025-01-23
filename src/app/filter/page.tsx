"use client";

import React, { useState, useEffect } from "react";
import PriceFilter from "./PriceFilter";
import { client } from "@/sanity/lib/client"; 
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/type/product";

const FilterProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"]{
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
        category-> { title },
        inventory,
        tags
      }`;

      try {
        console.log("Fetching products..."); 
        const data: Product[] = await client.fetch(query);
        console.log("Fetched products:", data);
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceFilterChange = (filters: { minPrice: number; maxPrice: number }) => {
    const filtered = products.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
    setFilteredProducts(filtered);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white overflow-hidden relative rounded-md shadow-sm">
      {product.priceWithoutDiscount && product.price < product.priceWithoutDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-full z-10">
          Discount
        </div>
      )}
      <Image
        src={product.image?.asset?.url || "/default-image.jpg"}
        alt={product.title}
        width={500}
        height={300}
        className="w-full h-64 object-cover"
        layout="intrinsic"
        priority
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link
            href={`/products/${product._id}`}
            className="text-lg font-semibold text-gray-800 hover:text-[#029FAE]"
          >
            {product.title}
          </Link>
          <p className="text-lg font-bold text-[#029FAE]">${product.price}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <PriceFilter onFilterChange={handlePriceFilterChange} />
        </div>
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;

