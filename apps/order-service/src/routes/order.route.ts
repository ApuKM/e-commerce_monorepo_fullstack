import { Router } from "express";
import { getOrders, getUserOrders } from "../controllers/order.controller.js";
import { isAdmin, isValidUser } from "../middleware/authmiddleware.js";

const router: Router = Router();

router.get("/", isAdmin, getOrders);
router.get("/user-orders", isValidUser, getUserOrders);

export default router;
