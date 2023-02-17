import express from 'express';
import { STAGE } from '../config';
import appConfig from '../config/app.config';
import { AppError } from '../middlewares/error';

export function controllerWrapper(
  controller: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void,
  stage?: STAGE
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!stage || appConfig.stage === stage) {
        controller(req, res, next);
      } else {
        throw new AppError(404);
      }
    } catch (e) {
      next(e);
    }
  };
}
