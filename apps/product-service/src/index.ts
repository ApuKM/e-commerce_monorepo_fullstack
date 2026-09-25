import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3003", "http://localhost:3004"],
    credentials: true,
  }),
);
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.post("/authentication", (req: Request, res: Response) => {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
