import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import orderRoute from "./routes/order.route.js";
import { connectOrderDB } from "@repo/order-db";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const app = express();

app.use(clerkMiddleware());

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

app.use("/orders", orderRoute);

const PORT = Number(process.env.PORT ?? 8002);

async function startServer() {
  try {
    await Promise.all([
      connectOrderDB(),
      producer.connect(),
      consumer.connect(),
    ]);

    await runKafkaSubscriptions();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Order service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start order-service:", error);
    process.exit(1);
  }
}

startServer();

