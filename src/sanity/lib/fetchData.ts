import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client"; // Corrected import

export const fetchFeaturedProducts = async () => {
  const query = groq`
    *[_type == "products" && "featured" in tags] | order(_createdAt desc) [0..5] {
      title,
      price,
      priceWithoutDiscount,
      image,
      slug,
      description
    }
  `;
  const featuredProducts = await client.fetch(query); // Using 'client' instead of 'Client'
  return featuredProducts;
};
