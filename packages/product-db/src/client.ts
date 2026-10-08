import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
// console.log(
//   "DATABASE_URL exists:",
//   Boolean(process.env.DATABASE_URL),
// );
// console.log("cwd:", process.cwd());
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;