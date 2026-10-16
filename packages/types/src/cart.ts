import type { Product } from "@repo/product-db";
import z from "zod";

export type CartItemType = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z
  .string()
  .nonempty("Email is required!")
  .email("Invalid email address!"),
  phone: z
  .string()
  .nonempty("Phone number is required!")
  .min(10, "Phone number is too short!")
  .max(16, "Phone number is too long!")
  .regex(/^\+?\d+$/, "Phone number must be digits and may start with +"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormType = z.infer<typeof shippingFormSchema>;

export type CartStoreStateType = {
  cart: CartItemType[];
  hasHydrated: boolean;
}

export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
}
