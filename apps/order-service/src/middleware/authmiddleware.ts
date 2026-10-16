import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import type { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const isValidUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      error: "You are not logged in!",
    });
  }
  req.userId = userId;
  next();
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, sessionClaims } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims?.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized!" });
  }
  req.userId = userId;
  next();
};
