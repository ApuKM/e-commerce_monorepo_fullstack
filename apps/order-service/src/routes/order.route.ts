import { Router } from "express";
import { getChartOrders, getOrders, getUserOrders } from "../controllers/order.controller.js";
import { isAdmin, isValidUser } from "../middleware/authmiddleware.js";

const router: Router = Router();

router.get("/", isAdmin, getOrders);
router.get("/user-orders", isValidUser, getUserOrders);
router.get("/order-chart", isAdmin, getChartOrders);

export default router;
