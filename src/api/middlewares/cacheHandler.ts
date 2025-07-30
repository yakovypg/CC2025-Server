import { Request, Response, NextFunction } from "express";

export const cacheHandler = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  _next();
};
