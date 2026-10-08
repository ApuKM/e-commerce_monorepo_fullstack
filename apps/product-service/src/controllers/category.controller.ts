import { Prisma, prisma } from "@repo/product-db";
import { type Request, type Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data: Prisma.CategoryCreateInput = req.body;

    // console.log("Received data:", data);

    const category = await prisma.category.create({
      data,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {};
export const updateCategory = async (req: Request, res: Response) => {};
export const getCategories = async (req: Request, res: Response) => {};
