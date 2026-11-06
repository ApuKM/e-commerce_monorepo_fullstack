import { Request, Response, Router } from "express";
import stripe from "../utils/stripe.js";
import Stripe from "stripe";
import express from "express";
import { producer } from "../utils/kafka.ts";

const webhookRouter: Router = Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

webhookRouter.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (request: Request, response: Response) => {
    if (!endpointSecret) {
      return response.status(500).send("Webhook secret is missing");
    }
    //   console.log("Request", request)
    let event: Stripe.Event;

    const signature = request.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature!,
        endpointSecret,
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log("Webhook signature verification failed:", err.message);
      }

      return response.sendStatus(400);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
        );
        //TODO: Create order
        producer.send("payment.successful", {
          value: {
            userId: session.client_reference_id,
            email: session.customer_details?.email,
            amount: session.amount_total,
            status: session.payment_status === "paid" ? "success" : "failed",
            products: lineItems.data.map((item) => ({
              name: item.description,
              quantity: item.quantity,
              price: item.price?.unit_amount,
            })),
          },
        });

        console.log("Webhook recieved", session);
        console.log(event);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return response.json({ received: true });
  },
);

export default webhookRouter;
