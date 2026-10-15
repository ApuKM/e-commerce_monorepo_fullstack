import { type Request, type Response } from "express";

export const getOrders = async(req: Request, res: Response) => {
  return res.json({message: "Ok"})
}