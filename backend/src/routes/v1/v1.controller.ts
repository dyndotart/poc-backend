import express from 'express';
import { STAGE } from '../../config';
import appConfig from '../../config/app.config';
import { AppError } from '../../middlewares/error';

export async function testController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (appConfig.stage === STAGE.LOCAL) {
      // Call migrate script
      // TODO

      // Response
      res.sendStatus(200);
    } else {
      throw new AppError(404);
    }
  } catch (err: any) {
    next(err);
  }
}
