import express, { Router } from 'express';
import { STAGE } from '../../../environment/config';
import { controllerWrapper } from '../../../utils/controller-wrapper';
import {
  renderCityMapController,
  renderRawController,
  renderSpotifyPlayerController,
} from './render.controller';
import { RenderRawParams } from './types';

const router = Router();

router.get(
  `/raw/:${RenderRawParams.compositionname}.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderRawController, STAGE.DEV)
);
router.get(
  `/spotify.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderSpotifyPlayerController)
);
router.get(
  `/map.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderCityMapController)
);
router.get(
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
