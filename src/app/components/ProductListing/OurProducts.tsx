import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/type/product";

const OurProduct = async () => {
  const query = `*[_type == "products"] | order(_createdAt desc)[0..7] {
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

  const featuredProducts: Product[] = await client.fetch(query);

  return (
    <section className="w-full max-w-[1920px] bg-white mx-auto py-10 px-4">
      <h2 className="lg:text-4xl md:text-3xl text-center text-2xl font-bold text-[#272343] mb-8">
        Our Products
      </h2>
      {featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product._id} className="relative">
              {product.badge && (
                <div
                  className="absolute top-2 left-2 text-white px-4 py-1 text-sm font-semibold rounded-lg z-10 bg-green-500"
                >
                  {product.badge}
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Our products available.</p>
      )}
    </section>
  );
};

export default OurProduct;
