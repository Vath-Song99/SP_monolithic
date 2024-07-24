import { BaseCustomError } from "@SP/errors/base-custom-error";
import { NextFunction, Request, Response } from "express";

export const errorHandler = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof BaseCustomError) {
    const status = error.getStatusCode();

    return res.status(status).json({
      success: false,
      error: {
        message: error.message,
        status: status,
      },
    });
  }
  _next();
};
