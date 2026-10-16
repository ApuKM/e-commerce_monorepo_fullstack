import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/authmiddleware.js";

const router: Router = Router();

router.post("/", isAdmin, createCategory);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);
router.get("/", getCategories);

export default router; 