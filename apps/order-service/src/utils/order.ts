import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka.js";

export const createOrder = async (order: OrderType) => {
  const newOrder = new Order(order);

  try {
    const savedOrder = await newOrder.save();
    await producer.send("order.created", {
      value: {
        email: savedOrder.email,
        amount: savedOrder.amount,
        status: savedOrder.status,
      },
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

