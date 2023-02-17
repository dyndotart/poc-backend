import express from 'express';

export function errorLoggerMiddleware(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Logging
  console.error('\x1b[31m', err); // Adding some color to the log
  next(err);
}
