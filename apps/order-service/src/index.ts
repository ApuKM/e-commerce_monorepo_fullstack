import express, {Request, Response} from "express";
import cors from "cors";

const app = express();
const port = 8002;

app.use(
  cors({
    origin: ["http://localhost:3003", "http://localhost:3004"],
    credentials: true,
  })
);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})