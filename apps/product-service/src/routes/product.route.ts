import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin } from "../middleware/authmiddleware.js";

const router: Router = Router();

router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
