import express, { Router } from 'express';
import { controllerWrapper } from '../../../utils/controller-wrapper';
import { renderRemotion } from './render.controller';
import { GetTestParams } from './types';

const router = Router();

router.get(
  `/remotion/:${GetTestParams.compositionname}.:${GetTestParams.format}(png|jpe?g)`,
  controllerWrapper(renderRemotion)
);
router.use(
  '/info',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      res.send({
        endpoints: ['/remotion/{compositionname}.{png/jpeg}'],
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
