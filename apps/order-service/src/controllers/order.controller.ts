import { Order } from "@repo/order-db";
import { type Request, type Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});
  return res.json(orders);
};

export const getUserOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.userId });
  return res.json(orders);
};
