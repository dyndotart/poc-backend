import express from 'express';
import { STAGE } from '../config';
import appConfig from '../config/app.config';
import { AppError } from '../middlewares/error';

export function controllerWrapper(
  controller: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void>,
  stage?: STAGE
) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!stage || appConfig.stage === stage) {
        await controller(req, res, next);
      } else {
        throw new AppError(404);
      }
    } catch (e) {
      next(e);
    }
  };
}
