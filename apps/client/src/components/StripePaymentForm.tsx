"use client";

import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCartStore from "@/stores/cartStore";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { CartItemsType, ShippingFormType } from "@repo/types";

const stripe = loadStripe(
  "pk_test_51URAMfLehIOlsxWPvUsAvsQc2t4NNhCE81Pzz8QirZ1KTKiUmkDqFtuSQjWvjR8LbkUrZPXzxVh2GRq6jq4CqeY900hfvg4YI9",
);

const clientSecret = async (cart: CartItemsType, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create checkout session: ${response.status} ${response.statusText}`,
    );
  }

  const json: unknown = await response.json();
  if (
    typeof json !== "object" ||
    json === null ||
    !("checkoutSessionClientSecret" in json) ||
    typeof json.checkoutSessionClientSecret !== "string"
  ) {
    throw new Error(
      "Checkout session response did not include a client secret",
    );
  }

  return json.checkoutSessionClientSecret;
};

export default function StripePaymentForm({
  shippingForm,
}: {
  shippingForm: ShippingFormType;
}) {
  const { cart } = useCartStore();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutElementsProvider
      stripe={stripe}
      options={{ clientSecret: clientSecret(cart, token) }}
    >
      <CheckOutForm shippingForm={shippingForm}/>
    </CheckoutElementsProvider>
  );
}
