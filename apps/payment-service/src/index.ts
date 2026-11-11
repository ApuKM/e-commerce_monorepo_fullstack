import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import sessionRouter from "./routes/session.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const app = express();

// Webhook MUST be registered before express.json() to receive the raw body
app.use("/webhook", webhookRouter);

app.use(clerkMiddleware());
app.use(express.json());

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

app.use("/sessions", sessionRouter);

const PORT = Number(process.env.PORT ?? 8001);

const start = async () => {
  try {
    await Promise.all([producer.connect(), consumer.connect()]);
    await runKafkaSubscriptions();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Payment service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start payment-service:", error);
    process.exit(1);
  }
};

start();

