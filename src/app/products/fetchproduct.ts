import { client } from "@/sanity/lib/client";
import { Product } from "@/type/product";

export const fetchProduct = async (id: string): Promise<Product | null> => {
  const query = `*[_type == "products" && _id == $id][0] {
    _id,
    title,
    price,
    priceWithDiscount,
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
    tags,
    priceWithoutDiscount
  }`;

  const product: Product = await client.fetch(query, { id });
  return product || null;
};
