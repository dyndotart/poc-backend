import express, { Router } from 'express';
import { controllerWrapper } from '../../../utils/controller-wrapper';
import { renderRawController } from './render.controller';
import { RenderRawParams } from './types';

const router = Router();

router.get(
  `/raw/:${RenderRawParams.compositionname}.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderRawController)
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
