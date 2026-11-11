import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { isAdmin } from "./middleware/authmiddleware.js";
import userRouter from "./routes/user.route.js";
import { producer } from "./utils/kafka.js";

const app = express();

// CORS: allow origins from env (comma-separated) — admin-only service
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ?? "http://localhost:3003"
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

app.use("/users", isAdmin, userRouter);

app.use((err: unknown, _req: Request, res: Response) => {
  const error = err as { status?: number; message?: string };
  console.error("Root error", error);
  return res
    .status(error.status ?? 500)
    .json({ message: error.message ?? "Internal server error!" });
});

const PORT = Number(process.env.PORT ?? 8003);

const start = async () => {
  try {
    await producer.connect();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Auth service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start auth-service:", error);
    process.exit(1);
  }
};

start();

