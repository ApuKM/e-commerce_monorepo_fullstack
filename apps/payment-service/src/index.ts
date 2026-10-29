import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { isValidUser } from "./middleware/authmiddleware.js";
import sessionRouter from "./routes/session.route.js";

const app = express();
const port = 8001;
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

app.use("/sessions", sessionRouter);

// app.post("/create-stripe-product", async (req: Request, res: Response) => {
//   const response = await stripe.products.create({
//     id: "123",
//     name: "Test product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   });
//   return res.send(response);
// });

// app.get("/stripe-product-price", async (req: Request, res: Response) => {
//   const response = await stripe.prices.list({
//     product: "123",
//   });
//   return res.send(response);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
