import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
   err: Error & { status?: number; errors?: unknown[] },
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
   });
};

module.exports = errorMiddleware;
