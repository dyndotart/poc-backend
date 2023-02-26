import { Router } from 'express';
import { controllerWrapper } from '../../../utils/controller-wrapper';
import {
  renderSimpleCityMapController,
  renderSpotifyPlayerController,
} from './render.controller';
import { RenderRawParams } from './types';

const router = Router();
router.get(
  `/spotify-player.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderSpotifyPlayerController)
);
router.get(
  `/simple-city-map.:${RenderRawParams.format}(png|jpe?g)`,
  controllerWrapper(renderSimpleCityMapController)
);

export default router;
