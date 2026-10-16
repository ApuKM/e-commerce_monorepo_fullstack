import { Order } from "@repo/order-db";
import { type Request, type Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});
  return res.json(orders);
};

export const getAnOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  const order = await Order.findOne({ userId });
  return res.json(order);
};
