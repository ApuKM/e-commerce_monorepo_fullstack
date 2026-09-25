import { z }from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: [string, ...string[]];
  colors: [string, ...string[]];
  images: Record<string, string>;
};

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

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

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>

export type CartStoreStateType = {
  cart: CartItemType[];
  hasHydrated: boolean;
}

export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
}