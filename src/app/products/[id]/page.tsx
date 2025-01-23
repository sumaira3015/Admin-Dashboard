import { client } from "@/sanity/lib/client";
import { Product } from "@/type/product";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import FeaturedProduct from "../Featured";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params;

  const query = `*[_type == "products" && _id == $id][0] {
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
    description,
    inventory,
    tags
  }`;

  const product: Product = await client.fetch(query, { id });

  if (!product) {
    notFound();
  }

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image?.asset?.url || "/default-image.jpg"}
            alt={product.title}
            width={675}
            height={607}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
            <h1 className="lg:text-5xl md:text-5xl text-4xl font-bold text-[#272343] mb-8 mt-6 lg:max-w-[50%] max-w-[90%] leading-[1.5]">
            {product.title}</h1>
          <p className="w-[120px] h-[35px] text-lg bg-[#029FAE] text-white py-3 rounded-full flex items-center justify-center mb-8">
            ${product.price}{" "}
            {product.priceWithoutDiscount && (
              <span className="line-through text-red-800 ml-2">${product.priceWithoutDiscount}</span>
            )}
          </p>
          {product.badge && (
            <div className=" text-white bg-green-500 px-4 py-1 rounded-lg text-sm font-semibold inline-block">
              {product.badge}
            </div>
          )}
           <hr className="border-t border-gray-300 w-full mt-5" />
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="mt-4">
            <span className="font-semibold text-lg">Category: </span>
            <span>{product.category?.title || "No category"}</span> 
          </div>
          <div className="mt-4">
            <span className="font-semibold text-lg">Tags: </span>
            <span>{product.tags?.join(", ") || "No tags"}</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-lg">Inventory: </span>
            <span>{product.inventory ?? "Out of stock"}</span> 
          </div>
          <div>
              <button className="mt-5 lg:w-[212px] lg:h-[57px] md:w-[180px] w-[160px] bg-[#029FAE] text-xl text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#027c74] transition-all duration-300">
                <ShoppingCartIcon className="w-[29px] h-[29px] text-white" />
                <span>Add to Cart</span>
              </button>
            </div>
        </div>
      </div>
        <FeaturedProduct />
    </section>
    
  );
};

export default ProductPage;
