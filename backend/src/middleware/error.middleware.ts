import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error("Error:", error);

  // Custom Errors
  if (error instanceof Error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  // Unknown Errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });

};