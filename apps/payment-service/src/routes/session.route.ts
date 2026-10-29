import { Request, Response, Router } from "express";
import stripe from "../utils/stripe.js";
import { isValidUser } from "../middleware/authmiddleware.js";
import { createStripeProductPrice } from "../utils/stripeProduct.js";
import type { CartItemsType } from "@repo/types";

const sessionRouter: Router = Router();

sessionRouter.post(
  "/create-checkout-session",
  isValidUser,
  async (req: Request, res: Response) => {
    const { cart }: { cart: CartItemsType } = req.body;
    const userId = req.userId;

    const lineItems = await Promise.all(
      cart.map(async (item) => {
        const unitAmount = await createStripeProductPrice(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: unitAmount as number,
          },
          quantity: item.quantity,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      ui_mode: "elements",
      line_items: lineItems,
      client_reference_id: userId,
      mode: "payment",
      return_url: `${process.env.STRIPE_RETURN_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
      integration_identifier: "embedded_web_0001",
    });
    res.json({ checkoutSessionClientSecret: session.client_secret });
  },
);

sessionRouter.get(
  "/:session_id",
  async (
    req: Request,
    res: Response,
  ) => {
    const { session_id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string,
      {
        expand: ["line_items"],
      },
    );

    console.log(session);

    return res.json({
      status: session.status,
      paymentStatus: session.payment_status,
    });
  },
);

export default sessionRouter;
