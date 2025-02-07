import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./products";
import { categorySchema } from "./categories";
import { comment } from "./comment";
import { heroSectionSchema } from "./heroSection";
import { userSchema } from "./user";
// import { orderSchema } from "./orders";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, comment, heroSectionSchema, userSchema],
};