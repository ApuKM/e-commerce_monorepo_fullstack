import { StripeProductType } from "@repo/types";
import stripe from "./stripe.js";

export const createStripeProduct = async (item: StripeProductType) => {
  try {
    const response = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createStripeProductPrice = async (productId: number) => {
  try {
    const response = await stripe.prices.list({
      product: productId.toString(),
    });
    return response.data[0]?.unit_amount;
  } catch (error) {
    console.log(error);
    return error;
  }
};
