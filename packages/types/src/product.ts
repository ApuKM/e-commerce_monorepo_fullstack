import type { Product, Category } from "@repo/product-db";
import z from "zod";

export type ProductType = Product;
export type CategoryType = Category;

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export const CategoryFormSchema = z.object({
  name: z
    .string({ error: "Category must be a string!" })
    .min(1, { error: "Name is required!" }),

  slug: z
    .string({ error: "Slug must be a string!" })
    .min(1, { error: "Slug is Required!" }),
});
export type CategoryFormType = z.infer<typeof CategoryFormSchema>;
