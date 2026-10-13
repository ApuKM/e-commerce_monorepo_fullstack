import { Prisma, prisma } from "@repo/product-db";
import { type Request, type Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data: Prisma.CategoryCreateInput = req.body;

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

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCategory = await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
  return res.status(200).json(deletedCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return res.status(200).json(category);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({});
  return res.status(200).json(categories);
};
