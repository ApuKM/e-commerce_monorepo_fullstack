import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { isAdmin } from "./middleware/authmiddleware.ts";
import userRouter from "./routes/user.route.ts";

const app = express();
const port = 8003;

app.use(
  cors({
    origin: ["http://localhost:3003"],
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

app.use("/users", isAdmin, userRouter);

app.use((err: any, req: Request, res: Response) => {
  console.log("Root error", err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error!" });
});

const start = async () => {
  try {
    app.listen(8003, () => {
      console.log(`Product service is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
