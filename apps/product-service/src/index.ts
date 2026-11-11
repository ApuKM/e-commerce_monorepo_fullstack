import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRoute from "./routes/category.route.js";
import { consumer, producer } from "./utils/kafka.js";

const app = express();

// CORS: allow origins from env (comma-separated) or localhost for local dev
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ?? "http://localhost:3003,http://localhost:3004"
)
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (_req: Request, res: Response) => {
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

app.use("/products", productRouter);
app.use("/categories", categoryRoute);

app.use((err: unknown, _req: Request, res: Response) => {
  const error = err as { status?: number; message?: string };
  console.error("Root error", error);
  return res
    .status(error.status ?? 500)
    .json({ message: error.message ?? "Internal server error!" });
});

const PORT = Number(process.env.PORT ?? 8000);

const start = async () => {
  try {
    await Promise.all([producer.connect(), consumer.connect()]);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Product service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start product-service:", error);
    process.exit(1);
  }
};

start();

