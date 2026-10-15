import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import orderRoute from "./routes/order.route.js";
import { connectOrderDB } from "@repo/order-db";

const app = express();
const port = 8002;
app.use(clerkMiddleware());

app.use(
  cors({
    origin: ["http://localhost:3003", "http://localhost:3004"],
    credentials: true,
  }),
);

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

app.use("/orders", orderRoute);

async function startServer() {
  try {
    await connectOrderDB();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
