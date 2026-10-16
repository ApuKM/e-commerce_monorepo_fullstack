import { Router } from "express";
import { getAnOrder, getOrders } from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/authmiddleware.js";

const router: Router = Router();

router.get("/", isAdmin, getOrders);
router.get("/:userId", getAnOrder);

export default router;
