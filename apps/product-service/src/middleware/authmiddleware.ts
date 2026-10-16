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
  // console.log("Authorization:", req.headers.authorization);
  // console.log("Cookie:", req.headers.cookie);

  const { isAuthenticated, userId } = getAuth(req);

  console.log("Auth:", isAuthenticated);
  console.log("User:", userId);

  if (!isAuthenticated) {
    return res.status(401).json({
      error: "Unauthorized!",
    });
  }

  req.userId = userId;
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { userId, sessionClaims } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "You are not logged iin!" });
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims?.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized!" });
  }
  req.userId = userId;
  next();
};
