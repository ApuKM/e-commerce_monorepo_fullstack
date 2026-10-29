import type { ShippingFormType } from "@repo/types";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import React from "react";

const CheckOutForm = ({shippingForm}: {shippingForm: ShippingFormType}) => {
  const checkoutState = useCheckoutElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ConfirmError | null>(null);

  if (checkoutState.type === "loading") {
    return <div>Loading...</div>;
  }

  if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const handleClick = async () => {
    setLoading(true);
    await checkoutState.checkout.updateEmail(shippingForm.email);
    await checkoutState.checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await checkoutState.checkout.confirm();
    if (res.type === "error") {
      setError(res.error);
    }
    setLoading(false);
  };
  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckOutForm;
