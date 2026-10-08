import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3003", "http://localhost:3004"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/authentication", isValidUser, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Authenticated successfully",
    userId: req.userId,
  });
});

app.use("/product", productRouter);
app.use("/category", categoryRoute);

app.use((err: any, req: Request, res: Response) => {
  console.log("Root error", err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
