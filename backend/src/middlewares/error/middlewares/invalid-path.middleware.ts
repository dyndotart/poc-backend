import express from 'express';
import { AppError } from '../AppError';

// Middleware to catch unregistered routes as 404 errors
export function invalidPathHandlerMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Call next middleware (-> 'Error Handler Middleware' that was registered as latest)
  next(new AppError(404, "Route doesn't exist!"));
}
