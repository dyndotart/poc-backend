import express from 'express';
import { AppError } from '../AppError';

// Error Handler Middleware
// https://expressjs.com/en/guide/error-handling.html
// https://reflectoring.io/express-error-handling/
export function errorHandlerMiddleware(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let statusCode = 500;
  const jsonResponse: TErrorJsonResponseDto = {
    error: 'unknown',
    error_description: null,
    error_uri: null,
  };

  // Handle app error
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    jsonResponse.error = err.message;
    jsonResponse.error_description = err.description;
    jsonResponse.error_uri = err.uri;
  }
  // Handle unknown error
  else {
    if (err.message != null) {
      jsonResponse.error = err.message;
    }
    if (err.status != null && typeof err.status === 'number') {
      statusCode = err.status;
    }
  }

  // Response
  res.status(statusCode);
  res.json(jsonResponse);
}

type TErrorJsonResponseDto = {
  error: string;
  error_description: string | null;
  error_uri: string | null;
};
