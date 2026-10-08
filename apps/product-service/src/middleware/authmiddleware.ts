import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

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

  // console.log("Auth:", isAuthenticated);
  // console.log("User:", userId);

  if (!isAuthenticated) {
    return res.status(401).json({
      error: "Unauthorized!",
    });
  }

  req.userId = userId;
  next();
};
